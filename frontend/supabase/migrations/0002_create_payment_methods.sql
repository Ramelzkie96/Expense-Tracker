create table payment_methods (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  icon_key text not null,
  is_image boolean not null default false,
  icon_bg text not null,
  icon_color text,
  created_at timestamptz default now()
);

alter table payment_methods enable row level security;

create policy "Anyone can read payment methods"
  on payment_methods for select
  using (true);

insert into payment_methods (name, icon_key, is_image, icon_bg, icon_color) values
  ('GCash', 'gcash', true, 'bg-sky-50', null),
  ('Bank Transfer', 'Landmark', false, 'bg-indigo-50', 'text-indigo-600'),
  ('GrabPay', 'Wallet', false, 'bg-emerald-50', 'text-emerald-600'),
  ('PayPal', 'CreditCard', false, 'bg-sky-50', 'text-sky-600'),
  ('Credit Card', 'CreditCard', false, 'bg-violet-50', 'text-violet-600'),
  ('Cash', 'Banknote', false, 'bg-amber-50', 'text-amber-600');