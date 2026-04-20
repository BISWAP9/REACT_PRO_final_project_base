import { memo } from 'react'
import classNames from 'classnames'
import { useCartItem } from '@/features/cart/model/hooks/useCartItem'
import s from './CartCounter.module.css'

interface CartCounterProps {
	productId: string
}

export const CartCounter = memo(({ productId }: CartCounterProps) => {
	const { count, stock, handleSetCount, handleIncrement, handleDecrement } = useCartItem(productId)

	return (
		<div className={classNames(s['button-count'])}>
			<button
				type='button'
				onClick={handleDecrement}
				className={classNames(s['button-count__minus'])}>
				-
			</button>
			<input
				onChange={handleSetCount}
				type='number'
				className={classNames(s['button-count__num'])}
				value={count}
			/>
			<button
				type='button'
				onClick={handleIncrement}
				className={classNames(s['button-count__plus'])}
				disabled={count >= stock}>
				+
			</button>
		</div>
	)
})

CartCounter.displayName = 'CartCounter'
