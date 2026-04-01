#!/bin/bash
# install.sh — Installa brainstorming-ai come plugin Claude Code
#
# Uso:
#   bash install.sh              # installa con symlink (consigliato)
#   bash install.sh --copy       # copia indipendente
#   bash install.sh --uninstall  # rimuovi skill installate

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILLS_DIR="$HOME/.claude/skills"
SKILLS=("bs-brainstorm" "bs-init" "bs-status")
MODE="symlink"

# Parse argomenti
for arg in "$@"; do
  case $arg in
    --copy) MODE="copy" ;;
    --uninstall) MODE="uninstall" ;;
    --help|-h)
      echo "Uso: bash install.sh [--copy|--uninstall]"
      echo "  (default)     Installa con symlink"
      echo "  --copy        Copia indipendente (senza symlink)"
      echo "  --uninstall   Rimuovi skill installate"
      exit 0
      ;;
  esac
done

# Crea directory skill se non esiste
mkdir -p "$SKILLS_DIR"

if [ "$MODE" = "uninstall" ]; then
  echo "🗑️  Disinstallazione brainstorming-ai..."
  for skill in "${SKILLS[@]}"; do
    if [ -L "$SKILLS_DIR/$skill" ] || [ -d "$SKILLS_DIR/$skill" ]; then
      rm -rf "$SKILLS_DIR/$skill"
      echo "  ✓ Rimosso $skill"
    fi
  done
  echo "✅ Disinstallazione completata!"
  echo "→ Riavvia Claude Code per applicare le modifiche."
  exit 0
fi

echo "📦 Installazione brainstorming-ai (modalità: $MODE)..."

for skill in "${SKILLS[@]}"; do
  src="$SCRIPT_DIR/skills/$skill"
  dst="$SKILLS_DIR/$skill"

  # Rimuovi installazione precedente
  if [ -L "$dst" ] || [ -d "$dst" ]; then
    rm -rf "$dst"
  fi

  if [ "$MODE" = "symlink" ]; then
    ln -sf "$src" "$dst"
    echo "  ✓ $skill → symlink"
  else
    cp -r "$src" "$dst"
    echo "  ✓ $skill → copiato"
  fi
done

echo ""
echo "✅ Installazione completata! 3 skill installate."
echo ""
echo "Skill disponibili:"
echo "  /bs-init       — Inizializza una sessione di brainstorming"
echo "  /bs-brainstorm — Avvia il trio creativo (Esplosione → Demolizione → Sintesi)"
echo "  /bs-status     — Mostra lo stato della sessione"
echo ""
echo "→ Riavvia Claude Code, poi esegui /bs-init per iniziare."
