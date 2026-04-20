import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { userSelectors } from '@/shared/store/slices/user'
import { useAppSelector } from '@/shared/store/utils'
import { isLiked } from '@/shared/utils'
import { productsSelectors } from '@/shared/store/slices/products'
import { useGetProductsQuery } from '@/shared/store/api/productsApi'

export const useProducts = () => {
	const { pathname } = useLocation()

	const searchText = useAppSelector(productsSelectors.getSearchText)
	const sort = useAppSelector(productsSelectors.getSort)
	const page = useAppSelector(productsSelectors.getPage)
	const perPage = useAppSelector(productsSelectors.getPerPage)

	const isFavoritesPage = pathname === '/favorites'
	const { isLoading, isError, error, data, isFetching } = useGetProductsQuery({
		searchText,
		sort,
		page,
		perPage: isFavoritesPage ? undefined : perPage,
	})

	const user = useAppSelector(userSelectors.getUser)

	const products = useMemo(() => {
		const list = data?.products ?? []
		if (isFavoritesPage) {
			return list.filter((product) => isLiked(product.likes, user?.id))
		}
		return list
	}, [data?.products, isFavoritesPage, user?.id])

	const productsCount = data?.length || 0

	return {
		products,
		isLoading,
		isError,
		isFetching,
		error,
		productsCount,
	}
}
