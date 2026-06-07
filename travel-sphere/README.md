# TravelSphere — Premium Travel Booking & Trip Planning Platform

## 🚀 Deploy to Vercel (Fix 404)

There are **two ways** to deploy. Pick the one that matches how you pushed to GitHub.

---

### ✅ Method 1 — Recommended (Set Root Directory)

If you pushed the entire `Travel buddy` folder (or just `travel-sphere`) to GitHub:

1. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
2. In **Configure Project** settings:
   - **Root Directory** → click **Edit** → type `travel-sphere`
   - **Framework Preset** → `Other`
   - **Build Command** → leave empty
   - **Output Directory** → leave empty
3. Click **Deploy** ✅

---

### ✅ Method 2 — Push only the travel-sphere folder

Push **only the contents of `travel-sphere/`** as the root of a new GitHub repo:

```
my-github-repo/
├── index.html
├── destinations.html
├── packages.html
├── hotels.html
├── hotel-details.html
├── destination-details.html
├── trip-planner.html
├── bookings.html
├── reviews.html
├── contact.html
├── css/
├── js/
├── assets/
└── vercel.json
```

Then deploy on Vercel with:
- **Root Directory** → `/` (default)
- **Framework Preset** → `Other`
- Click **Deploy** ✅

---

## 💻 Run Locally

Just open `index.html` directly in any browser — no server needed.

Or use VS Code Live Server:
1. Install **Live Server** extension
2. Right-click `index.html` → **Open with Live Server**

---

## 📁 Project Structure

```
travel-sphere/
├── index.html                  # Home page
├── destinations.html           # Destination discovery
├── destination-details.html    # Single destination
├── packages.html               # Travel packages
├── hotels.html                 # Hotel listings
├── hotel-details.html          # Single hotel
├── trip-planner.html           # Trip planner + budget calculator
├── bookings.html               # Booking form + dashboard
├── reviews.html                # Review system (CRUD)
├── contact.html                # Contact form + FAQ
├── css/
│   ├── style.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── app.js                  # Core utilities
│   └── storage.js              # LocalStorage + 20/20/20/50 seed data
├── vercel.json
└── README.md
```

## ✨ Features
- 20 destinations, 20 hotels, 20 packages, 50 reviews
- All prices in ₹ INR
- Olive green & white theme
- Dark / Light mode
- Real-time search & filters
- Trip planner with budget calculator
- Full booking system with confirmation
- CRUD reviews with star ratings
- Lightbox image gallery
- Fully responsive (mobile / tablet / desktop)
- localStorage persistence
