import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders } from '../__shared/cors.ts'

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  const { waitlist_id, email, source } = await req.json()

  console.log(waitlist_id, email, source)
  const response = await supabaseClient.from("waitlist_signup").insert({
    waitlist_id,
    email,
    source
  }).select()
  console.log(response)

  const { data: waitlistSignup, error } = response
  if(error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  return new Response(
    JSON.stringify(waitlistSignup),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  )
})

