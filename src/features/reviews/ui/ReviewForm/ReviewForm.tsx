import { memo, useActionState, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { Button } from '@/shared/ui/Button'
import { Rating } from '@/shared/ui/Rating'
import s from './ReviewForm.module.css'

interface ReviewActionState {
	status: 'idle' | 'success' | 'error'
	error?: string
}

const initialState: ReviewActionState = { status: 'idle' }

const submitReviewAction = async (
	_prev: ReviewActionState,
	formData: FormData
): Promise<ReviewActionState> => {
	const text = String(formData.get('text') ?? '').trim()
	const rating = Number(formData.get('rating') ?? 0)

	if (!rating) return { status: 'error', error: 'Поставьте оценку' }
	if (!text) return { status: 'error', error: 'Введите текст отзыва' }

	await new Promise((resolve) => setTimeout(resolve, 700))

	console.info('[ReviewForm] отправлен отзыв', { text, rating })
	return { status: 'success' }
}

export const ReviewForm = memo(() => {
	const formRef = useRef<HTMLFormElement>(null)
	const [rating, setRating] = useState(0)

	const [state, formAction, isPending] = useActionState(submitReviewAction, initialState)

	useEffect(() => {
		if (state.status === 'success') {
			toast.success('Отзыв отправлен')
			formRef.current?.reset()
			setRating(0)
		} else if (state.status === 'error' && state.error) {
			toast.error(state.error)
		}
	}, [state])

	return (
		<form ref={formRef} action={formAction} className={s['form']}>
			<input type='hidden' name='rating' value={rating} />
			<Rating isEdit rating={rating} onChange={setRating} />
			<textarea
				className={classNames(s['input'], s['textarea'])}
				name='text'
				id='text'
				placeholder='Напишите текст отзыва'
				disabled={isPending}
			/>
			<Button variant='primary' type='submit' loading={isPending} disabled={isPending}>
				{isPending ? 'Отправка…' : 'Отправить отзыв'}
			</Button>
		</form>
	)
})

ReviewForm.displayName = 'ReviewForm'
