# 👟 Nike Store - Next.js Auth & E-commerce Flow

[![Vercel Deployment](https://img.shields.io/badge/deployed%20on-Vercel-black?logo=vercel)](https://mini-ecommerce-app-five.vercel.app)

A high-performance, responsive e-commerce application built with **Next.js 16**, featuring a custom authentication flow, dynamic product management, and a secure checkout process.

---

## 🚀 Features

- **Custom OTP Authentication**: A multi-step login journey (Phone → OTP → Name Registration).
- **Responsive Product Grid**: Optimized layouts for mobile, tablet, and desktop using Tailwind CSS.
- **Zustand State Management**: Centralized stores for managing authentication, product selections, and order history without unnecessary re-renders.
- **Secure Middleware**: Global route protection ensuring only authenticated users can access the store and success pages.
- **Premium UI/UX**: Dark-themed Nike-inspired design with inline error handling (no browser alerts) and smooth transitions.
- **Performance Optimized**: Utilizes Next.js `Image` component with custom `sizes` for optimal LCP and performance.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Cookies**: `cookies-next`
- **Icons & Assets**: Lucide React & Optimized WebP images
- **API Handling**: Custom Fetch Wrapper with standardized error handling

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── login/            # OTP Login & Registration screens
│   ├── product-list/     # Main product grid listing
│   └── success/          # Order confirmation & history page
├── components/           # Reusable UI components (ProductCard, Login forms)
├── lib/                  # API clients and utility functions
├── store/                # Zustand stores (useAuthStore, useProductStore)
├── types/                # TypeScript interfaces and shared types
└── proxy.ts              # Global route protection logic
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone [https://github.com/your-username/nike-store-app.git](https://github.com/your-username/nike-store-app.git)
cd nike-store-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Environment Variables

Create a `.env.local` file in the root directory and add your backend URL:

```env
NEXT_PUBLIC_API_URL=your_api_endpoint_here
```

### 4. Run the development server

```bash
npm run dev
```

## 🔒 Authentication & Middleware

The application is secured using a `middleware.ts` file that intercepts requests to manage sessions:

- **Public Routes**: `/login` is accessible to everyone. If an authenticated user attempts to access `/login`, they are automatically redirected to `/product-list`.
- **Protected Routes**: All other routes (Product List, Success, etc.) require a valid `auth_token` cookie. Unauthorized users are redirected to the login page.

## 📦 API Integration

The following endpoints are integrated into the **Zustand** stores for seamless state management:

| Method   | Endpoint             | Description                                                 |
| :------- | :------------------- | :---------------------------------------------------------- |
| **POST** | `/request-otp/`      | Sends a 4-digit code to the user's phone number.            |
| **POST** | `/verify/`           | Validates the OTP and sets the `auth_token` session cookie. |
| **POST** | `/login-register/`   | Handles user profile creation/name registration.            |
| **POST** | `/purchase-product/` | Processes orders for specific products or variants.         |
| **GET**  | `/user-orders/`      | Retrieves the authenticated user's full order history.      |
