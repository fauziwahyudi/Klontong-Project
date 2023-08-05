
import { createBrowserRouter, redirect } from 'react-router-dom'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import Layout from '../components/Layout'
import ProductList from '../views/ProductList'
import AddProductPage from '../views/AddProductPage'
import EditProductPage from '../views/EditProductPage'
import Categories from '../views/Categories'
import AddCategoryPage from '../views/AddCategoryPage'
import EditCategoryPage from '../views/EditCategoryPage'

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <ProductList />
            },
            {
                path: "/add-product",
                element: <AddProductPage />
            },
            {
                path: "/edit-product/:id",
                element: <EditProductPage />
            },
            {
                path: "/categories",
                element: <Categories />
            },
            {
                path: "/add-category",
                element: <AddCategoryPage />
            },
            {
                path: "/edit-category/:id",
                element: <EditCategoryPage />
            },
        ],
        loader: () => {
            const token = localStorage.getItem("access_token")
            if (!token) {
                throw redirect("/login")
            }
            return null
        }
    },
    {
        path: '/login',
        element: <LoginPage />,
        loader: () => {
            const token = localStorage.getItem("access_token")
            if (token) {
                throw redirect("/")
            }
            return null
        },
    },
    {
        path: '/register',
        element: <RegisterPage />,
    }

])

export default router