// Import required libraries and modules
import { assert, assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";

// Define the function URL manually (bypassing Supabase client)
const functionUrl = `http://127.0.0.1:54321/functions/v1/waitlist-signup`;

const testWaitlistSignupNoAuth = async () => {
  // Mock waitlist signup data
  const waitlistData = {
    waitlist_id: "00000000-0000-0000-0000-000000000000",
    email: "test@example.com",
    source: "test-source",
  };

  // Invoke the function WITHOUT authentication headers
  const response = await fetch(functionUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(waitlistData),
  });

  // Log the response status and body
  console.log(`Response Status: ${response.status}`);
  const responseBody = await response.json();
  console.log(JSON.stringify(responseBody, null, 2));

  // Assert that the function does NOT return 401 Unauthorized
  assert(response.status !== 401, "Function requires authentication, --no-verify-jwt is not enabled");

  // If the function is working, it should return a 200 (success) or 500 (error due to DB constraints)
  assert(response.status === 200, "Unexpected response status");
};

// Run the test
Deno.test("Waitlist Signup Function No Auth Test", testWaitlistSignupNoAuth);
