#!/bin/bash

# Get changed packages from git diff
CHANGED_PACKAGES=$(git diff --name-only HEAD^1 | grep "^packages/" | cut -d'/' -f2 | sort | uniq)

# If no packages changed, exit
if [ -z "$CHANGED_PACKAGES" ]; then
    echo "No packages changed, skipping install"
    exit 0
fi

# Build pnpm filter arguments (multiple --filter for OR)
FILTER_ARGS=""
for pkg in $CHANGED_PACKAGES; do
    FILTER_ARGS="$FILTER_ARGS --filter=@diagnostics/$pkg"
done

echo "Installing for changed packages: $FILTER_ARGS"

# Run pnpm install with frozen lockfile and filters
pnpm install --frozen-lockfile $FILTER_ARGS