import { memo } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { Price } from '@/features/products/ui/Price/Price'
import { LikeButton } from '@/features/products/ui/LikeButton/LikeButton'
import { AddToCartButton } from '@/features/cart'
import s from './Card.module.css'

interface CardProps {
	product: Product
}

export const Card = memo(({ product }: CardProps) => {
	const { discount, price, name, tags, id, images } = product

	return (
		<article className={s['card']}>
			<div className={classNames(s['card__sticky'], s['card__sticky_type_top-left'])}>
				<span className={s['card__discount']}>{discount}</span>
				{tags.length > 0 &&
					tags.map((t) => (
						<span key={t} className={classNames(s['tag'], s['tag_type_new'])}>
							{t}
						</span>
					))}
			</div>
			<div className={classNames(s['card__sticky'], s['card__sticky_type_top-right'])}>
				<LikeButton product={product} />
			</div>
			<Link className={s['card__link']} to={`/products/${id}`}>
				<img src={images} alt={name} className={s['card__image']} loading='lazy' />
				<div className={s['card__desc']}>
					<Price price={price} discountPrice={discount} />
					<h3 className={s['card__name']}>{name}</h3>
				</div>
			</Link>
			<div className={s['card__cart']}>
				<AddToCartButton product={product} />
			</div>
		</article>
	)
})

Card.displayName = 'Card'
