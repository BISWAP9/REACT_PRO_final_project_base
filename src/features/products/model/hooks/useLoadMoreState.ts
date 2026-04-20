import { useLocation } from 'react-router-dom'
import { useAppSelector } from '@/shared/store/utils'
import { productsSelectors } from '@/shared/store/slices/products'
import { useGetProductsQuery } from '@/shared/store/api/productsApi'

export const useLoadMoreState = () => {
	const { pathname } = useLocation()
	const searchText = useAppSelector(productsSelectors.getSearchText)
	const sort = useAppSelector(productsSelectors.getSort)
	const page = useAppSelector(productsSelectors.getPage)
	const perPage = useAppSelector(productsSelectors.getPerPage)

	const isFavoritesPage = pathname === '/favorites'

	const { isFetching, hasProducts, isEndOfList } = useGetProductsQuery(
		{
			searchText,
			sort,
			page,
			perPage: isFavoritesPage ? undefined : perPage,
		},
		{
			selectFromResult: ({ data, isFetching }) => ({
				isFetching,
				hasProducts: (data?.products.length ?? 0) > 0,
				isEndOfList: (data?.products.length ?? 0) >= (data?.length ?? 0),
			}),
		}
	)

	return { isFetching, hasProducts, isEndOfList, page }
}
