
create table
users(
    id uuid primary key,
    FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);


CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- Add your custom logic here, for example:
  INSERT INTO public.users (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();