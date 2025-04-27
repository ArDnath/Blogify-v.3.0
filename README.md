# 📖 Personal Blog Project

## 📚 Description
This is a fullstack blog application I built as a personal platform for writing blogs in the future.  
The frontend is developed with **React** and **Vite**, using **Yarn** as the package manager, while the backend is powered by **Hono.js** running on **Bun**.

## ✨ Features
- 🔒 User authentication and authorization
- ✍️ Create, read, update, and delete blog posts
- 📱 Fully responsive design for mobile and desktop
- 🛠️ ESLint configuration for maintaining code quality

## 🚀 Technologies Used

### 🖥️ Frontend
- **React 19** – Frontend library for building user interfaces
- **Vite** – Next-generation frontend tooling for faster development
- **TypeScript** – Strongly typed JavaScript for better developer experience
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development
- **React Router DOM** – Routing and navigation for React applications
- **React Query (@tanstack/react-query)** – Data fetching and caching for React
- **TipTap Editor (reactjs-tiptap-editor)** – Rich text editor integration
- **Axios** – Promise-based HTTP client for API communication
- **Lucide React** – Open-source icon library for React
- **Infinite Scroll Component** – Infinite scrolling support for loading more content
- **ImageKit.io React SDK** – Image optimization and media handling

### 🔥 Backend
- **Hono.js** – Lightweight web framework for building backend APIs
- **Bun** – Fast JavaScript runtime and package manager used to run the backend

### 🎨 Styling & Animations
- **DaisyUI** – Tailwind CSS component library
- **TW Animate CSS** – Animate.css integration for Tailwind

### 🛠️ Developer Tooling
- **ESLint** – Linting tool for maintaining code quality
- **TypeScript ESLint** – Additional linting rules for TypeScript
- **PostCSS** – Tool for transforming CSS with JavaScript plugins
- **Yarn** – Dependency management and package runner for frontend
- **Bun Install** – Dependency management and runner for backend


## File Structure
```
├── .vscode/
│   └── settings.json
├── Blog/
│   ├── components.json
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── vite-env.d.ts
│   │   ├── components/
│   │   │   ├── DarkMode.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Image.tsx
│   │   │   ├── Logout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── PostList.tsx
│   │   │   ├── PostListItems.tsx
│   │   │   ├── RichEditor/
│   │   │   │   ├── constants.ts
│   │   │   │   ├── extensions.ts
│   │   │   │   ├── index.tsx
│   │   │   │   └── uploadHelpers.ts
│   │   │   ├── ThemeContext.tsx
│   │   └── pages/
│   │       ├── BlogPage.tsx
│   │       ├── CreatePage.tsx
│   │       ├── HomePage.tsx
│   │       ├── LoginPage.tsx
│   │       └── NotFoundPage.tsx
│   │   └── utils/
│   │       ├── AuthContext.tsx
│   │       ├── ProtectRoute.tsx
│   │       └── utils.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   └── .gitignore
├── backend/
│   ├── package.json
│   ├── public/
│   │   └── .gitkeep
│   ├── src/
│   │   ├── app.ts
│   │   ├── constants.ts
│   │   ├── controllers/
│   │   │   ├── Blog.controller.ts
│   │   │   └── User.controller.ts
│   │   ├── db/
│   │   │   └── connect.ts
│   │   ├── index.ts
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts
│   │   │   └── zod.validation.middleware.ts
│   │   ├── models/
│   │   │   ├── Post.model.ts
│   │   │   └── User.model.ts
│   │   ├── routes/
│   │   │   ├── Blog.route.ts
│   │   │   └── user.route.ts
│   │   └── validations/
│   │       └── auth.validation.ts
│   ├── tsconfig.json
│   └── .gitignore
├── README.md

```

## 🖥️ Frontend Setup

### Installation
To install the frontend dependencies, run:
```sh
yarn install
```


### Running the Application
To run the frontend application, use:
```sh
yarn dev
```

### 🛠️ ESLint Configuration
This project provides a minimal ESLint setup to work seamlessly with React, Vite, and Hot Module Replacement (HMR).  
For production applications, it is recommended to extend the configuration to enable type-aware linting rules for better code quality.

## ⚡ Backend Setup

### Installation
To install the backend dependencies, run:
```sh
bun install

```

### Running the Application
To run the backend application, use:
```sh
bun run dev
```

## License
This project is licensed under the MIT License.
