# Finance Dashboard UI

A clean and interactive finance dashboard built with React, TypeScript, Tailwind CSS, and Zustand for state management.

## Features

- **Dashboard Overview**: Summary cards for total balance, income, and expenses. Time-based balance trend chart and categorical spending breakdown pie chart.
- **Transactions Section**: List of transactions with filtering by category, type, and search. Sorting by date, amount, or category.
- **Role-Based UI**: Switch between Viewer (read-only) and Admin (can add/delete transactions) roles.
- **Insights Section**: Key insights like highest spending category, monthly expense comparison, average transaction, and total transactions.
- **State Management**: Uses Zustand with persistence to local storage.
- **Responsive Design**: Works on different screen sizes using Tailwind CSS.

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Recharts for charts
- Zustand for state management
- Vite for build tool

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the project files.
2. Navigate to the project directory:
   ```
   cd dashboard-ui
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Running the Application

Start the development server:
```
npm run dev
```

Open your browser and go to `http://localhost:5173` to view the application.

### Building for Production

Build the project:
```
npm run build
```

Preview the production build:
```
npm run preview
```

## Usage

- Use the role selector in the header to switch between Viewer and Admin modes.
- Navigate between Dashboard, Transactions, and Insights tabs.
- In Admin mode, use the "Add Transaction" button to add new transactions.
- Filter and sort transactions in the Transactions tab.
- View insights and charts in their respective sections.

## Project Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── Dashboard.tsx
│   ├── Transactions.tsx
│   ├── Insights.tsx
│   └── AddTransactionModal.tsx
├── store.ts
├── types.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Approach

This project demonstrates a professional frontend development approach:

- **Component-Based Architecture**: Modular components for reusability and maintainability.
- **Type Safety**: Full TypeScript implementation for better code quality.
- **State Management**: Centralized state with Zustand, including persistence.
- **Responsive Design**: Mobile-first design with Tailwind CSS.
- **Data Visualization**: Interactive charts using Recharts.
- **User Experience**: Intuitive navigation, role-based access, and smooth interactions.
- **Performance**: Efficient rendering with React hooks and memoization.

The dashboard handles edge cases like empty data states and provides a clean, readable interface. All requirements from the assignment have been implemented, including optional features like local storage persistence.