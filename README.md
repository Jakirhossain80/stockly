# 📦 Stockly

![Stockly Banner](./public/stockly-banner.png) <!-- Replace with your banner/logo -->

A **modern e-commerce application** built with **Next.js (App Router)**.  
Stockly allows users to **browse products, view details, and manage inventory** with **authentication & protected routes**.  
It features a clean UI with **dark/light mode** and is fully responsive.

---

## ✨ Features

- 🔑 **Authentication with NextAuth.js**
  - Google OAuth
  - Credentials (email/password)
- 🔒 **Protected Routes** (`/dashboard/*` for authenticated users only)
- 🛍 **Product Listing** with responsive grid
- 📄 **Product Details Page** (dynamic route `/products/[id]`)
- 🖼 **Hero Section** with CTA
- 🌟 **Product Highlights Section**
- 🧩 **Modern Footer** with navigation & socials
- 🌙 **Dark / Light Mode** (next-themes + Tailwind)
- 📱 **Responsive Design** (mobile → desktop)
- ⚡ **Next.js App Router** with server-side data fetching
- 💾 **MongoDB Atlas Integration** for storing products & users

---

## 🛠 Tech Stack

- **Frontend:** [Next.js 15 (App Router)](https://nextjs.org/), React 18
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), Dark/Light mode
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Backend:** Next.js API Routes (Node.js + Express-style handlers)
- **State/Utils:** next-themes, react-icons, AOS (animations)

---

## 📂 Folder Structure

```bash
stockly/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.js   # NextAuth handlers
│   │   │   └── register/route.js        # User registration API
│   │   └── products/route.js            # Product CRUD APIs
│   ├── dashboard/
│   │   └── add-product/page.jsx         # Protected route
│   ├── login/page.jsx                   # Login page
│   ├── signup/page.jsx                  # Signup page
│   ├── products/
│   │   ├── page.jsx                     # Product listing
│   │   └── [id]/page.jsx                # Product details
│   ├── layout.js                        # Root layout
│   └── page.js                          # Landing page
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── ProductHighlights.jsx
│   └── Products.jsx
├── lib/
│   ├── mongodb.js                       # MongoDB connection
│   ├── password.js                      # Password hashing utils
│   └── auth-options.js                  # NextAuth config options
├── public/                              # Static assets
└── README.md
