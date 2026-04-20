import { Alert, Stack } from '@mui/material'
import { memo, useCallback, useLayoutEffect, useRef } from 'react'
import { Loader } from '@/shared/ui/Loader'
import { productsActions, productsSelectors } from '@/shared/store/slices/products'
import { useAppDispatch, useAppSelector } from '@/shared/store/utils'
import { useProducts } from '@/features/products/model/hooks/useProducts'

export const LoadMore = memo(() => {
	const ref = useRef<HTMLDivElement>(null)
	const dispatch = useAppDispatch()

	const { products, isFetching, productsCount } = useProducts()
	const page = useAppSelector(productsSelectors.getPage)

	const isEndOfList = products.length >= productsCount

	const fetchMoreProducts = useCallback(() => {
		if (!isEndOfList && !isFetching) {
			dispatch(productsActions.setPage(page + 1))
		}
	}, [isEndOfList, isFetching, page, dispatch])

	useLayoutEffect(() => {
		let observer: IntersectionObserver | undefined

		if (!isEndOfList && products.length) {
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
	}, [fetchMoreProducts, isEndOfList, products.length])

	return (
		<Stack ref={ref} direction='row' justifyContent='center' alignItems='center' sx={{ my: 5 }}>
			{isFetching && <Loader />}
			{isEndOfList && <Alert severity='success'>End of list!</Alert>}
		</Stack>
	)
})

LoadMore.displayName = 'LoadMore'
