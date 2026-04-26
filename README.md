<![CDATA[<div align="center">

# ⚡ Voltique

### Digital Artifacts Engineered

A premium e-commerce platform for curated electronics, built with React, TypeScript, and a modern design system.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)

---

## Overview

**Voltique** is a fully responsive, single-page e-commerce application themed around premium electronics. It features a polished UI with glassmorphism effects, scroll-reveal animations, and a curated design system. The platform supports user authentication via Firebase, shopping cart & wishlist management through Redux Toolkit, and persistent state via local storage middleware.

---

## Features

### 🛍️ Shopping Experience

- **Product Catalog** — Browse a curated gallery of electronics with filtering by category, brand, price range, material tone, and stock status.
- **Sorting** — Sort products by popularity, price (low/high), newest, or rating.
- **Pagination** — Paginated product grid for smooth browsing.
- **Product Detail Pages** — Rich product pages with image gallery, specs, color variants, tabbed descriptions, and related products.

### 🛒 Cart & Checkout

- **Shopping Cart** — Add/remove items, adjust quantities, and view real-time order totals.
- **Order Add-ons** — Optional add-ons (extended warranty, express shipping, gift wrapping) during checkout.
- **Shipping Form** — Full shipping address form with saved-address selection.
- **Payment Methods** — Payment method selection (Credit Card, PayPal, Apple Pay).
- **Order Summary** — Detailed order review before placing an order.

### ❤️ Wishlist

- **Save Favorites** — Add products to your wishlist with a single click.
- **Persistent Storage** — Wishlist state survives page refreshes via local storage.

### 👤 Authentication & Account

- **Firebase Auth** — Sign in with Google or Email/Password.
- **User Registration** — Create an account with name, email, and password.
- **Profile Dashboard** — View profile info, recent activity, and recently viewed products.
- **Saved Addresses** — Manage multiple shipping addresses with a default address option, persisted to local storage.

### 🎨 Design & UX

- **Custom Design System** — Tailwind CSS v4 with a bespoke `@theme` token layer (colors, typography, radii, shadows, animations).
- **Glassmorphism Utilities** — `glass`, `glass-dark`, and `ghost-border` custom utilities for frosted-glass effects.
- **Scroll-Reveal Animations** — Fade-up, fade-in, scale-in, and slide-right animations triggered by Intersection Observer.
- **Toast Notifications** — Non-blocking success/error/info toasts with auto-dismiss.
- **Lazy Loading** — All pages are code-split and lazy-loaded for fast initial load.
- **Responsive Layout** — Fully responsive across mobile, tablet, and desktop viewports.

### 📄 Informational Pages

- **About Page** — Company story with hero section, stats, timeline, team, values, and engineering philosophy.
- **Contact Page** — Contact form, contact info cards, and FAQ accordion.

---

## Tech Stack

| Layer             | Technology                                                      |
| ----------------- | --------------------------------------------------------------- |
| **Framework**     | [React 19](https://react.dev/) with [TypeScript 6](https://www.typescriptlang.org/) |
| **Build Tool**    | [Vite 8](https://vitejs.dev/)                                   |
| **Styling**       | [Tailwind CSS 4](https://tailwindcss.com/) via `@tailwindcss/vite` plugin |
| **State**         | [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) |
| **Routing**       | [React Router DOM 7](https://reactrouter.com/)                  |
| **Auth**          | [Firebase Authentication](https://firebase.google.com/products/auth) (Google + Email/Password) |
| **Icons**         | [Lucide React](https://lucide.dev/)                             |
| **Persistence**   | Custom Redux middleware → `localStorage`                        |
| **Linting**       | ESLint 9 + typescript-eslint + react-hooks + react-refresh      |

---

## Project Structure

```
voltique-app/
├── public/
│   ├── favicon.svg
│   └── icons.svg                 # SVG sprite sheet
├── src/
│   ├── components/
│   │   ├── about/                # AboutHero, Timeline, Team, Values, Stats, EngineeringSoul
│   │   ├── account/              # ProfileSidebar, WelcomeBanner, RecentActivity, RecentlyViewed
│   │   ├── auth/                 # AuthForm (login / register)
│   │   ├── cart/                 # CartItem, CartSummary, OrderAddons
│   │   ├── checkout/             # ShippingForm, PaymentMethod, OrderSummary
│   │   ├── contact/              # ContactForm, ContactInfo, FAQ
│   │   ├── home/                 # Hero, TrendingNow, CuratedCollections, PromoBanner, Newsletter, TrustBadges
│   │   ├── layout/               # Navbar, Footer
│   │   ├── product/              # ProductGallery, ProductInfo, ProductTabs, RelatedProducts
│   │   ├── shop/                 # ShopHero, FilterSidebar, ProductCard, ProductGrid, Pagination
│   │   └── ui/                   # ScrollReveal (Intersection Observer wrapper)
│   ├── data/
│   │   └── products.ts           # Static product catalog
│   ├── images/                   # Product hero images
│   ├── lib/
│   │   ├── firebase.ts           # Firebase app initialization
│   │   └── auth.ts               # Auth helpers (Google, Email, sign-out, state listener)
│   ├── pages/                    # Route-level page components (lazy-loaded)
│   ├── store/
│   │   ├── slices/
│   │   │   ├── cartSlice.ts      # Cart state (add, remove, update qty, clear)
│   │   │   ├── productsSlice.ts  # Products state (catalog, filters, sorting)
│   │   │   ├── userSlice.ts      # User profile, addresses, orders
│   │   │   ├── wishlistSlice.ts  # Wishlist toggle
│   │   │   └── uiSlice.ts        # Toast notifications
│   │   ├── hooks.ts              # Typed useAppSelector / useAppDispatch
│   │   ├── localStorage.ts       # Persistence middleware
│   │   └── store.ts              # Redux store configuration
│   ├── types/
│   │   └── index.ts              # Shared TypeScript interfaces
│   ├── App.tsx                   # Root component (routing, auth listener, layout)
│   ├── main.tsx                  # Entry point (Redux Provider + App)
│   └── index.css                 # Design system tokens, animations & custom utilities
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── eslint.config.js
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (or your preferred package manager)
- A **Firebase project** with Authentication enabled (Google + Email/Password sign-in providers).

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/voltique-app.git
cd voltique-app

# 2. Install dependencies
npm install

# 3. Configure environment variables (see below)
cp .env.example .env

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## Environment Variables

Create a `.env` file in the project root with the following Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> All variables are prefixed with `VITE_` so they are exposed to the client bundle by Vite.

---

## Available Scripts

| Script            | Command              | Description                                |
| ----------------- | -------------------- | ------------------------------------------ |
| **Dev Server**    | `npm run dev`        | Start Vite dev server with HMR             |
| **Build**         | `npm run build`      | Type-check with `tsc` then build for production |
| **Preview**       | `npm run preview`    | Preview the production build locally       |
| **Lint**          | `npm run lint`       | Run ESLint across the project              |

---

## Architecture

### State Management

The app uses **Redux Toolkit** with five slices:

- **`productsSlice`** — Manages the product catalog, active filters, and sort order.
- **`cartSlice`** — Handles cart items (add, remove, update quantity, clear).
- **`userSlice`** — Stores the authenticated user profile, saved addresses, and order history.
- **`wishlistSlice`** — Tracks product IDs saved to the wishlist.
- **`uiSlice`** — Manages transient toast notifications.

A custom **localStorage middleware** automatically persists cart, wishlist, and address data across sessions.

### Authentication Flow

1. User clicks **Sign In** → routed to `/login`.
2. `AuthForm` component handles login or registration via Firebase (Google popup or email/password).
3. On success, the Firebase `onAuthStateChanged` listener in `AuthListener` dispatches `setUser()` to Redux.
4. Protected UI elements (account page, addresses, etc.) conditionally render based on user state.

### Routing

All routes are **lazy-loaded** using `React.lazy()` + `Suspense` for optimal code splitting:

| Route           | Page               |
| --------------- | ------------------ |
| `/`             | Home               |
| `/shop`         | Shop (catalog)     |
| `/product/:id`  | Product Detail     |
| `/about`        | About              |
| `/contact`      | Contact            |
| `/cart`         | Shopping Cart      |
| `/checkout`     | Checkout           |
| `/login`        | Login / Register   |
| `/account`      | User Dashboard     |
| `/wishlist`     | Wishlist           |
| `/addresses`    | Saved Addresses    |

---

<div align="center">

**Built with ♠ by the Voltique team**

</div>
]]>
