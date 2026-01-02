#!/usr/bin/env bash

# Determine the base path relative to the script location
BASE_DIR=$(dirname "$(dirname "$(realpath "$0")")")
POSTS_DIR="$BASE_DIR/posts"

echo "Starting analysis of markdown files in $POSTS_DIR..."

# Get the current year dynamically
CURRENT_YEAR=$(date +%Y)

# Initialize totals
total_posts=0
total_words=0
total_chars=0

# Loop through the years 2007 to current year
for year in $(seq 2007 "$CURRENT_YEAR"); do
  # Check if the year folder exists and has .md files
  if [ -d "$POSTS_DIR/$year" ]; then
    # Check if there are any .md files
    shopt -s nullglob
    files=("$POSTS_DIR/$year"/*.md)
    shopt -u nullglob
    
    if [ ${#files[@]} -eq 0 ]; then
      echo "Skipping year $year (no .md files found)..."
      continue
    fi
    
    # Process all .md files in one go using a single awk command
    result=$(awk '
      BEGIN {
        post_count = 0
        word_count = 0
        char_count = 0
        in_frontmatter = 0
        frontmatter_count = 0
      }
      
      # New file (FNR resets to 1 for each new file)
      FNR == 1 {
        post_count++
        in_frontmatter = 0
        frontmatter_count = 0
      }
      
      # Detect frontmatter boundaries
      /^---$/ {
        frontmatter_count++
        if (frontmatter_count <= 2) {
          in_frontmatter = (frontmatter_count == 1)
          next
        }
      }
      
      # Skip frontmatter lines
      in_frontmatter { next }
      
      # Process content (remove HTML tags and count)
      !in_frontmatter && frontmatter_count >= 2 {
        # Remove HTML tags
        line = $0
        gsub(/<[^>]*>/, "", line)
        
        # Count words (split on whitespace)
        n = split(line, words, /[[:space:]]+/)
        for (i = 1; i <= n; i++) {
          if (words[i] != "") word_count++
        }
        
        # Count characters (excluding newlines)
        char_count += length(line)
      }
      
      END {
        print post_count " " word_count " " char_count
      }
    ' "${files[@]}")
    
    # Parse the result
    read -r post_count word_count char_count <<< "$result"
    
    # Print the results for the year (default to 0 if no files)
    echo "- $year: ${post_count:-0} posts, ${word_count:-0} words, ${char_count:-0} chars"
    
    # Add to totals
    total_posts=$((total_posts + ${post_count:-0}))
    total_words=$((total_words + ${word_count:-0}))
    total_chars=$((total_chars + ${char_count:-0}))
  else
    echo "Skipping year $year (no folder found)..."
  fi
done

echo ""
echo "Total: $total_posts posts, $total_words words, $total_chars chars"
echo ""
echo "Report completed."
