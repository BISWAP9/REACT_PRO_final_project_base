import { memo, startTransition, useCallback, useOptimistic } from 'react'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { ReactComponent as LikeSvg } from '@/shared/assets/icons/like.svg'
import { useAppSelector } from '@/shared/store/utils'
import { userSelectors } from '@/shared/store/slices/user'
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
	IErrorResponse,
} from '@/shared/store/api/productsApi'
import s from './LikeButton.module.css'

interface LikeButtonProps {
	product: Product
}

export const LikeButton = memo(({ product }: LikeButtonProps) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken)
	const userId = useAppSelector((state) => state.user.user?.id)

	const [setLike] = useSetLikeProductMutation()
	const [deleteLike] = useDeleteLikeProductMutation()

	const baseIsLike = product?.likes.some((l) => l.userId === userId) ?? false

	const [isLike, setOptimisticLike] = useOptimistic(
		baseIsLike,
		(_state: boolean, next: boolean) => next
	)

	const toggleLike = useCallback(() => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы')
			return
		}

		startTransition(async () => {
			setOptimisticLike(!baseIsLike)

			const response = baseIsLike
				? await deleteLike({ id: `${product.id}` })
				: await setLike({ id: `${product.id}` })

			if ('error' in response && response.error) {
				const error = response.error as IErrorResponse
				toast.error(error.data.message)
			}
		})
	}, [accessToken, deleteLike, setLike, product.id, baseIsLike, setOptimisticLike])

	return (
		<button
			type='button'
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: isLike,
			})}
			onClick={toggleLike}>
			<LikeSvg />
		</button>
	)
})

LikeButton.displayName = 'LikeButton'
