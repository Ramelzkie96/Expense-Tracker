create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  type text not null check (type in ('income', 'expense')),
  icon_name text not null,
  icon_bg text not null,
  icon_color text not null,
  created_at timestamptz default now()
);

alter table categories enable row level security;

create policy "Anyone can read categories"
  on categories for select
  using (true);

insert into categories (name, type, icon_name, icon_bg, icon_color) values
  ('Food & Dining', 'expense', 'Utensils', 'bg-emerald-50', 'text-emerald-600'),
  ('Transportation', 'expense', 'Car', 'bg-sky-50', 'text-sky-600'),
  ('Bills & Utilities', 'expense', 'Zap', 'bg-orange-50', 'text-orange-600'),
  ('Entertainment', 'expense', 'Ticket', 'bg-violet-50', 'text-violet-600'),
  ('Salary', 'income', 'Briefcase', 'bg-indigo-50', 'text-indigo-600'),
  ('Freelance', 'income', 'Laptop', 'bg-sky-50', 'text-sky-600'),
  ('Business', 'income', 'Building2', 'bg-amber-50', 'text-amber-600'),
  ('Investment', 'income', 'TrendingUp', 'bg-emerald-50', 'text-emerald-600'),
  ('Gift', 'income', 'Gift', 'bg-pink-50', 'text-pink-600'),
  ('Other Income', 'income', 'PlusCircle', 'bg-slate-100', 'text-slate-500');