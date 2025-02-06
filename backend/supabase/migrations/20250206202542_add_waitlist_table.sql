-- Create the waitlist table
CREATE TABLE waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on waitlist
ALTER TABLE "waitlist" ENABLE ROW LEVEL SECURITY;

-- SELECT: Users can see their own waitlists
CREATE POLICY "User can select own waitlists"
ON waitlist
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- INSERT: Users can create their own waitlists
CREATE POLICY "User can create own waitlists"
ON waitlist
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can update only their own waitlists
CREATE POLICY "User can update own waitlists"
ON waitlist
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can delete only their own waitlists
CREATE POLICY "User can delete own waitlists"
ON waitlist
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-------------------------------------------------------------

-- Create the waitlist_signup table
CREATE TABLE waitlist_signup (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  waitlist_id uuid REFERENCES waitlist(id),
  email TEXT NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  source TEXT
);

-- Enable RLS on waitlist_signup
ALTER TABLE "waitlist_signup" ENABLE ROW LEVEL SECURITY;

-- Unique constraint to ensure an email can only be used once per waitlist
ALTER TABLE waitlist_signup
ADD CONSTRAINT unique_email_per_waitlist UNIQUE (waitlist_id, email);

-- SELECT: Users can see signups for their own waitlists
CREATE POLICY "User can select signups for their own waitlists"
ON waitlist_signup
FOR SELECT
TO authenticated
USING (
  waitlist_id IN (
    SELECT id FROM waitlist WHERE user_id = auth.uid()
  )
);

-- INSERT: Users can insert signups only for their own waitlists
CREATE POLICY "User can insert signups for their own waitlists"
ON waitlist_signup
FOR INSERT
TO authenticated
WITH CHECK (
  waitlist_id IN (
    SELECT id FROM waitlist WHERE user_id = auth.uid()
  )
);

-- UPDATE: Users can update signups only for their own waitlists
CREATE POLICY "User can update signups for their own waitlists"
ON waitlist_signup
FOR UPDATE
TO authenticated
USING (
  waitlist_id IN (
    SELECT id FROM waitlist WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  waitlist_id IN (
    SELECT id FROM waitlist WHERE user_id = auth.uid()
  )
);

-- DELETE: Users can delete signups only for their own waitlists
CREATE POLICY "User can delete signups for their own waitlists"
ON waitlist_signup
FOR DELETE
TO authenticated
USING (
  waitlist_id IN (
    SELECT id FROM waitlist WHERE user_id = auth.uid()
  )
);
