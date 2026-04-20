import { memo } from 'react'
import classNames from 'classnames'
import s from './Price.module.css'

interface PriceProps {
	price: number
	discountPrice: number
	size?: 'small' | 'big'
}

export const Price = memo(({ price, discountPrice, size = 'small' }: PriceProps) => {
	return (
		<div
			className={classNames(size === 'small' ? s['price-small'] : s['price-big'], s['price-wrap'])}>
			<span className={classNames(s['price_old'], s['price_left'])}>{`${price}₽`}</span>
			<span className={classNames(s['price_discount'], s['price'])}>
				{`${price - discountPrice}₽`}
			</span>
		</div>
	)
})

Price.displayName = 'Price'
