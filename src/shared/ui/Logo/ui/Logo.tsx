import { Link } from 'react-router-dom'
import { ReactComponent as LogoIcon } from '@/shared/ui/Logo/assets/logo.svg'
import s from './Logo.module.css'

export const Logo = () => {
	return (
		<Link to='/' aria-label='Логотип компании'>
			<LogoIcon className={s['logo__pic']} />
		</Link>
	)
}
