import { createBrowserRouter } from 'react-router-dom'
import App from '../App';
import Home from '../pages/home/Home';
import ShopPage from '../pages/shop/ShopPage';
import CategoryPage from '../pages/category/CategoryPage';
import ErrorPage from '../components/ErrorPage';
import Loginpage from '../components/Loginpage';
import Register from '../components/Register';
import SingleProduct from '../pages/shop/productDetails/SingleProduct';
import PaymentsSuccess from '../components/PaymentsSuccess';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import PrivateRoute from './PrivateRoute';
import UserDMain from '../pages/dashboard/user/dashboard/UserDMain';
import UserOrders from '../pages/dashboard/user/dashboard/orders/UserOrders';
import OrderDetails from '../pages/dashboard/user/dashboard/orders/OrderDetails';
import UserPayments from '../pages/dashboard/user/payments/UserPayments';
import UserReviews from '../pages/dashboard/user/reviews/UserReviews';
import UserProfile from '../pages/dashboard/user/profile/UserProfile';
import AdminDMain from '../pages/dashboard/admin/dashboard/AdminDMain';
import ManageUsers from '../pages/dashboard/admin/users/ManageUsers';
import ManageOrders from '../pages/dashboard/admin/orders/ManageOrders';
import AddProduct from '../pages/dashboard/admin/addproduct/AddProduct';
import ManageProducts from '../pages/dashboard/admin/manageproducts/ManageProducts';
import UpdateProduct from '../pages/dashboard/admin/manageproducts/UpdateProduct';
import Search from '../components/Search';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children:[
            {
                path: '/',
                element:<Home/>
            },
            {
                path: '/shop',
                element: <ShopPage/>
            },
            {
                path: '/shop/:id',
                element: <SingleProduct/>
            },
            {
                path: '/categories/:categoryName',
                element: <CategoryPage/>
            },
            {
                path: '/success',
                element: <PaymentsSuccess/>
            },
            {
                path: '/orders/:orderId',
                element: <OrderDetails/>
            },
            {
                path: "/search",
                element: <Search/>
            }
        ]
    },
    {
        path: '/login',
        element: <Loginpage/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
        children: [
            // user routes
            {
                path: '',
                element: <UserDMain/>
            },
            {
                path: 'orders',
                element: <UserOrders/>
            },
            {
                path: 'payments',
                element: <UserPayments/>
            },
            {
                path: 'profile',
                element: <UserProfile/>
            },
            {
                path: 'reviews',
                element: <UserReviews/>
            },

            // admin routes
            {
                path: 'admin',
                element: <PrivateRoute role="admin"><AdminDMain/></PrivateRoute>
            },
            {
                path: 'add-product',
                element: <PrivateRoute role="admin"><AddProduct/></PrivateRoute>
            },
            {
                path: 'manage-products',
                element: <PrivateRoute role="admin"><ManageProducts/></PrivateRoute>
            },
            {
                path: 'update-product/:id',
                element: <PrivateRoute role="admin"><UpdateProduct/></PrivateRoute>
            },
            {
                path: 'manage-orders',
                element: <PrivateRoute role="admin"><ManageOrders/></PrivateRoute>
            },
            {
                path: 'users',
                element: <PrivateRoute role="admin"><ManageUsers/></PrivateRoute>
            }
        ]
    }
]);

export default router;