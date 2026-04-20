import { memo, useCallback } from 'react'
import { Button } from '@/shared/ui/Button'
import { useAddToCart } from '@/features/cart/model/hooks/useAddToCart'
import { useAppSelector } from '@/shared/store/utils'
import { selectIsProductInCart } from '@/shared/store/slices/cart'
import { CartCounter } from '@/features/cart/ui/CartCounter/CartCounter'

interface AddToCartButtonProps {
	product: Product
}

export const AddToCartButton = memo(({ product }: AddToCartButtonProps) => {
	const isProductInCart = useAppSelector(selectIsProductInCart(product.id))
	const { addProductToCart } = useAddToCart()

	const handleClick = useCallback(() => {
		addProductToCart({ ...product, count: 1 })
	}, [addProductToCart, product])

	if (isProductInCart) {
		return <CartCounter productId={product.id} />
	}

	return (
		<Button variant='primary' onClick={handleClick}>
			В корзину
		</Button>
	)
})

AddToCartButton.displayName = 'AddToCartButton'
