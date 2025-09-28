#!/bin/bash

# Get changed packages from git diff
CHANGED_PACKAGES=$(git diff --name-only HEAD^1 | grep "^packages/" | cut -d'/' -f2 | sort | uniq)

# If no packages changed, exit
if [ -z "$CHANGED_PACKAGES" ]; then
    echo "No packages changed, skipping turbo tasks"
    exit 0
fi

# Format for turbo filter as multiple --filter args
FILTER_ARGS=()
for pkg in $CHANGED_PACKAGES; do
  FILTER_ARGS+=(--filter=@diagnostics/$pkg)
done

echo "Changed packages: ${FILTER_ARGS[*]}"

# Run turbo with the changed packages
# First argument is the task, rest are turbo options
TASK=$1
shift
TURBO_ARGS="$@"

pnpm turbo run $TASK $TURBO_ARGS "${FILTER_ARGS[@]}"