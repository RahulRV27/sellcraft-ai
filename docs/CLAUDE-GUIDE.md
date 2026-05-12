# AI Agent Guide — SellCraft AI Project

This document is the single entry point for any Claude agent (or human) working on this project. Read this first, then dive into specific files as needed.

## What This Is

We are building **India's first AI-powered Seller Intelligence Platform** — purpose-built for Indian marketplace sellers and quick commerce brands. The platform generates, optimizes, and scores product listings using AI trained on Indian commerce patterns, marketplace algorithms, and buyer psychology.

**Working name:** SellCraft AI (see `strategy/10-BRANDING.md` for alternatives)

## Directory Structure

```
sellcraft-ai/
├── docs/
│   ├── CLAUDE-GUIDE.md          ← You are here
│   └── strategy/                ← All strategy & guidance docs
│       ├── 00-OVERVIEW.md
│       ├── 01-VISION.md
│       ├── ...
│       └── 12-TECH-STACK.md
├── src/                         ← Application code (when built)
└── ...
```

## File Index

All strategy docs live in `docs/strategy/`:

| File | Purpose |
|------|---------|
| `strategy/00-OVERVIEW.md` | One-page project summary, quick reference |
| `strategy/01-VISION.md` | Long-term vision, positioning, USP, category creation |
| `strategy/02-MARKET-ANALYSIS.md` | TAM/SAM/SOM, opportunities, risks, competitor landscape |
| `strategy/03-CUSTOMER-PERSONAS.md` | Four primary personas with behavioral detail |
| `strategy/04-MVP-SPEC.md` | MVP feature breakdown, user flows, acceptance criteria |
| `strategy/05-AI-ARCHITECTURE.md` | AI pipeline design, RAG, fine-tuning, multi-model |
| `strategy/06-ROADMAP.md` | 30/90/180-day execution roadmap |
| `strategy/07-GROWTH-STRATEGY.md` | GTM, acquisition channels, growth loops, viral mechanics |
| `strategy/08-PRICING.md` | Pricing tiers, freemium strategy, India-specific pricing |
| `strategy/09-INDIA-PLAYBOOK.md` | India-specific strategies, regional nuances, cultural context |
| `strategy/10-BRANDING.md` | Name candidates, positioning angles, category creation |
| `strategy/11-MOAT-STRATEGY.md` | Defensibility framework, moat layers, competitive strategy |
| `strategy/12-TECH-STACK.md` | Technical stack, infrastructure, cost optimization |

## Core Principles for Any Agent Working on This

1. **India-first, not India-adapted.** Don't take Western SaaS patterns and localize them. Design from Indian seller behavior upward.
2. **Intelligence over generation.** The moat is knowing WHAT to write (marketplace intelligence), not HOW to write it (LLM generation). Anyone can call GPT-4. We know what converts on Flipkart fashion vs Amazon electronics vs Blinkit FMCG.
3. **Data is the moat.** Every listing generated, every optimization made, every performance signal feeds back into making the AI better. This flywheel is the real defensibility.
4. **Distribution > Product in India.** The best product loses to the best-distributed product. WhatsApp, YouTube, seller communities — not Google Ads.
5. **SMB-grade simplicity.** The median user is a Tier-2 city seller with a smartphone and WhatsApp. If it requires a tutorial, it's too complex.
6. **Revenue from Day 1.** No "build audience then monetize" thinking. Charge from launch. Indian sellers respect tools they pay for.
7. **Platform-specific, not generic.** A listing optimized for "marketplaces" is optimized for none. Every output must be tuned to a specific platform's algorithm, format, and buyer behavior.

## Key Strategic Decisions (Already Made)

- **Phase 1 platforms:** Amazon India + Flipkart only. Quick commerce in Phase 2.
- **Phase 1 languages:** English + Hinglish only. Regional languages in Phase 2.
- **Primary channel:** WhatsApp communities + YouTube content marketing.
- **Pricing anchor:** Freemium with ₹999/mo starter tier. Must demonstrate ROI before asking for payment.
- **AI foundation:** Claude API as primary, with RAG layer for marketplace intelligence.
- **No voice workflows in Phase 1.** WhatsApp text achieves 80% of accessibility at 10% of engineering cost.

## Critical Risks to Monitor

1. **Willingness to pay:** Indian SMB freemium-to-paid conversion is 2-3% (vs 5-7% US). Pricing strategy is existential.
2. **Platform dependency:** If Amazon/Flipkart build native optimization tools, our value shrinks.
3. **AI commoditization:** Pure generation features will be copied in weeks. Intelligence layer must stay ahead.
4. **Distribution cost:** Reaching Tier 2/3 sellers at viable CAC is the hardest operational challenge.
5. **Data moat timing:** We need 6-12 months of data accumulation before the flywheel kicks in. Survive until then.

## When Working on Code

- Check `strategy/12-TECH-STACK.md` for approved stack decisions
- Check `strategy/05-AI-ARCHITECTURE.md` before designing any AI pipeline
- Check `strategy/04-MVP-SPEC.md` for feature scope boundaries — do not gold-plate
- All AI prompts must be India-commerce-specific, never generic
- Test with real Indian marketplace listing formats, not placeholder data
- Mobile-first responsive design is non-negotiable
- WhatsApp integration is a first-class feature, not an afterthought

## When Working on Strategy

- Check `strategy/02-MARKET-ANALYSIS.md` for validated assumptions
- Check `strategy/09-INDIA-PLAYBOOK.md` before suggesting any growth tactic
- Check `strategy/11-MOAT-STRATEGY.md` before adding features — ask "does this build the moat or just add surface area?"
- Every feature should map to either retention, revenue, or data accumulation
- Think in growth loops, not linear funnels
