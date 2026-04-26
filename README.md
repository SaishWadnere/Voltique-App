# ⚡ Voltique — Digital Artifacts Engineered

A premium e-commerce frontend for curated electronics, built with **React 19**, **TypeScript**, **Tailwind CSS 4**, and **Firebase Auth**.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=black)

---

## Features

- **Product Catalog** — Filterable grid with sorting by price, rating, popularity; category/brand/stock filters and pagination.
- **Product Detail** — Image gallery, spec tabs, color variants, and related products.
- **Shopping Cart** — Add/remove items, adjust quantities, optional add-ons (warranty, express shipping, gift wrap).
- **Checkout Flow** — Shipping form with saved-address selection, payment method picker, and order summary.
- **Wishlist** — Save favorites with one click; persisted via localStorage.
- **Authentication** — Firebase Google sign-in and email/password login/register.
- **Account Dashboard** — Profile info, recent activity, recently viewed products, and saved addresses management.
- **Informational Pages** — About page (team, timeline, values) and Contact page (form, FAQ accordion).
- **Polished UI** — Glassmorphism effects, scroll-reveal animations, toast notifications, lazy-loaded routes, and fully responsive design.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 (custom design tokens) |
| State | Redux Toolkit + React Redux |
| Routing | React Router DOM 7 (lazy-loaded) |
| Auth | Firebase Authentication |
| Icons | Lucide React |
| Persistence | Custom Redux middleware → localStorage |

---

## Project Structure

```
src/
├── components/
│   ├── about/          # Hero, Timeline, Team, Values, Stats
│   ├── account/        # ProfileSidebar, WelcomeBanner, RecentActivity
│   ├── auth/           # AuthForm (login / register)
│   ├── cart/           # CartItem, CartSummary, OrderAddons
│   ├── checkout/       # ShippingForm, PaymentMethod, OrderSummary
│   ├── contact/        # ContactForm, ContactInfo, FAQ
│   ├── home/           # Hero, TrendingNow, Collections, Promo, Newsletter
│   ├── layout/         # Navbar, Footer
│   ├── product/        # Gallery, ProductInfo, Tabs, RelatedProducts
│   ├── shop/           # FilterSidebar, ProductCard, ProductGrid, Pagination
│   └── ui/             # ScrollReveal (Intersection Observer)
├── data/               # Static product catalog
├── lib/                # Firebase init + auth helpers
├── pages/              # Route-level page components
├── store/              # Redux store, slices, hooks, localStorage middleware
├── types/              # Shared TypeScript interfaces
├── App.tsx             # Routing, auth listener, layout
└── index.css           # Design system tokens & custom utilities
```

---

## Getting Started

**Prerequisites:** Node.js >= 18, npm >= 9, and a Firebase project with Auth enabled.

```bash
# Clone & install
git clone https://github.com/SaishWadnere/Voltique-web-React-Firebase-.git
cd Voltique-web-React-Firebase-

npm install

# Configure Firebase — create a .env file:
# VITE_FIREBASE_API_KEY=your_key
# VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
# VITE_FIREBASE_PROJECT_ID=your_project_id
# VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
# VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
# VITE_FIREBASE_APP_ID=your_app_id

# Start dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Architecture Highlights

- **5 Redux slices** — `products`, `cart`, `user`, `wishlist`, `ui` (toasts)
- **localStorage middleware** persists cart, wishlist, and addresses across sessions
- **Firebase `onAuthStateChanged`** listener syncs auth state to Redux automatically
- **All routes lazy-loaded** with `React.lazy()` + `Suspense` for fast initial load
- **Custom Tailwind `@theme`** with curated color palette, typography scale, and animation tokens
