# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm install

# Build the Next.js app
RUN npm run build

# Copy the entrypoint script into the container
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

# Use the entrypoint script
ENTRYPOINT ["./docker-entrypoint.sh"]

# The default command to be executed by the entrypoint script
CMD ["npm", "run", "start"]