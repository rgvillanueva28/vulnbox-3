# 🔐 Next.js Auth App with PostgreSQL & JWT

A full-featured authentication system using **Next.js**, **PostgreSQL**, **Tailwind CSS**, **Prisma**, and **JWT (stored in HTTP-only cookies)**.

Includes:
- User registration & login
- Admin-only `/dashboard` route using `middleware.ts`
- Session-aware `Navbar`
- Client-side `useAuth` hook
- Simple number guessing game for logged-in users
- Dev/prod separation with Docker

---

## 🛠️ Development Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up PostgreSQL (Development)

Create a separate `docker-compose.dev.yml` for dev:

```yaml
version: "3.8"

services:
  db:
    image: postgres:16
    restart: always
    environment:
      POSTGRES_USER: devuser
      POSTGRES_PASSWORD: devpass
      POSTGRES_DB: devdb
    volumes:
      - devdata:/var/lib/postgresql/data
    ports:
      - "5433:5432"

volumes:
  devdata:
```

Then run it:

```bash
docker compose -f docker-compose.dev.yml up -d
```

### 4. Create `.env`

```env
DATABASE_URL=postgresql://devuser:devpass@localhost:5433/devdb
JWT_SECRET=dev-secret
```

### 5. Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
```

### 6. Start Dev Server

```bash
npm run dev
```

App: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Production Setup

### 1. Docker Compose

Create/modify your `docker-compose.yml`:

```yaml
version: "3.8"

services:
  db:
    image: postgres:16
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: nextauth
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  web:
    build: .
    container_name: nextjs-app
    depends_on:
      - db
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production

volumes:
  pgdata:
```

### 2. `.env.production`

```env
DATABASE_URL=postgresql://postgres:password@db:5432/nextauth
JWT_SECRET=your-production-secret
```

### 3. `Dockerfile`

```Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
```

### 4. Build and Start

```bash
docker compose up --build
```

### 5. Migrate & Seed

```bash
docker compose exec web npx prisma migrate deploy
docker compose exec web npx tsx prisma/seed.ts
```

---

## 📁 Project Structure

```
components/
  Navbar.tsx
  AuthForm.tsx
hooks/
  useAuth.ts
middleware.ts
pages/
  api/
    auth/
      login.ts
      logout.ts
      me.ts
      register.ts
  dashboard.tsx
  index.tsx
  login.tsx
  register.tsx
lib/
  auth.ts
  prisma.ts
prisma/
  schema.prisma
.env
.env.production
```

---

## ✅ Features

- 🔐 JWT in HTTP-only cookies
- 👮 Admin-only route (`/dashboard`) with dynamic messaging (not redirects)
- 🎮 Number guessing game (5 attempts only)
- 🔁 Auth-aware navbar and logout
- 💻 Dev & prod database isolation

---

## 🧪 Testing

You can test login with the seeded admin user:

```
email: admin@example.com
password: admin123
```

---

## 📜 License

MIT