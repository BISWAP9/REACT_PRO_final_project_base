import classNames from 'classnames'
import { useAppSelector } from '@/shared/store/utils'
import { cartSelectors } from '@/shared/store/slices/cart'
import { CartList } from './CartList'
import { CartAmount } from './CartAmount'
import s from './CartPage.module.css'

export const CartPage = () => {
	const productsCount = useAppSelector(cartSelectors.getCartProductsCount)

	if (!productsCount) {
		return <h1 className='header-title'>Товаров нет корзине</h1>
	}

	return (
		<div className={classNames(s['content'], s['container'])}>
			<div className={classNames(s['content-cart'])}>
				<div className={classNames(s['cart-title'])}>
					<span>{productsCount}</span> в корзине
				</div>
				<CartList />
				<CartAmount />
			</div>
		</div>
	)
}
