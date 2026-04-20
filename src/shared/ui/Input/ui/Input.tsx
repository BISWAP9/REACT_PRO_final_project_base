import { forwardRef, InputHTMLAttributes, memo } from 'react'
import classNames from 'classnames'
import s from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = memo(
	forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', ...rest }, ref) => {
		return <input ref={ref} type={type} className={classNames(s.input, className)} {...rest} />
	})
)

Input.displayName = 'Input'
