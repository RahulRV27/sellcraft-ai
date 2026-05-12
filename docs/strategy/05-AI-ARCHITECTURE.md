# AI Architecture

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                         │
│        Web App / WhatsApp Bot / API                       │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│                 ORCHESTRATION LAYER                       │
│   Request routing, caching, rate limiting, usage tracking │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│                  AI PIPELINE LAYER                        │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ Listing  │  │ Scoring  │  │ Keyword  │  │Competitor│ │
│  │Generator │  │ Engine   │  │ Engine   │  │ Analyzer │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬────┘ │
│       │              │              │              │      │
│  ┌────▼──────────────▼──────────────▼──────────────▼───┐ │
│  │              PROMPT ENGINE                           │ │
│  │  Platform-specific + Category-specific prompts       │ │
│  │  Dynamic prompt assembly from templates + context    │ │
│  └────────────────────┬────────────────────────────────┘ │
└───────────────────────┼─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│              KNOWLEDGE LAYER (RAG)                        │
│                                                          │
│  ┌──────────────┐  ┌─────────────┐  ┌────────────────┐  │
│  │ Platform     │  │ Category    │  │ Keyword        │  │
│  │ Rules DB     │  │ Benchmarks  │  │ Database       │  │
│  └──────────────┘  └─────────────┘  └────────────────┘  │
│  ┌──────────────┐  ┌─────────────┐  ┌────────────────┐  │
│  │ Top Listing  │  │ Indian      │  │ Seasonal /     │  │
│  │ Examples     │  │ Commerce KB │  │ Festival Data  │  │
│  └──────────────┘  └─────────────┘  └────────────────┘  │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│              FOUNDATION MODEL LAYER                      │
│                                                          │
│  Primary: Claude API (Sonnet for generation, Haiku for  │
│           scoring/keywords)                              │
│  Fallback: GPT-4o-mini for cost optimization            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Layer 1: Foundation Models

### Model Selection Strategy

| Use Case | Model | Why |
|----------|-------|-----|
| Listing generation | Claude Sonnet 4.6 | Best quality-to-cost ratio for structured content |
| Listing scoring | Claude Haiku 4.5 | Fast, cheap, consistent for evaluation tasks |
| Keyword extraction | Claude Haiku 4.5 | Structured extraction, doesn't need deep reasoning |
| Competitor analysis | Claude Sonnet 4.6 | Requires nuanced analysis |
| Bulk operations | Claude Haiku 4.5 | Cost optimization at scale |

### Cost Optimization
- Use prompt caching aggressively (platform rules and category templates are static context)
- Haiku for all evaluation/scoring tasks (5-10x cheaper than Sonnet)
- Batch API for non-real-time operations (bulk optimization)
- Cache AI responses for identical/similar inputs (product type + platform combos)

### Estimated AI Cost per Operation
- Listing generation: ~₹2-4 per listing (Sonnet with caching)
- Listing scoring: ~₹0.5-1 per score (Haiku)
- Keyword suggestions: ~₹0.5-1 per query (Haiku)
- Competitor analysis: ~₹3-5 per analysis (Sonnet)

### Monthly AI Cost Projections
| Scale | Listings/Month | Estimated AI Cost |
|-------|---------------|-------------------|
| Early (1K users) | 10,000 | ₹30,000-50,000 |
| Growth (10K users) | 100,000 | ₹2-4 lakhs |
| Scale (50K users) | 500,000 | ₹8-15 lakhs |

---

## Layer 2: Prompt Engineering System

### Prompt Architecture

Every AI call assembles a prompt from modular components:

```
SYSTEM PROMPT = [
  Base Instructions (role, output format)
  + Platform Rules (Amazon/Flipkart specific)
  + Category Template (fashion/electronics/FMCG specific)
  + Indian Commerce Context (buyer psychology, search patterns)
  + Quality Guidelines (what makes a great listing)
]

USER PROMPT = [
  Product Details (from user input)
  + Category Benchmarks (from RAG — top listing patterns)
  + Competitor Context (if available)
  + User Preferences (brand voice, tone, language mix)
]
```

### Prompt Template Structure

```
sellcraft-ai/
├── prompts/
│   ├── base/
│   │   ├── listing_generator.txt
│   │   ├── listing_scorer.txt
│   │   ├── keyword_extractor.txt
│   │   └── competitor_analyzer.txt
│   ├── platforms/
│   │   ├── amazon_india.txt
│   │   ├── flipkart.txt
│   │   ├── meesho.txt
│   │   ├── blinkit.txt
│   │   └── ... (one per platform)
│   ├── categories/
│   │   ├── fashion.txt
│   │   ├── electronics.txt
│   │   ├── beauty.txt
│   │   ├── fmcg.txt
│   │   └── ... (one per category)
│   └── contexts/
│       ├── indian_buyer_psychology.txt
│       ├── hinglish_patterns.txt
│       ├── festival_commerce.txt
│       └── pricing_psychology.txt
```

### Key Prompt Engineering Principles

1. **Platform-specific formatting rules are non-negotiable.** Amazon India title max 200 chars, Flipkart allows different structure. Bake these as hard constraints.

2. **Category templates encode what converts.** Fashion listings need size/fit/fabric/occasion. Electronics need specs/compatibility/warranty. These aren't suggestions — they're category intelligence.

3. **Indian commerce context is always included.** COD mention, delivery speed, trust signals ("100% genuine"), return policy — these matter more in India than the West.

4. **Output format is strict.** JSON output with exact fields. No ambiguity in parsing. Every field validated before showing to user.

5. **Hinglish is contextual, not forced.** Include Hinglish keywords where Indian buyers actually search in Hinglish (fashion, beauty, food) but not where they search in English (electronics, tech).

---

## Layer 3: RAG (Retrieval-Augmented Generation)

### Knowledge Base Components

#### 3.1 Platform Rules Database
Structured data about each marketplace's listing requirements.

```json
{
  "amazon_india": {
    "title": {
      "max_length": 200,
      "formula": "Brand + Product Type + Key Feature + Size/Variant + Color",
      "rules": [
        "No promotional phrases",
        "No all-caps words",
        "No special characters except hyphens",
        "Include primary keyword in first 80 characters"
      ]
    },
    "bullet_points": {
      "count": 5,
      "max_length_each": 500,
      "format": "Feature | Benefit pattern"
    }
  }
}
```

#### 3.2 Category Benchmarks
Analyzed patterns from top-performing listings in each category.

Collected by:
- Scraping top 50 listings in each category/subcategory
- Extracting common patterns (title structure, keyword density, bullet format)
- Identifying conversion signals (what top listings do that average listings don't)
- Updating monthly

#### 3.3 Keyword Database
Per-category keyword databases built from:
- Marketplace search autocomplete scraping
- Seller search term reports (anonymized, aggregated)
- Google Trends data for India
- Social media trend monitoring
- Festival/seasonal keyword calendars

Storage: PostgreSQL with pgvector for semantic search

#### 3.4 Indian Commerce Knowledge Base
Curated knowledge about Indian buyer behavior:
- Festival buying patterns (Diwali, Navratri, Eid, etc.)
- Regional preferences (South vs North vs East vs West)
- Price psychology (₹999 vs ₹1000, combo/pack preferences)
- Trust signals that convert in India
- COD impact on conversion
- Mobile shopping behavior patterns
- Hinglish search patterns by category

#### 3.5 Top Listing Examples
Curated examples of high-converting listings per category per platform.
Used as few-shot examples in prompts.

---

## Layer 4: Listing Scoring Engine

### Scoring Algorithm

```
Total Score (0-100) = Weighted Sum of:

1. Title Score (20 points)
   - Primary keyword present in first 80 chars? (+5)
   - Follows platform title formula? (+5)
   - Within character limit? (+3)
   - Contains brand name? (+3)
   - Contains key differentiator? (+4)

2. Bullet Points Score (20 points)
   - 5 bullets present? (+4)
   - Feature-benefit format? (+4)
   - Top keywords included? (+4)
   - No fluff/filler content? (+4)
   - Within character limits? (+4)

3. Description Score (20 points)
   - SEO keywords naturally embedded? (+5)
   - Sufficient length (min 150 words)? (+3)
   - Readable structure (paragraphs, not wall of text)? (+4)
   - Includes trust signals? (+4)
   - Call to action present? (+4)

4. Keyword Coverage (20 points)
   - Contains top 5 category keywords? (+10)
   - Contains long-tail variations? (+5)
   - Contains Hinglish variations (if applicable)? (+5)

5. Platform Compliance (10 points)
   - Follows platform-specific formatting? (+5)
   - No prohibited content/claims? (+5)

6. Competitive Position (10 points)
   - Score vs category average (+5)
   - Unique value proposition visible? (+5)
```

### Scoring Implementation
- Use Claude Haiku for evaluation (fast, consistent)
- Structured output with rubric-based scoring
- Cache scoring criteria per category (prompt caching)
- Return both score and specific improvement suggestions

---

## Layer 5: Data Pipeline & Intelligence

### Data Collection (Ethical, Within Terms of Service)

1. **Marketplace autocomplete:** Periodic scraping of search suggestions
2. **Public listing analysis:** Analyze publicly visible listing structures
3. **User-submitted listings:** Anonymized patterns from user-generated content
4. **Performance signals:** User-reported improvements (optional feedback)
5. **Trend data:** Google Trends API, social media monitoring

### Data Flywheel

```
More Sellers Use Platform
        ↓
More Listings Generated
        ↓
More Data on What Works
        ↓
Better AI Optimization
        ↓
Better Results for Sellers
        ↓
More Sellers Join
        ↓
(loop)
```

### Privacy & Ethics
- Never store raw competitor listing data permanently
- Anonymize all user listing data used for model improvement
- Clear user consent for data usage
- No scraping of private/authenticated marketplace data
- Comply with marketplace terms of service

---

## Future AI Features (Post-MVP)

### Phase 2
- **A+ Content Generator:** Rich media content generation with layout suggestions
- **Image Analysis:** Extract product features from photos (multimodal AI)
- **WhatsApp AI Bot:** Conversational listing generation via WhatsApp
- **Bulk Optimization Pipeline:** Batch process hundreds of listings

### Phase 3
- **Performance Prediction:** Predict listing conversion rate before publishing
- **Dynamic Optimization:** Auto-suggest listing updates based on trend changes
- **Ad Copy Generator:** Marketplace advertising copy from listing data
- **Video Script Generator:** Product video scripts from listing data

### Phase 4
- **Category-Specific Fine-Tuned Models:** Models trained on category-specific winning patterns
- **Real-Time Optimization Agent:** Continuous monitoring and suggestion engine
- **Pricing Intelligence:** Competitor price tracking and pricing suggestions
- **Demand Forecasting:** Predict category trends and suggest new products
