# Real-Time Bitcoin Dashboard

A sleek, high-performance dashboard application built with React, Vite, and Tailwind CSS. It connects to the ByBit WebSocket API to provide real-time BTC/USDT market data, presented through interactive charts and beautifully animated statistics.

## ✨ Features

- **Real-Time Data**: Live integration with ByBit's WebSocket API for instantaneous market updates.
- **Interactive Charts**: Responsive data visualization powered by Recharts.
- **Dynamic Animations**: Smooth, engaging number transitions and UI animations built with Framer Motion.
- **Theme Support**: Built-in Dark and Light mode toggle seamlessly integrated with Tailwind CSS.
- **State Management**: Highly efficient, lightweight global state using Zustand.
- **Modern UI/UX**: Responsive, accessible, and polished design perfect for both desktop and mobile viewing.

## 🛠️ Technologies

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd real-time-bitcoin-dashboard
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Then, open your browser and navigate to `http://localhost:5173`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

You can preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```text
src/
├── app/          # App entry and global providers
├── components/   # Reusable UI components (buttons, toggles, etc.)
├── features/     # Feature-specific logic and complex components (Dashboard, StatsCards)
├── hooks/        # Custom React hooks (e.g., WebSocket logic)
├── layouts/      # Application layout components
├── lib/          # Utility functions and configurations
├── styles/       # Global CSS styles
└── main.tsx      # Main application entry point
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
