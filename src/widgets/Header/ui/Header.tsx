import { memo } from 'react'
import classNames from 'classnames'
import { Logo } from '@/shared/ui/Logo'
import { Search } from '@/features/search'
import { FavoritesBadge } from './FavoritesBadge'
import { CartBadge } from './CartBadge'
import { UserMenu } from './UserMenu'
import s from './Header.module.css'

export const Header = memo(() => {
	return (
		<header className={s.header}>
			<div className={classNames('container', s.header__wrapper)}>
				<Logo />
				<Search />
				<div className={s['header__icons-menu']}>
					<FavoritesBadge />
					<CartBadge />
					<UserMenu />
				</div>
			</div>
		</header>
	)
})

Header.displayName = 'Header'
