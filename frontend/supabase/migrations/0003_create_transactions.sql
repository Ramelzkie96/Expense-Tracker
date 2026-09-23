create table transactions (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  type text not null check (type in ('Income', 'Expense')),
  amount numeric(12,2) not null check (amount >= 0),  -- always stored positive; sign derived from `type`
  title text not null,
  subtitle text,
  category_id uuid not null references categories(id),
  payment_method_id uuid not null references payment_methods(id),
  transaction_date date not null,
  transaction_time time,
  notes text,
  created_at timestamptz default now()
);

alter table transactions enable row level security;

create policy "Users manage their own transactions"
  on transactions for all
  using (user_id = auth.jwt()->>'sub')
  with check (user_id = auth.jwt()->>'sub');

create index idx_transactions_user_date
  on transactions (user_id, transaction_date desc);