# Guide: Monthly Summaries for the Blog Archive

This guide describes how to create and maintain yearly `_summary.json` files inside each `posts/YYYY/` folder.

## Purpose

Each yearly `_summary.json` contains:
- **Info**: Metadata about when/with which LLM the summaries were generated
- **Monthly summaries**: 200-500 character summary per month
- **Monthly highlights**: 2-3 key topics per month, stored in the month object

## File Location

- One file per year: `posts/YYYY/_summary.json`
- No global “all-years” file

## JSON Structure

```json
{
  "year": 2025,
  "info": "Diese Zusammen&shy;fassung wurde durch KI erstellt. Alle Posts des Monats wurden dazu von generativer KI analysiert und die wichtigsten Themen in 200-500 Zeichen durch sie zusammen&shy;gefasst. Die Text&shy;generierung fand im Februar 2026 durch OpenAI GPT-5.3 statt und kann Ungenauig&shy;keiten oder Fehler enthalten.",
  "months": [
    {
      "month": 1,
      "monthName": "Januar",
      "monthISO": "2025-01",
      "postCount": 10,
      "highlights": "22. Blog-Jubiläum (4.000+ Posts), Merz & AfD-Brandmauer, Musk-Hitlergruß",
      "summary": "..."
    }
  ]
}
```

### Fields

**Year level:**
- **year**: Year number (Number)
- **info**: Provenance string with date and LLM used (String)
  - Must include the month/year of generation and the exact LLM name when used

**Month level:**
- **month**: Month number 1-12 (Number)
- **monthName**: German month name (String)
- **monthISO**: ISO format "YYYY-MM" (String)
- **postCount**: Number of posts in the month (Number)
- **highlights**: Comma-separated list of 2-3 key topics/events (String, 50-100 characters)
- **summary**: Summary of the month (String, 200-500 characters)

## Monthly Summary Rules

### Length by Post Count

- **1-5 posts**: 200-250 characters
- **6-10 posts**: 250-300 characters
- **11-14 posts**: 300-400 characters
- **15+ posts**: 400-500 characters

Never exceed 500 characters.

### Content Guidelines

1. **Identify thematic focuses**:
   - Politics (national/international)
   - Personal matters
   - Technology & apps
   - Culture (TV shows, movies, music)
   - Science
   - Blog meta (anniversaries, technical updates)

2. **Structure**:
   - Start with the dominant theme or mood
   - Mention concrete events, posts, or topics
   - Many posts: group similar themes
   - Few posts: mention each topic individually

3. **Style**:
   - Concise and informative
   - Use concrete names (Trump, Merz, Apple, etc.)
   - Use product names for tech topics
   - Avoid generic statements

4. **Tone**:
   - Match the month’s mood
   - Critical, humorous, or emotional tones are fine
   - Stay authentic to the blog’s voice

## Monthly Highlights Rules

### Purpose

Each month has a **highlights** string that provides a quick, scannable overview of the most important themes. It is separate from the detailed summary.

### Guidelines

- Extract 2-3 most important topics from the monthly summary
- Prefer concrete events, releases, milestones, names, products, quotes
- Format: `"highlights": "topic1, topic2, topic3"`
- 50-100 characters
- Escape quotes (`\"`) for JSON compliance

## Summary Link Rules (Important)

Keywords in `summary` should be linked when they can be mapped to real posts of the same year/month.

### Linking Principle (Mandatory)

- Treat links as semantic references, not decoration.
- If a summary explicitly names a concrete topic that maps to one post in the same month, link it.
- In practice: explicit keyword(s) in summary text should be linked wherever mapping is clear.
- Do not leave obvious named items unlinked.

### What to Link

- Link only concrete keywords/topics that clearly correspond to existing blog posts.
- Prefer specific post-related terms (titles, product names, event names) over generic words.
- Link only in `summary`, never in `highlights`.
- Do not force links for every sentence. Only link where the mapping is clear.
- Also link descriptive phrases when they clearly map to one post (not only exact titles).
- If a phrase combines topic + person/object and is unambiguous, link the full phrase.
- Prioritize these linkable patterns when they map to one post:
  - unique media/artifact terms (for example interviews, manuals, parody projects)
  - concrete numeric facts/statistics tied to a post (for example "1,14 Mrd. Websites")
  - recurring projects/series names with clear post mapping
  - named events/releases that are specific enough to avoid ambiguity
- For one sentence with multiple mappable items, link multiple items if each mapping is unambiguous.
- Link comma-separated explicit item lists item-by-item when each item maps clearly.

### What Counts as an Explicit Keyword

Link these when mappable:

- Proper names (people, products, projects, organizations)
- Distinct post titles or title-like phrases
- Named events/releases/features (for example "WWDC 2020", "iOS 15.4", "ChatGPT Search")
- Distinctive coined terms, campaign names, or meme labels
- Concrete numeric facts that are explicitly tied to one post

Do **not** link:

- generic filler words ("Review", "Trailer", "Podcast", "Artikel")
- vague theme labels ("Politik", "Tech", "Web")
- ambiguous phrases mapping to multiple posts in the same month

### Minimum Link Coverage by Post Count

- For months with `postCount >= 10`: summary must contain at least **5 links**.
- For months with `postCount >= 15`: target usually **8+ links** when the summary contains enough explicit items.
- For months with fewer posts: still link all clear explicit keywords, even if total links are below 5.

### Link Format

- Use HTML links, not Markdown links.
- Required format: `<a href=\"https://eay.cc/YYYY/slug/\">Keyword</a>`
- Keep links inline inside the summary text.
- Escape quotes in JSON as usual.
- Prefer linking the full meaningful phrase, not only one isolated word.
- Do not create nested links or partially overlapping links.
- Keep anchor text concise (typically 1-5 words), not full sentence fragments.
- Do not include dangling punctuation in anchor text when avoidable.
- Avoid linking the same URL repeatedly in one month summary unless repeated reference is semantically necessary.

❌ **Wrong (Markdown link):**
```json
"summary": "Mehr dazu in [How Browsers Work](https://eay.cc/2026/how-browsers-work/)."
```

✅ **Correct (HTML link):**
```json
"summary": "Mehr dazu in <a href=\"https://eay.cc/2026/how-browsers-work/\">How Browsers Work</a>."
```

### Slug / URL Validation (Required)

Before finalizing a `_summary.json` file:

- Verify every `href` points to a real existing post URL.
- Match against the `url` field in the Markdown front matter of `posts/YYYY/*.md`.
- If no matching post exists, remove or correct the link.
- Do not guess slugs.
- Ensure link target year matches the summary year (no cross-year links).
- Ensure link target month matches `monthISO` of the summary entry.
- Run a syntax check for malformed links (for example broken or nested `<a>` tags).

### Manual Month-by-Month Link Pass (Required)

After drafting/updating summaries, run this pass for **every month in every year**:

1. Read one month summary line-by-line.
2. Mark each explicit keyword/keyword phrase in the text.
3. Map each marked item to one concrete post URL from `posts/YYYY/*.md` with matching month.
4. Insert HTML links for all unambiguous items.
5. Re-check link density (minimum 5 links for `postCount >= 10`).
6. Validate syntax and URLs.

## Process

### Adding or Updating a Month

1. Group all Markdown files from `posts/YYYY/` by month
2. Count posts per month
3. Read all posts of the month (titles, tags, content)
4. Write the summary to the correct length range
5. Add month highlights
6. Update `posts/YYYY/_summary.json`

### Adding a New Year

1. Create `posts/YYYY/_summary.json`
2. Add `year`, `info`, and initial `months` entries
3. Keep field order: `year` → `info` → `months`

## JSON Escaping

Quotation marks inside strings must be escaped: `\"`.

## ASCII Hyphens (Important)

Use only plain ASCII hyphens (`-`) in all summaries and highlights. Do not use en dashes, em dashes, or non-breaking hyphens.

## Soft Hyphens for German Compound Words (Important)

Add HTML soft hyphens (`&shy;`) to long German compound words to improve readability and responsive typography:

### When to Add Soft Hyphens

- **Only for compound words with at least 12-14 characters**
- Place `&shy;` **only at natural breaking points** between major word components
- Examples:
  - ✅ `Zusammen&shy;fassungen`, `Text&shy;generierung`, `Ungenauig&shy;keiten`
  - ✅ `Schwer&shy;punkten`, `Technik&shy;funde`, `Monats&shy;mix`
  - ✅ `Serien&shy;kultur`, `Bundestags&shy;wahl`, `Online&shy;werbung`
  - ❌ `Webdebatten`, `Popkultur` (too short, under 12 characters)

### Where NOT to Add Soft Hyphens

- Short words (under 12 characters)
- Proper names and brand names
- Words with real hyphens (e.g., `Star-Wars-Popkultur`, `Retro-Referenzen`)
- Abbreviations
- Text inside HTML tags or attributes
- Accessibility or metadata text (alt text, aria-labels, SEO meta descriptions)

### Common Patterns in Summaries

Standard words that should have soft hyphens when they appear:

- `Zusammenfassungen` → `Zusammen&shy;fassungen`
- `zusammengefasst` → `zusammen&shy;gefasst`
- `Textgenerierung` → `Text&shy;generierung`
- `Ungenauigkeiten` → `Ungenauig&shy;keiten`
- `Schwerpunkten` → `Schwer&shy;punkten`
- `Technikfunde` → `Technik&shy;funde`
- `Monatsmix` → `Monats&shy;mix`
- `Serienkultur` → `Serien&shy;kultur`
- `Spielekultur` → `Spiele&shy;kultur`
- `Bundestagswahl` → `Bundestags&shy;wahl`

## Umlaute and Eszett (Important)

Write normal German spelling in generated texts:

- Use `ä`, `ö`, `ü` directly (not `ae`, `oe`, `ue`) in `info`, `highlights`, and `summary`.
- Use `ß` where correct in German orthography (for example `größer`, `Straße`, `heißt`).
- Keep original spelling for quoted proper nouns, product names, and English titles.

Examples:

❌ **Wrong**:
```json
"summary": "Matt Webbs "AI Clock" ist interessant."
```

✅ **Correct**:
```json
"summary": "Matt Webbs \"AI Clock\" ist interessant."
```

❌ **Wrong**:
```json
"highlights": "Craig Mod: "Walk and write every day""
```

✅ **Correct**:
```json
"highlights": "Craig Mod: \"Walk and write every day\""
```

## Quality Assurance

### Monthly Summaries
- [ ] 200-500 characters, proportional to post count
- [ ] Covers all main themes with concrete names/products
- [ ] Tone matches the month
- [ ] German month names and ISO dates are correct
- [ ] Links only where clearly mappable to real posts
- [ ] Links use HTML format: `<a href=\"...\">...</a>`
- [ ] Every link URL validated against existing post front matter URLs

### Monthly Highlights
- [ ] Present in each month object
- [ ] 50-100 characters, 2-3 concrete topics
- [ ] Quotes escaped correctly
- [ ] No links in `highlights`

### Technical
- [ ] JSON valid, no trailing commas
- [ ] Indentation: 2 spaces
- [ ] Field order: year → info → months

## Common Mistakes to Avoid

### Monthly Summaries
- ❌ More than 500 characters, including spaces etc.
- ❌ Too short for many posts
- ❌ Generic statements
- ❌ Unescaped quotes
- ❌ Wrong ISO format or English month names

### Monthly Highlights
- ❌ Missing highlights
- ❌ Vague/generic topics
- ❌ Unescaped quotes

### Technical
- ❌ JSON syntax errors
- ❌ Trailing commas
- ❌ Inconsistent indentation
