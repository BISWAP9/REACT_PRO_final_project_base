import { memo } from 'react'
import classNames from 'classnames'
import { CartItem } from '@/pages/CartPage/ui/CartItem'
import { useAppSelector } from '@/shared/store/utils'
import { cartSelectors } from '@/shared/store/slices/cart'
import s from '@/pages/CartPage/ui/CartPage.module.css'

export const CartList = memo(() => {
	const products = useAppSelector(cartSelectors.getCartProducts)

	return (
		<div className={classNames(s['cart-list'])}>
			{products.map((p) => (
				<CartItem productId={p.id} key={p.id} />
			))}
		</div>
	)
})

CartList.displayName = 'CartList'
