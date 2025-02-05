begin;
select plan(4);
SELECT has_column(
    'auth',
    'users',
    'id',
    'id should exist'
);


SELECT has_table('public', 'users', 'Users table should exist');

SELECT has_column('public', 'users', 'id', 'Users table should have an id column');

INSERT INTO auth.users (id) VALUES ('550e8400-e29b-41d4-a716-446655440000');
SELECT results_eq(
    'SELECT id FROM public.users WHERE id = ''550e8400-e29b-41d4-a716-446655440000''',
    'SELECT ''550e8400-e29b-41d4-a716-446655440000''::UUID',
    'Trigger should insert new users'
);

select * from finish();
rollback;
