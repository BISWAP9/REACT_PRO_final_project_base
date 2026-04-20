import { memo, useCallback } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ReactComponent as TrashIcon } from '@/shared/assets/icons/trash.svg'
import { cartActions, selectCartProductById } from '@/shared/store/slices/cart'
import { useAppSelector } from '@/shared/store/utils'
import { CartCounter } from '@/features/cart'
import { Button } from '@/shared/ui/Button'
import s from '@/pages/CartPage/ui/CartPage.module.css'

interface CartItemProps {
	productId: string
}

export const CartItem = memo(({ productId }: CartItemProps) => {
	const dispatch = useDispatch()
	const product = useAppSelector(selectCartProductById(productId))

	const handleDelete = useCallback(() => {
		dispatch(cartActions.deleteCartProduct(productId))
	}, [dispatch, productId])

	if (!product) return null

	const { id, name, images, price, discount } = product

	return (
		<div className={classNames(s['cart-item'])}>
			<div className={classNames(s['cart-item__desc'])}>
				<img src={images} alt={name} className={classNames(s['cart-item__image'])} />

				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
					<div style={{ display: 'flex', gap: '20px', flexGrow: 1 }}>
						<Link className={classNames(s['cart-item__title'])} to={`/products/${id}`}>
							<h2>{name}</h2>
						</Link>

						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<CartCounter productId={id} />

							<div className={classNames(s['cart-item__price'])}>
								<div className={classNames(s['price-big'], s['price-wrap'])}>
									<span className={classNames(s['price_old'], s['price_right'])}>{price}</span>
									<span className={classNames(s['price_discount'], s['price'])}>
										{price - discount}
									</span>
								</div>
							</div>
						</div>
						<Button
							variant='icon'
							className={classNames(s['cart-item__bnt-trash'])}
							onClick={handleDelete}
							aria-label='Удалить из корзины'>
							<TrashIcon />
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
})

CartItem.displayName = 'CartItem'
