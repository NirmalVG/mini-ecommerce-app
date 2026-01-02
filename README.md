# 👟 Nike Store - Next.js Auth & E-commerce Flow

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
