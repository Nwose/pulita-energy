# Prisma to Convex Migration

This project has been migrated from Prisma to Convex for database management.

## Changes Made

### 1. Removed Prisma Dependencies

- Removed `@prisma/client` and `prisma` from package.json
- Deleted `prisma/` directory and all migration files
- Removed `app/generated/` directory
- Updated `.eslintignore` and `.gitignore` to remove Prisma references

### 2. Added Convex Setup

- Installed `convex` package
- Created `convex/` directory with schema and functions
- Added Convex provider to the app layout

### 3. Database Schema Migration

The Prisma schema has been converted to Convex schema:

**Users Table:**

- email (string, indexed)
- password (string)
- role (string)
- createdAt (number)

**Blogs Table:**

- title, slug, excerpt, content, image (strings)
- author, authorAvatar (strings)
- date, createdAt, updatedAt (numbers)
- authorId (optional string, indexed)

**Projects Table:**

- challenges (array of strings)
- date, details, name, summary (strings)
- images (array of strings)
- createdAt, updatedAt (numbers)
- authorId (optional string, indexed)

**Products Table:**

- title, text, image (strings)
- icons (array of strings)
- details (optional string)
- pdfs (optional any)
- isActive (boolean, indexed)
- createdAt, updatedAt (numbers)
- authorId (optional string, indexed)

### 4. API Routes Updated

All API routes now use Convex instead of Prisma:

- `app/api/products/route.ts`
- `app/api/projects/route.ts`
- `app/api/projects/[id]/route.ts`
- `app/api/blogs/route.ts`
- `app/api/blogs/[slug]/route.ts`
- `app/api/auth/login/route.ts`
- `app/api/auth/register/route.ts`
- `app/api/admin/projects/route.ts`
- `app/api/admin/blogs/route.ts`
- `app/api/admin/products/route.ts`
- `app/api/admin/users/route.ts`

### 5. Convex Functions Created

- `convex/schema.ts` - Database schema
- `convex/auth.ts` - Authentication functions (login, register, getUsers, deleteUser)
- `convex/products.ts` - Product CRUD operations
- `convex/projects.ts` - Project CRUD operations
- `convex/blogs.ts` - Blog CRUD operations

### 6. Client-Side Integration

- Created `app/providers.tsx` with ConvexProvider
- Created `app/hooks/useConvex.ts` for client-side hooks
- Created `components/Products/ProductsClient.tsx` as an example
- Updated `app/layout.tsx` to include Convex provider

### 7. Scripts Updated

- Updated `scripts/create-superadmin.mjs` to use Convex instead of Prisma

## Usage

### Server-Side (API Routes)

```typescript
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Query data
const products = await convex.query(api.products.getProducts);

// Mutate data
const result = await convex.mutation(api.auth.login, { email, password });
```

### Client-Side

```typescript
import { useProducts } from "../hooks/useConvex";

const products = useProducts(); // Real-time data
```

## Environment Variables

Make sure you have these environment variables set:

- `NEXT_PUBLIC_CONVEX_URL` - Your Convex deployment URL

## Development

Run the development server with Convex:

```bash
npm run dev
# In another terminal:
npm run convex:dev
```

## Notes

- Authentication is simplified for now (no password hashing)
- JWT tokens are not implemented yet
- The migration preserves all existing data structure
- Real-time updates are now available through Convex
- All admin routes now use Convex for CRUD operations
- Individual project and blog routes have been migrated

## Next Steps

1. Implement proper password hashing with Node.js actions
2. Add JWT token authentication
3. Migrate existing data to Convex
4. Add more complex queries and mutations as needed
5. Test all admin functionality with the new Convex backend
