#!/bin/bash

# Get changed packages from git diff
CHANGED_PACKAGES=$(git diff --name-only HEAD^1 | grep "^packages/" | cut -d'/' -f2 | sort | uniq)

# If no packages changed, exit
if [ -z "$CHANGED_PACKAGES" ]; then
    echo "No packages changed, skipping turbo tasks"
    exit 0
fi

# Format for turbo filter
FILTER=$(echo "$CHANGED_PACKAGES" | sed 's/^/@diagnostics\//' | tr '\n' ' ' | sed 's/ $//')

echo "Changed packages: $FILTER"

# Run turbo with the changed packages
# First argument is the task, rest are turbo options
TASK=$1
shift
TURBO_ARGS="$@"

pnpm turbo run $TASK $TURBO_ARGS --filter="$FILTER"