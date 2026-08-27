# GreenFarm CRM

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

CRM demo login after `npm run seed` in the backend: `admin@greenfarm.test` / `Admin@123`.

## Build

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to any static host. Configure CORS on the API for this origin.
