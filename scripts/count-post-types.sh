#!/usr/bin/env bash

# Determine the base path relative to the script location
BASE_DIR=$(dirname "$(dirname "$(realpath "$0")")")
POSTS_DIR="$BASE_DIR/posts"

echo "Starting post type analysis of markdown files in $POSTS_DIR..."

# Get the current year dynamically
CURRENT_YEAR=$(date +%Y)

# Collect markdown files from valid year folders only, matching count-posts.sh.
files=()
for year in $(seq 2007 "$CURRENT_YEAR"); do
  if [ -d "$POSTS_DIR/$year" ]; then
    shopt -s nullglob
    year_files=("$POSTS_DIR/$year"/*.md)
    shopt -u nullglob

    if [ ${#year_files[@]} -gt 0 ]; then
      files+=("${year_files[@]}")
    fi
  fi
done

if [ ${#files[@]} -eq 0 ]; then
  echo "No markdown files found."
  echo ""
  echo "Report completed."
  exit 0
fi

awk -v since_date="2012-05-01" '
  BEGIN {
    aside = 0
    image = 0
    link = 0
    status = 0
    quote = 0
    post = 0
    other = 0
    total = 0
    aside_since = 0
    image_since = 0
    link_since = 0
    status_since = 0
    quote_since = 0
    post_since = 0
    other_since = 0
    total_since = 0
    frontmatter_count = 0
    in_frontmatter = 0
    current_date = ""
    current_format = ""
  }

  function trim(value) {
    gsub(/^[[:space:]]+|[[:space:]]+$/, "", value)
    return value
  }

  function percentage(count) {
    if (total == 0) return "0.00"
    return sprintf("%.2f", (count / total) * 100)
  }

  function percentage_since(count) {
    if (total_since == 0) return "0.00"
    return sprintf("%.2f", (count / total_since) * 100)
  }

  function normalize_format(format) {
    if (format == "") return "post"
    if (format == "statusmitteilung") return "status"
    return format
  }

  function count_format(format, date) {
    format = normalize_format(format)

    if (format == "aside") aside++
    else if (format == "image") image++
    else if (format == "link") link++
    else if (format == "status") status++
    else if (format == "quote") quote++
    else if (format == "post") post++
    else other++

    total++

    if (date >= since_date) {
      if (format == "aside") aside_since++
      else if (format == "image") image_since++
      else if (format == "link") link_since++
      else if (format == "status") status_since++
      else if (format == "quote") quote_since++
      else if (format == "post") post_since++
      else other_since++

      total_since++
    }
  }

  FNR == 1 {
    if (NR > 1) {
      count_format(current_format, current_date)
    }

    frontmatter_count = 0
    in_frontmatter = 0
    current_date = ""
    current_format = "post"
  }

  /^---$/ {
    frontmatter_count++
    if (frontmatter_count <= 2) {
      in_frontmatter = (frontmatter_count == 1)
      next
    }
  }

  in_frontmatter && /^format:/ {
    current_format = $0
    sub(/^format:[[:space:]]*/, "", current_format)
    gsub(/^"|"$/, "", current_format)
    current_format = trim(current_format)
  }

  in_frontmatter && /^date:/ {
    current_date = $0
    sub(/^date:[[:space:]]*/, "", current_date)
    gsub(/^"|"$/, "", current_date)
    current_date = trim(current_date)
  }

  END {
    if (NR > 0) {
      count_format(current_format, current_date)
    }

    print "Post type distribution:"
    printf "- Asides: %d posts (%s%%)\n", aside, percentage(aside)
    printf "- Bilder: %d posts (%s%%)\n", image, percentage(image)
    printf "- Links: %d posts (%s%%)\n", link, percentage(link)
    printf "- Status-Posts: %d posts (%s%%)\n", status, percentage(status)
    printf "- Zitate: %d posts (%s%%)\n", quote, percentage(quote)
    printf "- Standard-Posts: %d posts (%s%%)\n", post, percentage(post)

    if (other > 0) {
      printf "- Andere/Unbekannt: %d posts (%s%%)\n", other, percentage(other)
    }

    print ""
    printf "Total: %d posts\n", total

    print ""
    print "Post type distribution since May 2012:"
    printf "- Asides: %d posts (%s%%)\n", aside_since, percentage_since(aside_since)
    printf "- Bilder: %d posts (%s%%)\n", image_since, percentage_since(image_since)
    printf "- Links: %d posts (%s%%)\n", link_since, percentage_since(link_since)
    printf "- Status-Posts: %d posts (%s%%)\n", status_since, percentage_since(status_since)
    printf "- Zitate: %d posts (%s%%)\n", quote_since, percentage_since(quote_since)
    printf "- Standard-Posts: %d posts (%s%%)\n", post_since, percentage_since(post_since)

    if (other_since > 0) {
      printf "- Andere/Unbekannt: %d posts (%s%%)\n", other_since, percentage_since(other_since)
    }

    print ""
    printf "Total since May 2012: %d posts\n", total_since
  }
' "${files[@]}"

echo ""
echo "Report completed."
