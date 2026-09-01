# Maati CRM

Admin panel (React + Vite + CoreUI).

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

`VITE_API_URL` must point at the backend admin API, e.g. `http://localhost:5001/api/admin`.
`VITE_API_TOKEN` must match backend `API_TOKEN`.
For local seed images use `VITE_IMAGE_URL=http://localhost:5001/uploads/`.

CRM demo logins after `npm run seed` in the backend:

- Owner: `admin@greenfarm.test` / `Admin@123`
- Manager (Noida only): `ops@greenfarm.test` / `Admin@123`

## Build

```bash
npm run dev            # local API (Vite mode development)
npm run build:demo     # demo / portfolio API
npm run build          # production API
npm run preview
```

Vercel hosts this app. The API stays on Render. See [DEPLOY.md](../DEPLOY.md).
