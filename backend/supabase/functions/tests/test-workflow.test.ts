// Import required libraries and modules
import { assert, assertEquals } from 'https://deno.land/std@0.192.0/testing/asserts.ts'
import { createClient, SupabaseClient } from 'jsr:@supabase/supabase-js@2'

// Will load the .env file to Deno.env
import { config } from 'https://deno.land/x/dotenv@v3.2.2/mod.ts'
const env = config({ path: '.env.local' })

// Set up the configuration for the Supabase client
const supabaseUrl = env.SUPABASE_URL ?? ''
const supabaseKey = env.SUPABASE_ANON_KEY ?? ''
const options = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
}


// Test the 'hello-world' function
const testTestWorkflow = async () => {
  var client: SupabaseClient = createClient(supabaseUrl, supabaseKey, options)

  // Invoke the 'hello-world' function with a parameter
  const { data: func_data, error: func_error } = await client.functions.invoke('test-workflow', {
    body: { name: 'bar' },
  })

  // Check for errors from the function invocation
  if (func_error) {
    throw new Error('Invalid response: ' + func_error.message)
  }

  // Log the response from the function
  console.log(JSON.stringify(func_data, null, 2))

  // Assert that the function returned the expected result
  assertEquals(func_data.message, 'Hello bar!')
}

Deno.test('Hello-world Function Test', testTestWorkflow)