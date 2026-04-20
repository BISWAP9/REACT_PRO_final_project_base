import { ChangeEvent, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { cartActions, selectCartProductById } from '@/shared/store/slices/cart'
import { useAppSelector } from '@/shared/store/utils'
import { clampCount } from '../utils/clampCount'

export const useCartItem = (productId: string) => {
	const dispatch = useDispatch()
	const product = useAppSelector(selectCartProductById(productId))

	const count = product?.count ?? 0
	const stock = product?.stock ?? Number.POSITIVE_INFINITY

	const updateCount = useCallback(
		(next: number) => {
			if (!product) return
			dispatch(cartActions.setCartProductCount({ id: product.id, count: clampCount(next) }))
		},
		[dispatch, product]
	)

	const handleIncrement = useCallback(() => updateCount(count + 1), [count, updateCount])
	const handleDecrement = useCallback(() => updateCount(count - 1), [count, updateCount])
	const handleSetCount = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => updateCount(+e.target.value),
		[updateCount]
	)

	return { count, stock, handleSetCount, handleIncrement, handleDecrement }
}
