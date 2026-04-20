import { memo, useCallback } from 'react'
import classNames from 'classnames'
import { Button } from '@/shared/ui/Button'
import { useLocalCount } from '@/features/cart/model/hooks/useLocalCount'
import { useAddToCart } from '@/features/cart/model/hooks/useAddToCart'
import s from './AddToCartCounter.module.css'

interface AddToCartCounterProps {
	product: Product
}

export const AddToCartCounter = memo(({ product }: AddToCartCounterProps) => {
	const { count, handleCount, handleCountMinus, handleCountPlus } = useLocalCount()
	const { addProductToCart } = useAddToCart()

	const handleAdd = useCallback(() => {
		addProductToCart({ ...product, count })
	}, [addProductToCart, product, count])

	return (
		<div className={classNames(s.wrap)}>
			<div className={s['button-count']}>
				<button type='button' className={s['button-count__minus']} onClick={handleCountMinus}>
					-
				</button>
				<input
					type='number'
					className={s['button-count__num']}
					value={count}
					onChange={handleCount}
				/>
				<button type='button' className={s['button-count__plus']} onClick={handleCountPlus}>
					+
				</button>
			</div>
			<Button variant='primary' onClick={handleAdd}>
				В корзину
			</Button>
		</div>
	)
})

AddToCartCounter.displayName = 'AddToCartCounter'
