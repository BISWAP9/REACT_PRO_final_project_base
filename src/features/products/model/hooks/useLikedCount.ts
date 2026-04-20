import { useMemo } from 'react'
import { useAppSelector } from '@/shared/store/utils'
import { userSelectors } from '@/shared/store/slices/user'
import { isLiked } from '@/shared/utils'
import { useProducts } from './useProducts'

export const useLikedCount = () => {
	const { products } = useProducts()
	const user = useAppSelector(userSelectors.getUser)

	return useMemo(
		() => products.reduce((acc, product) => (isLiked(product.likes, user?.id) ? acc + 1 : acc), 0),
		[products, user?.id]
	)
}
