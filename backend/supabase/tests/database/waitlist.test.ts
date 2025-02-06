import { assert, assertEquals, assertNotEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { createClient, SupabaseClient, User } from "jsr:@supabase/supabase-js@2";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

// Load environment variables
const env = config({ path: ".env.test" });

const supabaseUrl: string = env.SUPABASE_URL ?? "";
const serviceKey: string = env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const anonKey: string = env.SUPABASE_ANON_KEY ?? "";

// Supabase client options
const options = {
  auth: {
    autoRefreshToken: false, // Prevents background session refresh (avoids memory leaks)
    persistSession: false,
    detectSessionInUrl: false,
  },
};

// Global Supabase clients
const supabaseAdmin: SupabaseClient = createClient(supabaseUrl, serviceKey, options);
let supabaseUser1: SupabaseClient;
let supabaseUser2: SupabaseClient;

// User and ID types
interface TestUser {
  id: string;
  session: string;
}

let user1: TestUser;
let user2: TestUser;
let waitlistId: string;
let signupId: string;

/**
 * Function to sign in a test user and return their session.
 */
async function signInTestUser(email: string): Promise<TestUser> {
  const supabaseAuth: SupabaseClient = createClient(supabaseUrl, anonKey, options);

  const { data: signInData, error: signInError } = await supabaseAuth.auth.signInWithPassword({
    email,
    password: "password123",
  });

  if (signInError || !signInData.session) {
    throw new Error(`Failed to authenticate test user: ${signInError?.message}`);
  }

  return { id: signInData.session.user.id, session: signInData.session.access_token };
}

/**
 * Setup: Create two users & one waitlist
 */
Deno.test("Setup: Sign users and waitlist", async () => {
  user1 = await signInTestUser("user1@example.com");
  user2 = await signInTestUser("user2@example.com");
  // Create Supabase clients for users
  supabaseUser1 = createClient(supabaseUrl, anonKey, {
    ...options,
    global: { headers: { Authorization: `Bearer ${user1.session}` } },
  });

  supabaseUser2 = createClient(supabaseUrl, anonKey, {
    ...options,
    global: { headers: { Authorization: `Bearer ${user2.session}` } },
  });

  // Create a waitlist for user1
  const { data, error } = await supabaseUser1.from("waitlist")
    .insert([{ name: "User1 Waitlist", user_id: user1.id }])
    .select()
    .single();

  if (error || !data?.id) throw new Error(`Failed to create waitlist: ${error?.message}`);

  waitlistId = data.id;
  assert(waitlistId, "Waitlist ID should not be null or undefined");
  assertEquals(data.name, "User1 Waitlist", "Waitlist name should be 'User1 Waitlist'");


});

/**
 * RLS: User can only select their own waitlist
 */
Deno.test("RLS: User can only select their own waitlist", async () => {
  const { data: user1Data, error: user1Error } = await supabaseUser1.from("waitlist").select("*");

  assertEquals(user1Error, null);
  assert(user1Data!.length > 0, "User1 should see their own waitlist");

  const { data: user2Data, error: user2Error } = await supabaseUser2.from("waitlist").select("*");

  assertEquals(user2Error, null);
  assertEquals(user2Data!.length, 0, "User2 should not see User1's waitlist");
});

/**
 * RLS: User2 cannot update someone else's waitlist
 */
Deno.test("RLS: User cannot update someone else's waitlist", async () => {
  await supabaseUser2.from("waitlist").update({ name: "Hacked" }).eq("id", waitlistId);
  const { data } = await supabaseUser1.from("waitlist").select("name").eq("id", waitlistId).single();

  assertNotEquals(data?.name, "Hacked", "User2 should not be able to update User1's waitlist");

});

/**
 * RLS: User can insert signups for their own waitlist
 */
Deno.test("RLS: User can insert signups for their own waitlist", async () => {
  const { data, error } = await supabaseUser1.from("waitlist_signup")
    .insert([{ waitlist_id: waitlistId, email: "test@example.com" }])
    .select()
    .single();

  if (error || !data?.id) throw new Error(`Failed to insert signup: ${error?.message}`);

  signupId = data.id;
});

Deno.test("RLS: User can select their own signups", async () => {
  const { data, error } = await supabaseUser1.from("waitlist_signup").select("*");

  assertEquals(error, null);
  assert(data!.length > 0, "User1 should see their own signups");
});

/**
 * RLS: User2 should NOT be able to insert signups into User1's waitlist
 */
Deno.test("RLS: User cannot insert signups into someone else's waitlist", async () => {
  const { error } = await supabaseUser2.from("waitlist_signup")
    .insert([{ waitlist_id: waitlistId, email: "unauthorized@example.com" }]);

  assert(error, "User2 should not be able to insert signups into User1's waitlist");
});

Deno.test("RLS: User cannot delete someone else's signup", async () => {
  await supabaseUser2.from("waitlist_signup").delete().eq("id", signupId);

  const { data } = await supabaseUser1.from("waitlist_signup").select("id").eq("id", signupId).single();
  assert(data, "User2 should not be able to delete User1's signup");
});

/**
 * RLS: User can delete their own signups
 */
Deno.test("RLS: User can delete their own signup", async () => {
  const { error } = await supabaseUser1.from("waitlist_signup").delete().eq("id", signupId);
  assertEquals(error, null, "User1 should be able to delete their own signup");
});

/**
 * Cleanup: Remove users & waitlists
 */
Deno.test("Cleanup: Delete test users and waitlist", async () => {
  await supabaseAdmin.from("waitlist").delete().eq("id", waitlistId);
});
