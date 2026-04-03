# Next.js Setup

โปรเจกต์เวอร์ชันหลักตอนนี้คือ `Next.js 15 + TypeScript + Tailwind CSS + Prisma + MySQL`

## Run

```powershell
npm install
```

สร้างไฟล์ `.env.local`

```env
DATABASE_URL="mysql://root:password@127.0.0.1:3306/portfolio_app"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
```

จากนั้นรัน

```powershell
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

## Pages

- Public site: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`
- Admin dashboard: `http://localhost:3000/admin`

## Main files

- `app/page.tsx`
- `app/admin/page.tsx`
- `app/admin/login/page.tsx`
- `prisma/schema.prisma`
- `lib/seed-data.ts`
- `components/portfolio-page.tsx`
