import classNames from 'classnames'
import { ReactComponent as Instagram } from '@/shared/assets/images/instagram.svg'
import { ReactComponent as Telegram } from '@/shared/assets/images/telegram.svg'
import { ReactComponent as Viber } from '@/shared/assets/images/viber.svg'
import { ReactComponent as Vk } from '@/shared/assets/images/vk.svg'
import { ReactComponent as Whatsapp } from '@/shared/assets/images/whatsapp.svg'
import s from './Footer.module.css'
import { Logo } from '@/shared/ui/Logo'

export const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className='container'>
				<div className={s['footer__wrapper']}>
					<div className={s['footer__col']}>
						<Logo />
						<p className={s['footer__copyright']}>© «Интернет-магазин DogFood.ru»</p>
					</div>
					<div className={s['footer__col']}>
						<nav className={s['menu-bottom']}>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Каталог
							</a>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Акции
							</a>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Новости
							</a>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Отзывы
							</a>
						</nav>
					</div>
					<div className={s['footer__col']}>
						<nav className={s['menu-bottom']}>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Оплата и доставка
							</a>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Часто спрашивают
							</a>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Обратная связь
							</a>
							<a href='/catalogue' className={s['menu-bottom__item']}>
								Контакты
							</a>
						</nav>
					</div>
					<div className={s['footer__col']}>
						<div className={s['contacts']}>
							<p className={s['contacts__title']}>Мы на связи</p>
							<a
								className={classNames(s['contacts__tel'], s['contacts__link'])}
								href='tel:89177172179'>
								8 (999) 00-00-00
							</a>
							<a
								className={classNames(s['contacts__mail'], s['contacts__link'])}
								href='mailto:hordog.ru@gmail.com'>
								dogfood.ru@gmail.com
							</a>
							<ul className={classNames(s['socials'])}>
								<li>
									<a className={s['socials__link']} href='/#' aria-label='telegram'>
										<Telegram />
									</a>
								</li>
								<li>
									<a className={s['socials__link']} href='/#' aria-label='whatsapp'>
										<Whatsapp />
									</a>
								</li>
								<li>
									<a className={s['socials__link']} href='/#' aria-label='viber'>
										<Viber />
									</a>
								</li>
								<li>
									<a className={s['socials__link']} href='/#' aria-label='instagram'>
										<Instagram />
									</a>
								</li>
								<li>
									<a className={s['socials__link']} href='/#' aria-label='vk'>
										<Vk />
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
