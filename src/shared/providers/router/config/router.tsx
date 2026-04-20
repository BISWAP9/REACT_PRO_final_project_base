import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Loader } from '@/shared/ui/Loader'
import { App } from '@/app'

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })))
const ProductPage = lazy(() =>
	import('@/pages/ProductPage').then((m) => ({
		default: m.ProductPage,
	}))
)
const NotFoundPage = lazy(() =>
	import('@/pages/NotFoundPage').then((m) => ({
		default: m.NotFoundPage,
	}))
)
const ProfilePage = lazy(() =>
	import('@/pages/ProfilePage').then((m) => ({
		default: m.ProfilePage,
	}))
)
const FavoritesPage = lazy(() =>
	import('@/pages/FavoritesPage').then((m) => ({
		default: m.FavoritesPage,
	}))
)
const SignUpPage = lazy(() =>
	import('@/pages/SignUpPage').then((m) => ({
		default: m.SignUpPage,
	}))
)
const SignInPage = lazy(() =>
	import('@/pages/SignInPage').then((m) => ({
		default: m.SignInPage,
	}))
)
const CartPage = lazy(() => import('@/pages/CartPage').then((m) => ({ default: m.CartPage })))

const withSuspense = (node: React.ReactNode) => <Suspense fallback={<Loader />}>{node}</Suspense>

export enum AppRoutes {
	HOME = 'home',
	FAVORITES = 'favorites',
	PRODUCTS = 'products',
	PROFILE = 'profile',
	CART = 'cart',
	SIGNUP = 'signup',
	SIGNIN = 'signin',
	NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, `/${string}` | '*'> = {
	[AppRoutes.HOME]: '/',
	[AppRoutes.FAVORITES]: '/favorites',
	[AppRoutes.PRODUCTS]: '/products/:productId',
	[AppRoutes.PROFILE]: '/profile',
	[AppRoutes.CART]: '/cart',
	[AppRoutes.SIGNUP]: '/signup',
	[AppRoutes.SIGNIN]: '/signin',
	[AppRoutes.NOT_FOUND]: '*',
}

export const router = createBrowserRouter([
	{
		path: RoutePath.home,
		element: <App />,
		children: [
			{ index: true, element: withSuspense(<HomePage />) },
			{ path: RoutePath.favorites, element: withSuspense(<FavoritesPage />) },
			{ path: RoutePath.products, element: withSuspense(<ProductPage />) },
			{ path: RoutePath.profile, element: withSuspense(<ProfilePage />) },
			{ path: RoutePath.cart, element: withSuspense(<CartPage />) },
			{ path: RoutePath.signup, element: withSuspense(<SignUpPage />) },
			{ path: RoutePath.signin, element: withSuspense(<SignInPage />) },
			{ path: RoutePath.not_found, element: withSuspense(<NotFoundPage />) },
		],
	},
])
