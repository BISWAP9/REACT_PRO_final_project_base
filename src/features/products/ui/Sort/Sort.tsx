import { ChangeEvent, memo, useCallback } from 'react'
import { productsActions, productsSelectors } from '@/shared/store/slices/products'
import { useAppDispatch, useAppSelector } from '@/shared/store/utils'

interface SortParams {
	title: string
	value: Sort
}

const SORT_PARAMS: SortParams[] = [
	{ title: 'Дешевые', value: 'low-price' },
	{ title: 'Дорогие', value: 'high-price' },
	{ title: 'Новые', value: 'newest' },
	{ title: 'Старые', value: 'oldest' },
]

export const Sort = memo(() => {
	const dispatch = useAppDispatch()
	const sort = useAppSelector(productsSelectors.getSort)

	const handleSortSelect = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			dispatch(productsActions.setSort(e.target.value as Sort))
		},
		[dispatch]
	)

	return (
		<select value={sort} onChange={handleSortSelect}>
			{SORT_PARAMS.map((p) => (
				<option key={p.title} value={p.value}>
					{p.title}
				</option>
			))}
		</select>
	)
})

Sort.displayName = 'Sort'
