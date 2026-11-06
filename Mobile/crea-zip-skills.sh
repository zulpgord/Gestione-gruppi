#!/usr/bin/env bash
# Genera uno zip per ogni skill, pronto da caricare su claude.ai
# (Impostazioni -> Skills -> carica: una skill = uno zip)
#
# Uso:  ./Mobile/crea-zip-skills.sh [cartella-di-destinazione]
# Default destinazione: ~/Documents/skills-zip

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILLS_DIR="$REPO_ROOT/Skills"
OUT_DIR="${1:-$HOME/Documents/skills-zip}"

if [[ ! -d "$SKILLS_DIR" ]]; then
  echo "Errore: non trovo $SKILLS_DIR" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"
rm -f "$OUT_DIR"/*.zip

count=0
for skill_path in "$SKILLS_DIR"/*/; do
  skill="$(basename "$skill_path")"
  if [[ ! -f "$skill_path/SKILL.md" ]]; then
    echo "  salto $skill (nessun SKILL.md)"
    continue
  fi
  ( cd "$SKILLS_DIR" && zip -rq "$OUT_DIR/$skill.zip" "$skill" -x '*.DS_Store' )
  echo "  $skill.zip"
  count=$((count + 1))
done

echo
echo "$count zip creati in: $OUT_DIR"
