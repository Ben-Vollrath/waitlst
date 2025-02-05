-- Drop the trigger first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the function next
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Drop the table last
DROP TABLE IF EXISTS public.users CASCADE;
