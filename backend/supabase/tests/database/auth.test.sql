begin;
SELECT plan(1);

-- Check if the auth.users table has an id column
SELECT has_column(
    'auth',
    'users',
    'id',
    'id should exist'
);

SELECT * FROM finish();
rollback;
