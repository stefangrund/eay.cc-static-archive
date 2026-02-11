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
  "info": "Die Zusammenfassungen wurden durch KI erstellt. Alle Posts eines Monats wurden dazu von generativer KI analysiert und die wichtigsten Themen in 200-500 Zeichen durch sie zusammengefasst. Die Textgenerierung fand im Februar 2026 durch Anthropic Claude Sonnet 4.5 statt und kann Ungenauigkeiten oder Fehler enthalten.",
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

### Monthly Highlights
- [ ] Present in each month object
- [ ] 50-100 characters, 2-3 concrete topics
- [ ] Quotes escaped correctly

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
