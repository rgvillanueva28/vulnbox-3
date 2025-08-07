#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Run Prisma migrations
npx prisma migrate deploy

# Run the seed script
npx tsx prisma/seed.ts

# Execute the main command from CMD
exec "$@"