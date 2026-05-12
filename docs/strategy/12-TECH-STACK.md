# Technical Stack & Infrastructure

## Stack Selection Principles

1. **Speed of development** — solo founder / tiny team, must ship fast
2. **Cost efficiency** — minimize infrastructure costs until revenue justifies
3. **Scalability path** — can handle 100K users without rewrite
4. **India-specific** — fast load times in India, Razorpay integration, regional CDN

---

## Recommended Tech Stack

### Frontend
| Component | Technology | Why |
|-----------|-----------|-----|
| Framework | **Next.js 14+ (App Router)** | SSR for SEO, React ecosystem, fast development |
| Styling | **Tailwind CSS** | Rapid UI development, consistent design |
| UI Components | **shadcn/ui** | Accessible, customizable, no vendor lock-in |
| State Management | **Zustand** or React Context | Simple, lightweight, sufficient for MVP |
| Forms | **React Hook Form + Zod** | Type-safe form validation |
| Rich Text Editor | **Tiptap** (for listing editing) | Extensible, free tier sufficient |

### Backend
| Component | Technology | Why |
|-----------|-----------|-----|
| Runtime | **Next.js API Routes** (MVP) → **Separate Node.js/Python service** (scale) | Simplicity first, split later when needed |
| Database | **Supabase (PostgreSQL)** | Managed, real-time, auth built-in, generous free tier |
| Auth | **Supabase Auth** | Google/email login, OTP support (important for India) |
| Vector DB | **pgvector (via Supabase)** | Semantic search for RAG, no separate service needed |
| Cache | **Upstash Redis** | Serverless Redis, caching AI responses |
| Queue | **Upstash QStash** or **BullMQ** | Background jobs (bulk optimization, scraping) |
| File Storage | **Supabase Storage** | Generated reports, exported listings |

### AI Stack
| Component | Technology | Why |
|-----------|-----------|-----|
| Primary LLM | **Claude API (Anthropic)** | Best structured output, prompt caching, cost-effective |
| Models | Sonnet 4.6 (generation) + Haiku 4.5 (scoring/keywords) | Quality-cost optimization |
| Fallback LLM | **GPT-4o-mini** (optional) | Redundancy, cost comparison |
| Prompt Management | **Custom prompt template system** | Version-controlled prompts per platform/category |
| RAG | **pgvector + custom retrieval** | Marketplace knowledge base retrieval |
| Embeddings | **Anthropic or OpenAI embeddings** | For semantic keyword search and RAG |

### Infrastructure
| Component | Technology | Why |
|-----------|-----------|-----|
| Hosting | **Vercel** | Next.js native, edge network, fast in India |
| Database | **Supabase Cloud** | Managed PostgreSQL, auto-backups |
| Monitoring | **Sentry** (errors) + **Vercel Analytics** (performance) | Essential observability |
| Product Analytics | **Mixpanel** or **PostHog** (self-hosted) | User behavior tracking, conversion funnels |
| Email | **Resend** or **AWS SES** | Transactional emails, marketing sequences |
| Payments | **Razorpay** | Indian payments, UPI, cards, net banking, subscriptions |
| WhatsApp | **WhatsApp Business API** (via Gupshup/Wati) | WhatsApp bot for listing generation |
| SMS (OTP) | **MSG91** or **Twilio** | Indian phone OTP verification |

### DevOps
| Component | Technology | Why |
|-----------|-----------|-----|
| CI/CD | **GitHub Actions** | Automated testing and deployment |
| Version Control | **GitHub** | Standard |
| Environment Management | **Vercel Env Vars** + **.env.local** | Secret management |

---

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────┐
│                      CLIENTS                              │
│   Web (Next.js) │ WhatsApp Bot │ API (future)            │
└────────┬────────┴──────┬───────┴──────┬─────────────────┘
         │               │              │
┌────────▼───────────────▼──────────────▼─────────────────┐
│                    VERCEL EDGE                            │
│              Next.js App + API Routes                     │
│         ┌──────────────────────────────┐                 │
│         │     Middleware Layer          │                 │
│         │  Auth │ Rate Limit │ Usage   │                 │
│         └──────────────────────────────┘                 │
└────────────────────────┬────────────────────────────────┘
                         │
         ┌───────────────┼───────────────────┐
         │               │                   │
┌────────▼──────┐ ┌──────▼───────┐ ┌────────▼──────┐
│   AI SERVICE  │ │  SUPABASE    │ │  EXTERNAL     │
│               │ │              │ │  SERVICES     │
│ Claude API    │ │ PostgreSQL   │ │               │
│ Prompt Engine │ │ pgvector     │ │ Razorpay      │
│ RAG Pipeline  │ │ Auth         │ │ WhatsApp API  │
│ Scoring Engine│ │ Storage      │ │ Resend        │
│               │ │ Real-time    │ │ Analytics     │
└───────────────┘ └──────────────┘ └───────────────┘
```

---

## Database Schema (Core Tables)

```sql
-- Users
users (
  id uuid PRIMARY KEY,
  email text UNIQUE,
  phone text,
  name text,
  plan text DEFAULT 'free',      -- free, pro, business, enterprise, agency
  plan_expires_at timestamptz,
  listings_used_this_month int DEFAULT 0,
  scores_used_this_month int DEFAULT 0,
  referral_code text UNIQUE,
  referred_by uuid REFERENCES users,
  created_at timestamptz DEFAULT now()
)

-- Generated Listings
listings (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users,
  platform text,                  -- amazon_in, flipkart, meesho, etc.
  category text,
  product_name text,
  input_data jsonb,              -- raw user input
  generated_listing jsonb,       -- title, bullets, description, keywords
  quality_score int,
  score_breakdown jsonb,
  version int DEFAULT 1,
  parent_listing_id uuid,       -- for optimized versions
  created_at timestamptz DEFAULT now()
)

-- Keyword Database
keywords (
  id uuid PRIMARY KEY,
  platform text,
  category text,
  keyword text,
  hinglish_variants text[],
  estimated_volume text,         -- high, medium, low
  source text,                   -- autocomplete, competitor, manual
  seasonal boolean DEFAULT false,
  festival text,                 -- diwali, navratri, etc.
  embedding vector(1536),
  updated_at timestamptz DEFAULT now()
)

-- Platform Rules
platform_rules (
  id uuid PRIMARY KEY,
  platform text,
  category text,
  rules jsonb,                   -- title limits, bullet rules, etc.
  best_practices jsonb,
  updated_at timestamptz DEFAULT now()
)

-- Category Benchmarks
category_benchmarks (
  id uuid PRIMARY KEY,
  platform text,
  category text,
  avg_score int,
  top_10_avg_score int,
  common_title_patterns text[],
  common_keywords text[],
  sample_listings jsonb,
  updated_at timestamptz DEFAULT now()
)

-- Subscriptions
subscriptions (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users,
  razorpay_subscription_id text,
  plan text,
  status text,                   -- active, cancelled, past_due
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now()
)

-- Usage Tracking
usage_events (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users,
  event_type text,               -- listing_generated, listing_scored, keyword_search, competitor_analysis
  platform text,
  category text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
)
```

---

## Cost Projections (Monthly)

### Phase 1: MVP (0-1K Users)
| Service | Cost |
|---------|------|
| Vercel (Pro) | $20/month |
| Supabase (Pro) | $25/month |
| Claude API | ₹5,000-15,000/month |
| Razorpay | 2% transaction fee |
| Sentry | Free tier |
| Analytics | Free tier (PostHog) |
| Domain + misc | $20/month |
| **Total** | **₹10,000-25,000/month** |

### Phase 2: Growth (1K-10K Users)
| Service | Cost |
|---------|------|
| Vercel (Pro) | $50/month |
| Supabase (Pro) | $75/month |
| Claude API | ₹50,000-2,00,000/month |
| Upstash Redis | $30/month |
| WhatsApp API | ₹10,000-30,000/month |
| Monitoring stack | $50/month |
| **Total** | **₹1-3 lakhs/month** |

### Phase 3: Scale (10K-50K Users)
| Service | Cost |
|---------|------|
| Infrastructure | ₹2-4 lakhs/month |
| Claude API | ₹5-15 lakhs/month |
| WhatsApp API | ₹30K-1L/month |
| Team (3-5 people) | ₹5-8 lakhs/month |
| **Total** | **₹12-28 lakhs/month** |

---

## Development Priorities

### Week 1 Setup Checklist
- [ ] Initialize Next.js project with TypeScript
- [ ] Set up Tailwind CSS + shadcn/ui
- [ ] Set up Supabase project (database, auth)
- [ ] Set up Claude API integration with prompt caching
- [ ] Set up Razorpay test mode
- [ ] Set up GitHub repo with CI/CD to Vercel
- [ ] Create base database tables
- [ ] Build prompt template system (file-based, version-controlled)

### Performance Requirements
- Time to First Byte: < 500ms (India)
- Listing generation API: < 15 seconds
- Listing scoring API: < 5 seconds
- Database queries: < 100ms
- Page load (Lighthouse): > 85 on mobile

### Security Checklist
- [ ] Supabase RLS (Row Level Security) on all tables
- [ ] Rate limiting on all API endpoints
- [ ] Input sanitization for all user inputs
- [ ] API key rotation plan
- [ ] CORS configuration
- [ ] No sensitive data in client-side code
- [ ] Razorpay webhook signature verification
- [ ] Usage limit enforcement server-side (not client-side)

---

## Scaling Considerations (When Needed, Not Before)

**Don't over-engineer.** These are notes for when scale demands them:

1. **AI response caching:** Cache common product type + platform combinations. Redis-based.
2. **Background queue:** Move bulk optimization to background workers. BullMQ or QStash.
3. **Database read replicas:** When read volume exceeds single database capacity.
4. **CDN for static assets:** Vercel handles this, but may need CloudFront for India-specific edge caching.
5. **Separate AI service:** When API routes become too slow, extract AI pipeline to dedicated service.
6. **Multi-region:** If expanding beyond India, consider multi-region database deployment.
