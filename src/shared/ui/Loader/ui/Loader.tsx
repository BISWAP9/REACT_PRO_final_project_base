import { memo } from 'react'
import classNames from 'classnames'
import s from './Loader.module.css'

interface LoaderProps {
	size?: number
	className?: string
}

export const Loader = memo(({ size = 48, className }: LoaderProps) => {
	return (
		<div className={classNames(s.wrapper, className)}>
			<div className={s.loader} style={{ width: size, height: size }} aria-label='loading' />
		</div>
	)
})

Loader.displayName = 'Loader'
