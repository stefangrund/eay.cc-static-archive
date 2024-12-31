#!/usr/bin/env bash

# Determine the base path relative to the script location
BASE_DIR=$(dirname "$(dirname "$(realpath "$0")")")
POSTS_DIR="$BASE_DIR/posts"

echo "Starting analysis of markdown files in $POSTS_DIR..."

# Loop through the years 2007 to 2029
for year in {2007..2029}; do
  post_count=0
  word_count=0
  char_count=0

  # Check if the year folder exists
  if [ -d "$POSTS_DIR/$year" ]; then
    # Count .md files
    post_count=$(find "$POSTS_DIR/$year" -type f -name "*.md" 2>/dev/null | wc -l)
    
    # Process each .md file to count words and characters
    for file in "$POSTS_DIR/$year"/*.md; do
      if [ -f "$file" ]; then
        # Extract the title and content, exclude front matter
        content=$(awk '
          BEGIN { capture=0; title="" }
          /^---$/ && !capture { capture=1; next }
          /^title:/ { title=$0 }
          /^---$/ && capture { capture=2; next }
          capture==2 { print }
          END { print title }
        ' "$file")

        # Remove HTML tags from the content
        clean_content=$(echo "$content" | sed -E 's/<[^>]*>//g')

        # Count words and characters
        word_count=$((word_count + $(echo "$clean_content" | wc -w)))
        char_count=$((char_count + $(echo -n "$clean_content" | wc -m)))
      fi
    done

    # Print the results for the year
    echo "- $year: $post_count posts, $word_count words, $char_count chars"
  else
    echo "Skipping year $year (no folder found)..."
  fi
done

echo "Report completed."