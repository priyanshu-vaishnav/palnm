# 🚀 RiseNova Portfolio — Deployment Guide

## Project Structure
```
fixed_project/
├── backend/     → Render pe deploy karein
└── frontend/    → Vercel pe deploy karein
```

---

## STEP 1 — MongoDB Atlas Setup (Free)

1. https://mongodb.com/atlas pe jaao
2. Free cluster banao
3. Database user banao (username + password yaad rakhein)
4. Network Access → Allow from anywhere (0.0.0.0/0)
5. Connection string copy karein — kuch aisa dikhega:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/risenova
   ```

---

## STEP 2 — Backend → Render Deploy

1. https://render.com pe jaao → New → Web Service
2. GitHub se `backend/` folder connect karein
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node

3. Environment Variables add karein:
   ```
   NODE_ENV        = production
   MONGO_URI       = (Atlas connection string)
   JWT_SECRET      = (koi bhi lamba random string, e.g. risenova_super_secret_2024)
   ADMIN_EMAIL     = aapka@email.com
   ADMIN_PASSWORD  = aapka_password
   FRONTEND_URL    = https://aapka-vercel-url.vercel.app
   ```

4. Deploy karein — URL milega jaise: `https://risenova-backend.onrender.com`

---

## STEP 3 — Frontend → Vercel Deploy

1. https://vercel.com pe jaao → New Project
2. GitHub se `frontend/` folder connect karein
   - **Root Directory:** `frontend`
   - **Framework:** Vite

3. Environment Variable add karein:
   ```
   VITE_API_URL = https://risenova-backend.onrender.com
   ```
   *(Render ka URL jo step 2 mein mila)*

4. Deploy karein!

---

## STEP 4 — Admin Panel

Deploy hone ke baad:
- **Admin URL:** `https://aapka-vercel-url.vercel.app/admin/login`
- **Email:** `.env` mein jo ADMIN_EMAIL set kiya
- **Password:** `.env` mein jo ADMIN_PASSWORD set kiya

Admin panel se:
- ✅ Profile edit karein (naam, phone, WhatsApp, social links)
- ✅ Achievements add/edit karein
- ✅ Testimonials add karein
- ✅ Leads/contacts dekhein

---

## ⚠️ Important Notes

- **Render Free Plan:** Pehli request slow ho sakti hai (cold start ~30 sec) — paid plan pe yeh nahi hota
- **Photo:** `frontend/public/profile.jpeg` already included hai
- **Story:** Admin panel → Profile Edit se apni story likh sakte hain

---

## Local Development

```bash
# Backend
cd backend
npm install
cp .env.example .env    # fill in values
npm run dev             # runs on :5000

# Frontend (new terminal)
cd frontend
npm install
npm run dev             # runs on :5173
```
