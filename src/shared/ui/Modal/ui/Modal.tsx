import { memo, useCallback, useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import s from './Modal.module.css'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children?: ReactNode
	closeOnOverlayClick?: boolean
	closeOnEsc?: boolean
}

const MODAL_ROOT_ID = 'modal-root'

export const Modal = memo(
	({
		isOpen,
		onClose,
		title,
		children,
		closeOnOverlayClick = true,
		closeOnEsc = true,
	}: ModalProps) => {
		const closeButtonRef = useRef<HTMLButtonElement | null>(null)
		const triggerRef = useRef<Element | null>(null)

		useEffect(() => {
			if (!isOpen) return

			triggerRef.current = document.activeElement

			const focusFrame = window.requestAnimationFrame(() => {
				closeButtonRef.current?.focus()
			})

			const previousOverflow = document.body.style.overflow
			document.body.style.overflow = 'hidden'

			return () => {
				window.cancelAnimationFrame(focusFrame)
				document.body.style.overflow = previousOverflow

				const trigger = triggerRef.current
				if (trigger instanceof HTMLElement) {
					trigger.focus()
				}
			}
		}, [isOpen])

		useEffect(() => {
			if (!isOpen || !closeOnEsc) return

			const handleKeyDown = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					event.stopPropagation()
					onClose()
				}
			}

			document.addEventListener('keydown', handleKeyDown)
			return () => {
				document.removeEventListener('keydown', handleKeyDown)
			}
		}, [isOpen, closeOnEsc, onClose])

		const handleOverlayMouseDown = useCallback(
			(event: MouseEvent<HTMLDivElement>) => {
				if (!closeOnOverlayClick) return
				if (event.target === event.currentTarget) {
					onClose()
				}
			},
			[closeOnOverlayClick, onClose]
		)

		if (!isOpen) return null

		const modalRoot = document.getElementById(MODAL_ROOT_ID)
		if (!modalRoot) return null

		return createPortal(
			<div className={s.overlay} onMouseDown={handleOverlayMouseDown} role='presentation'>
				<div
					className={s.modal}
					role='dialog'
					aria-modal='true'
					aria-labelledby={title ? 'modal-title' : undefined}>
					<button
						ref={closeButtonRef}
						type='button'
						className={s.closeButton}
						aria-label='Закрыть'
						onClick={onClose}>
						<svg
							width='16'
							height='16'
							viewBox='0 0 16 16'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'>
							<path
								d='M2 2L14 14M14 2L2 14'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
							/>
						</svg>
					</button>
					{title && (
						<h2 id='modal-title' className={s.title}>
							{title}
						</h2>
					)}
					{children}
				</div>
			</div>,
			modalRoot
		)
	}
)

Modal.displayName = 'Modal'
