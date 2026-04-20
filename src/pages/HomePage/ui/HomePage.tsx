import { WithQuery } from '@/shared/ui/WithQuery'
import { WithProtection } from '@/features/auth'
import { CardList, LoadMore, useProducts } from '@/features/products'

const CardListWithQuery = WithQuery(CardList)

export const HomePage = WithProtection(() => {
	const { products, isLoading, isError, error } = useProducts()

	return (
		<>
			<CardListWithQuery
				title='Лакомства'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
			<LoadMore />
		</>
	)
})
