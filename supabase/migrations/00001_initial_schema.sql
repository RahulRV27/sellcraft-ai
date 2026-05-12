-- SellCraft AI — Initial Database Schema

create extension if not exists "uuid-ossp";
create extension if not exists "vector";

-- Users
create table public.users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  phone text,
  name text,
  plan text not null default 'free'
    check (plan in ('free', 'pro', 'business', 'enterprise', 'agency')),
  plan_expires_at timestamptz,
  listings_used_this_month int not null default 0,
  scores_used_this_month int not null default 0,
  referral_code text unique,
  referred_by uuid references public.users(id),
  created_at timestamptz not null default now()
);

-- Generated Listings
create table public.listings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  platform text not null,
  category text,
  product_name text,
  input_data jsonb,
  generated_listing jsonb,
  quality_score int,
  score_breakdown jsonb,
  version int not null default 1,
  parent_listing_id uuid references public.listings(id),
  created_at timestamptz not null default now()
);

-- Keyword Database
create table public.keywords (
  id uuid primary key default uuid_generate_v4(),
  platform text not null,
  category text,
  keyword text not null,
  hinglish_variants text[],
  estimated_volume text,
  source text,
  seasonal boolean not null default false,
  festival text,
  embedding vector(1536),
  updated_at timestamptz not null default now()
);

-- Platform Rules
create table public.platform_rules (
  id uuid primary key default uuid_generate_v4(),
  platform text not null,
  category text,
  rules jsonb,
  best_practices jsonb,
  updated_at timestamptz not null default now()
);

-- Category Benchmarks
create table public.category_benchmarks (
  id uuid primary key default uuid_generate_v4(),
  platform text not null,
  category text,
  avg_score int,
  top_10_avg_score int,
  common_title_patterns text[],
  common_keywords text[],
  sample_listings jsonb,
  updated_at timestamptz not null default now()
);

-- Subscriptions
create table public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  razorpay_subscription_id text,
  plan text not null,
  status text not null default 'active'
    check (status in ('active', 'cancelled', 'past_due')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

-- Usage Events
create table public.usage_events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  event_type text not null,
  platform text,
  category text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- Indexes
create index idx_users_email on public.users(email);
create index idx_users_referral_code on public.users(referral_code);
create index idx_listings_user_id on public.listings(user_id);
create index idx_listings_platform_category on public.listings(platform, category);
create index idx_listings_created_at on public.listings(created_at desc);
create index idx_keywords_platform_category on public.keywords(platform, category);
create index idx_keywords_keyword on public.keywords(keyword);
create unique index idx_platform_rules_unique on public.platform_rules(platform, category);
create unique index idx_category_benchmarks_unique on public.category_benchmarks(platform, category);
create index idx_subscriptions_user_id on public.subscriptions(user_id);
create index idx_subscriptions_status on public.subscriptions(status);
create index idx_usage_events_user_id on public.usage_events(user_id);
create index idx_usage_events_created_at on public.usage_events(created_at desc);
create index idx_usage_events_type on public.usage_events(event_type);

-- Row Level Security
alter table public.users enable row level security;
alter table public.listings enable row level security;
alter table public.subscriptions enable row level security;
alter table public.usage_events enable row level security;
alter table public.keywords enable row level security;
alter table public.platform_rules enable row level security;
alter table public.category_benchmarks enable row level security;

-- Users: own row only
create policy "Users can view own profile"
  on public.users for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.users for update using (auth.uid() = id);

-- Listings: own data only
create policy "Users can view own listings"
  on public.listings for select using (auth.uid() = user_id);
create policy "Users can insert own listings"
  on public.listings for insert with check (auth.uid() = user_id);
create policy "Users can update own listings"
  on public.listings for update using (auth.uid() = user_id);
create policy "Users can delete own listings"
  on public.listings for delete using (auth.uid() = user_id);

-- Subscriptions: own data only
create policy "Users can view own subscriptions"
  on public.subscriptions for select using (auth.uid() = user_id);

-- Usage events: own data only
create policy "Users can view own usage"
  on public.usage_events for select using (auth.uid() = user_id);
create policy "Users can insert own usage events"
  on public.usage_events for insert with check (auth.uid() = user_id);

-- Reference data: readable by authenticated users
create policy "Authenticated users can read keywords"
  on public.keywords for select using (auth.role() = 'authenticated');
create policy "Authenticated users can read platform rules"
  on public.platform_rules for select using (auth.role() = 'authenticated');
create policy "Authenticated users can read benchmarks"
  on public.category_benchmarks for select using (auth.role() = 'authenticated');
