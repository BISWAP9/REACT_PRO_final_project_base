import { memo, useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { useAppSelector } from '@/shared/store/utils'
import { cartSelectors } from '@/shared/store/slices/cart'
import s from '@/pages/CartPage/ui/CartPage.module.css'

export const CartAmount = memo(() => {
	const products = useAppSelector(cartSelectors.getCartProducts)
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	const { allPrice, allDiscount } = useMemo(() => {
		return products.reduce(
			(acc, p) => ({
				allPrice: acc.allPrice + p.price * p.count,
				allDiscount: acc.allDiscount + p.discount * p.count,
			}),
			{ allPrice: 0, allDiscount: 0 }
		)
	}, [products])

	const openConfirm = useCallback(() => setIsConfirmOpen(true), [])
	const closeConfirm = useCallback(() => setIsConfirmOpen(false), [])

	const handleSubmitCart = useCallback(() => {
		const order = products.map((p) => ({ id: p.id, count: p.count }))
		console.log('Отправка заказа на сервер: ', JSON.stringify(order, null, 2))
		toast.success('Заказ успешно оформлен')
		setIsConfirmOpen(false)
	}, [products])

	return (
		<div className={classNames(s['cart-amount'])}>
			<h1 className={classNames(s['cart-amount__title'])}>Ваша корзина</h1>
			<div className={classNames(s['cart-amount__table'])}>
				<div className={classNames(s['cart-amount__table-row'])}>
					<span className={classNames(s['cart-amount__table-title'])}>
						{`Товары (${products.length})`}
					</span>
					<span className={classNames(s['cart-amount__table-value'])}>{`${allPrice} ₽`}</span>
				</div>
				<div className={classNames(s['cart-amount__table-row'])}>
					<span className={classNames(s['cart-amount__table-title'])}>Скидка</span>
					<span
						className={classNames(
							s['cart-amount__table-value'],
							s['cart-amount__table-value-discount']
						)}>
						{`${allDiscount} ₽`}
					</span>
				</div>
			</div>
			<div className={classNames(s['cart-amount__total-cost'])}>
				<h2 className={classNames(s['cart-amount__total-cost-title'])}>Общая стоимость</h2>
				<span className={classNames(s['cart-amount__total-cost-value'])}>
					{`${allPrice - allDiscount} ₽`}
				</span>
			</div>
			<Button variant='wide' onClick={openConfirm}>
				Оформить заказ
			</Button>

			<Modal isOpen={isConfirmOpen} onClose={closeConfirm} title='Подтвердите заказ'>
				<p style={{ margin: '0 0 24px', color: '#333', lineHeight: 1.5 }}>
					{`Вы оформляете заказ на ${products.length} товар(ов) на сумму ${
						allPrice - allDiscount
					} ₽. Продолжить?`}
				</p>
				<div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
					<Button variant='ghost' onClick={closeConfirm}>
						Отмена
					</Button>
					<Button variant='primary' onClick={handleSubmitCart}>
						Подтвердить
					</Button>
				</div>
			</Modal>
		</div>
	)
})

CartAmount.displayName = 'CartAmount'
