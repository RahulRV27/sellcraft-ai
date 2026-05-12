# MVP Specification

## MVP Philosophy

**Build the smallest thing that proves sellers will pay for AI-powered listing optimization.**

The MVP is NOT a feature showcase. It's a proof of three hypotheses:
1. Sellers will use AI to generate/optimize listings (usage hypothesis)
2. AI-generated listings measurably outperform seller-created listings (quality hypothesis)
3. Sellers will pay for this value (monetization hypothesis)

## MVP Scope (4-6 Weeks Build)

### Platforms Supported
- Amazon India
- Flipkart

### Categories Supported (Top 10 by seller volume)
1. Fashion & Apparel
2. Electronics & Accessories
3. Home & Kitchen
4. Beauty & Personal Care
5. Health & Wellness
6. Baby Products
7. Sports & Fitness
8. Books & Stationery
9. Grocery & Gourmet
10. Toys & Games

---

## Core Features (MVP)

### Feature 1: AI Listing Generator
**What:** Input product details → get marketplace-ready listing

**Input:**
- Product name / category
- Key features (bullet points or free text)
- Target platform (Amazon India / Flipkart)
- Price range
- Target audience (optional)
- Product images (optional — for future image analysis)

**Output:**
- Optimized title (platform-specific character limits)
- 5 bullet points (feature-benefit format)
- Product description (SEO-optimized)
- Search keywords / backend keywords
- Suggested attributes

**AI Behavior:**
- Use platform-specific title formulas (e.g., Amazon: Brand + Product + Key Feature + Size/Color)
- Apply category-specific optimization patterns
- Include Hinglish keywords where relevant
- Follow platform character limits and formatting rules
- Include high-search-volume keywords naturally

**User Flow:**
```
Select Platform → Enter Product Details → Choose Category →
→ AI Generates Listing → Review & Edit → Copy/Export
```

### Feature 2: Listing Quality Scorer
**What:** Paste an existing listing → get a quality score (0-100) with specific improvement suggestions

**Scoring Criteria:**
- Title optimization (keyword presence, format, length) — 20 points
- Bullet point quality (feature-benefit format, completeness) — 20 points
- Description quality (SEO, readability, persuasion) — 20 points
- Keyword coverage (search term presence) — 20 points
- Platform compliance (character limits, formatting rules) — 10 points
- Competitive positioning (vs category benchmarks) — 10 points

**Output:**
- Overall score (0-100)
- Category breakdown
- Top 5 specific improvements
- "Fix with AI" button for each improvement
- Comparison to category average score

**Why This Feature is Critical:**
- Creates urgency ("Your listing scores 34/100")
- Demonstrates value before payment
- Provides objectivity (data, not opinions)
- Drives upgrades ("Fix all issues → requires Pro plan")

### Feature 3: One-Click Listing Optimizer
**What:** Paste existing listing → get optimized version

**How it works:**
1. Analyze current listing
2. Score it against category benchmarks
3. Identify specific weaknesses
4. Generate optimized version
5. Show before/after comparison with score improvement

**Output:**
- Original listing with issues highlighted
- Optimized listing
- Score improvement (e.g., "34 → 78")
- Specific changes explained

### Feature 4: Keyword Suggestion Engine
**What:** Enter product/category → get relevant keywords ranked by estimated search volume

**Sources:**
- Marketplace autocomplete data (scraping)
- Category-specific keyword databases
- Competitor listing keyword extraction
- Hinglish keyword variations

**Output:**
- Primary keywords (highest volume)
- Long-tail keywords
- Hinglish variations
- Seasonal keywords (festival/trend-based)
- Keywords your competitors use that you're missing

### Feature 5: Competitor Listing Analysis (Basic)
**What:** Paste competitor listing URL → get analysis of what they're doing well and what you can do better

**Output:**
- Competitor listing score
- Keywords they're using
- Title structure analysis
- Gaps you can exploit
- Suggested improvements for your listing based on competitor intelligence

---

## User Experience Requirements

### Dashboard
- Clean, minimal interface
- Quick action buttons: "Create Listing", "Score Listing", "Optimize Listing"
- Recent listings / history
- Usage counter (X/Y listings this month)
- Upgrade prompt when approaching limits

### Onboarding
- No signup wall for first listing (generate 1 free listing without account)
- Sign up to save and access more features
- 3-step guided first experience:
  1. Choose platform
  2. Enter product details
  3. Get your listing
- Time to first value: < 60 seconds

### Mobile Responsiveness
- Full functionality on mobile browser
- Optimized for smartphone screen sizes
- Touch-friendly UI elements
- Easy copy-to-clipboard functionality

---

## Technical Requirements

### Performance
- Listing generation: < 15 seconds
- Listing scoring: < 5 seconds
- Keyword suggestions: < 10 seconds
- Page load: < 3 seconds

### Limits (by Plan)
| Feature | Free | Starter | Growth |
|---------|------|---------|--------|
| Listings/month | 5 | 50 | 200 |
| Platforms | 1 | 2 | All |
| Listing score | 10/month | Unlimited | Unlimited |
| Keyword suggestions | Basic | Full | Full + Competitor |
| Competitor analysis | No | 5/month | 30/month |
| Bulk optimization | No | No | Yes |

---

## NOT in MVP (Explicitly Excluded)

- A+ / Enhanced Brand Content generation (Phase 2)
- Quick commerce platforms (Phase 2)
- Regional language support beyond Hinglish (Phase 2)
- WhatsApp bot (Phase 2)
- API access (Phase 2)
- Multi-account / agency features (Phase 2)
- Ad copy generation (Phase 3)
- Pricing intelligence (Phase 3)
- Image optimization (Phase 3)
- Video script generation (Phase 3)
- Performance tracking / analytics dashboard (Phase 3)

---

## Success Criteria for MVP

### Week 1-2 Post-Launch
- 500+ sellers sign up
- 100+ listings generated
- Net Promoter Score > 30
- Average listing quality improvement > 30%

### Week 3-4 Post-Launch
- 2,000+ sellers signed up
- 10+ paying customers (proves willingness to pay)
- < 20% Day-7 retention drop
- User feedback identifies top 3 improvement areas

### Month 2
- 5,000+ sellers signed up
- 100+ paying customers
- MRR > ₹1 lakh
- Clear signal on which persona converts best

---

## Acceptance Criteria for Each Feature

### Listing Generator
- [ ] Generates title within platform character limits
- [ ] Generates exactly 5 bullet points
- [ ] Generates description with SEO keywords naturally embedded
- [ ] Output differs meaningfully for Amazon vs Flipkart
- [ ] Output differs meaningfully across categories
- [ ] Hinglish keywords included where natural
- [ ] Generation completes in < 15 seconds
- [ ] User can edit output before copying

### Listing Scorer
- [ ] Scores consistently (same listing = same score within ±3 points)
- [ ] Score breakdown shows 6 categories
- [ ] Provides minimum 3 specific improvement suggestions
- [ ] "Fix with AI" button works for each suggestion
- [ ] Score correlates with perceived listing quality (validate manually with 50 listings)

### Optimizer
- [ ] Before/after comparison is visually clear
- [ ] Score improvement is shown numerically
- [ ] Changes are highlighted/underlined
- [ ] Optimized version can be copied with one click
- [ ] Optimization completes in < 15 seconds

### Keyword Engine
- [ ] Returns minimum 20 keywords per query
- [ ] Keywords are categorized (primary, long-tail, Hinglish)
- [ ] Results feel relevant (manual validation with 20 product types)
- [ ] Includes search volume estimates (even rough estimates)

### Competitor Analysis
- [ ] Extracts competitor title, bullets, description
- [ ] Generates competitor score
- [ ] Identifies 3+ actionable gaps
- [ ] Suggests improvements based on competitor strengths
