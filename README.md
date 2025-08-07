# Man-in-the-middle

This application is named Man-in-the middle because it contains a vulnerability in Next.JS middleware and the flag is in the API call.

---

## 🚀 Production Setup

### 1. `.env.production`

```env
DATABASE_URL=postgresql://postgres:password@db:5432/nextauth
JWT_SECRET=your-production-secret
```

### 2. Build and Start

```bash
docker compose up --build -d
```

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

## 🧪 Testing

You can test login with the seeded admin user:

```
email: administrator@orion.xyz
password: adminSup3rS3cur3P@ssw0rd
```
