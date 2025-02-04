import { CartLayout, HomeLayout } from "@/layouts";
import AdminLayout from "@/layouts/admin/AdminLayout";
import BrandList from "@/pages/admin/brands/BrandList";
import CategoryList from "@/pages/admin/categories/CategoryList";
import AddProduct from "@/pages/admin/products/AddProduct";
import ProductList from "@/pages/admin/products/ProductList";
import { CartPage } from "@/pages/cart";
import { HomePage } from "@/pages/home";
import { Login } from "@/pages/login";
import NotFoundPage from "@/pages/NotFoundPage";
import { PaymentConfirmPage } from "@/pages/payment_confirm";
import { PaymentInfoPage } from "@/pages/payment_info";
import { ProductDetailPage } from "@/pages/products";
import { RouteObject, useRoutes } from "react-router-dom";

const MyRoutes = () => {

    const user = true;

    // Define public routes accessible to all users
    const routesForPublic: RouteObject[] = [
        {
            path: "/",
            element: <HomeLayout />,
            children: [
                {
                    path: '',
                    element: <HomePage />,
                },
            ],
        },
        {
            path: "/:category/:productSlug",
            element: <ProductDetailPage />,
        },
        {
            path: "/cart",
            element: <CartLayout />,
            children: [
                {
                    path: '',
                    element: <CartPage />,
                },
                {
                    path: 'payment-info',
                    element: <PaymentInfoPage />,
                },
                {
                    path: 'payment',
                    element: <PaymentConfirmPage />,
                },
            ],
        },
    ];

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly: RouteObject[] = [
        {
            path: "/",
            element: null,
            children: [
                {
                    path: "bien",
                    element: <div>User Home Page</div>,
                },
                {
                    path: "profile",
                    element: <div>User Profile</div>,
                },
                {
                    path: "logout",
                    element: <div>Logout</div>,
                },
            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly: RouteObject[] = [
        {
            path: "/",
            element: null,
            children: [
                {
                    path: "signin",
                    element: <Login />,
                },
                {
                    path: "register",
                    element: <Login />,
                },
            ],
        },
    ];

    const routesForAdmin: RouteObject[] = [
        {
            path: "/admin",
            element: <AdminLayout />,
            children: [
                {
                    path: 'products',
                    children: [
                        {
                            path: '',
                            element: <ProductList />,
                        },
                        {
                            path: 'add',
                            element: <AddProduct />,
                        },
                    ]
                },
                {
                    path: 'brands',
                    children: [
                        {
                            path: '',
                            element: <BrandList />,
                        },
                        {
                            path: 'add',
                            element: <AddProduct />,
                        },
                    ]
                },
                {
                    path: 'categories',
                    children: [
                        {
                            path: '',
                            element: <CategoryList />,
                        },
                    ]
                }
            ]
        }
    ]
    const routesForNotFound: RouteObject[] = [
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ]


    // Tạo danh sách route dựa trên trạng thái đăng nhập
    const routing = useRoutes([
        ...routesForPublic,
        ...(!user ? [] : routesForAuthenticatedOnly),
        ...routesForNotAuthenticatedOnly,
        ...routesForNotFound,
        ...routesForAdmin,
    ]);

    return routing; // Trả về routes đã xử lý
};

export default MyRoutes;
