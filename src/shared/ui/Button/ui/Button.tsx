import { ButtonHTMLAttributes, forwardRef, memo, ReactNode } from 'react'
import classNames from 'classnames'
import s from './Button.module.css'

export type ButtonVariant = 'primary' | 'ghost' | 'icon' | 'wide'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	loading?: boolean
	children?: ReactNode
}

export const Button = memo(
	forwardRef<HTMLButtonElement, ButtonProps>(
		(
			{
				variant = 'primary',
				loading = false,
				disabled,
				className,
				children,
				type = 'button',
				...rest
			},
			ref
		) => {
			return (
				<button
					ref={ref}
					type={type}
					disabled={disabled || loading}
					className={classNames(s.button, s[`button_${variant}`], className)}
					{...rest}>
					{loading ? <span className={s.spinner} /> : children}
				</button>
			)
		}
	)
)

Button.displayName = 'Button'
