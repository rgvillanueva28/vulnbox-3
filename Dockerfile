# Dockerfile
FROM node:18-alpine

WORKDIR /app


COPY . .
RUN npm install


RUN npx prisma generate
#RUN npx prisma migrate deploy
#RUN npx prisma db seed

# Build the Next.js app
RUN npm run build

EXPOSE 3123

CMD ["npm", "run", "start"]
