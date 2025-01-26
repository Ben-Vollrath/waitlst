create table
workflow_test (
id bigint primary key generated always as identity,
name text,
email text,
created_at timestamptz default now()
);


DROP table workflow_test;