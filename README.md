# Transactions

## Introduction

This is a full stack project which includes a backend that serves product transactions data and a frontend to visualize the data and its analysis in different form

## Features

-   List of transactions for selected month
-   Modify the transaction list with search and filter
-   Naviagte across different page to see hidden set of transactions
-   Statistics about total sales and their count for selected month
-   Distribution of transaction across different price range for selected month
-   Distribution of transaction across different categories for selected month

## design decisions or assumptions

-   Frontend part of the project is designed and implemented for dynamic data
-   Backend part of the project is designed and implemented get request only

## Frontend

### Frontend Installation

```bash
git clone https://github.com/rajeshuser/transactions.git
cd frontend
npm install
npm start
```

Alternatively, you can visit <a href="https://transactions-analysis.netlify.app">here</a> for frontend

### Frontend Technology Stack

-   HTML
-   CSS
-   JS
-   React
-   Axios
-   Chart.js

## Backend

### Installation Backend

```bash
git clone https://github.com/rajeshuser/transactions.git
cd backend
npm install
npm run server
```

Alternatively, you can visit <a href="https://easy-raincoat-wasp.cyclic.app">here</a> for backend

### API Endpoints

-   GET /transactions - retrieve all transactions for selected month
-   GET /transactions?page=1&month=January&search=Samsung - retrieve all transactions according to different queries
-   GET /transactions/stats?month=January - retrieve sales statistics for selected month
-   GET /transactions/salesDistribution?month=January - retrieve price distribution across different price range for selected month
-   GET /transactions/categoriesDistribution?month=January - retrieve category distribution across different price range for selected month
-   GET /transactions/analysis?month=January - retrieve stats, price distribution, and category distribution for selected month, all in one request

### Technology Stack

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
