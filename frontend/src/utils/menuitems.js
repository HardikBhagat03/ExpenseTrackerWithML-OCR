import { dashboard, expenses, transactions, trend, stocks, users, ocr } from '../utils/icons';

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Predictions",
        icon: stocks,
        link: "/dashboard",
    },
    {
        id: 6,
        title: "Split",
        icon: users,
        link: "/dashboard",
    },
    {
        id: 7,
        title: "OCR Scan",
        icon: ocr,
        link: "/dashboard",
    }
];
