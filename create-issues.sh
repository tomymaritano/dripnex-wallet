#!/bin/bash

# Crea label si no existe
gh label create "Backlog" --color "6a737d" --description "Planned tasks" 2>/dev/null
gh label create "Docs" --color "23aaac" --description "Planned tasks" 2>/dev/null
# Cargar issues desde archivo
while IFS= read -r line
do
  if [[ $line == Title:* ]]; then
    title=${line#Title: }
  elif [[ $line == Body:* ]]; then
    body=${line#Body: }
  elif [[ $line == Labels:* ]]; then
    labels=${line#Labels: }
    gh issue create --title "$title" --body "$body" --label "$labels"
  fi
done < issues.txt