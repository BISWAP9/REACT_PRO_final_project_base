import { Alert, Stack } from '@mui/material'
import { memo, useCallback, useLayoutEffect, useRef } from 'react'
import { Loader } from '@/shared/ui/Loader'
import { productsActions } from '@/shared/store/slices/products'
import { useAppDispatch } from '@/shared/store/utils'
import { useLoadMoreState } from '@/features/products/model/hooks/useLoadMoreState'

export const LoadMore = memo(() => {
	const ref = useRef<HTMLDivElement>(null)
	const dispatch = useAppDispatch()

	const { isFetching, hasProducts, isEndOfList, page } = useLoadMoreState()

	const fetchMoreProducts = useCallback(() => {
		if (!isEndOfList && !isFetching) {
			dispatch(productsActions.setPage(page + 1))
		}
	}, [isEndOfList, isFetching, page, dispatch])

	useLayoutEffect(() => {
		let observer: IntersectionObserver | undefined

		if (!isEndOfList && hasProducts) {
			observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						fetchMoreProducts()
					}
				},
				{ threshold: 0.5 }
			)
			ref.current && observer.observe(ref.current)
		}

		return () => {
			observer?.disconnect()
		}
	}, [fetchMoreProducts, isEndOfList, hasProducts])

	return (
		<Stack ref={ref} direction='row' justifyContent='center' alignItems='center' sx={{ my: 5 }}>
			{isFetching && <Loader />}
			{isEndOfList && <Alert severity='success'>End of list!</Alert>}
		</Stack>
	)
})

LoadMore.displayName = 'LoadMore'
