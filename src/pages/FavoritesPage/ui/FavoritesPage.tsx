import { WithQuery } from '@/shared/ui/WithQuery'
import { WithProtection } from '@/features/auth'
import { CardList, useProducts } from '@/features/products'
import { ButtonBack } from '@/shared/ui/ButtonBack'

const CardListWithQuery = WithQuery(CardList)

export const FavoritesPage = WithProtection(() => {
	const { isLoading, isError, products, error } = useProducts()

	return (
		<>
			<br />
			<ButtonBack />
			<CardListWithQuery
				title='Избранные'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
		</>
	)
})
