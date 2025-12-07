
# Auth Flow Assignment – React + Node + Mongo

This project matches the assignment:

- **React** frontend with a clean Login / Sign Up UI.
- **Node.js + Express + MongoDB** backend.
- Proper **authentication (JWT)**, **validation**, and **clear error messages**.
- After login, the user is redirected to a protected **dashboard page**.
- Ready to deploy on **Render (backend)** and **Vercel / Netlify (frontend)**.

## How to run locally

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # put your MongoDB string + JWT_SECRET
npm run dev
```

Server runs on **http://localhost:5000**

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

The Vite dev server proxies `/api` calls to `http://localhost:5000`.

## Deployment (example)

- Deploy `server/` to **Render** as a Node service.
- Deploy `client/` to **Vercel** or **Netlify**.
- In production, change the `baseURL` in `client/src/api.js` from `/api` to your live backend URL.

## Optional n8n workflow (bonus idea)

Create an **HTTP Webhook** node in n8n that listens on e.g. `/webhook/new-user`.  
In `authRoutes.js` inside the `/register` route, after user creation, call that webhook with `fetch` or `axios` and pass the user email.  
The n8n workflow can then:

- Send a welcome email.
- Append the user to a Google Sheet.

This keeps all workflow logic outside the core app while fulfilling the bonus requirement.
