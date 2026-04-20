import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './config'
import { AppDispatch, RootState } from '@/shared/store/types'

export interface IErrorResponse {
	data: { statusCode: number; message: string; error: string }
	status: number
}

interface ProductsResponse {
	products: Product[]
	length: number
}

interface SetLikeResponse {
	like: { id: string; userId: string; productId: string }
	message: string
}

interface DeleteLikeResponse {
	product: { id: string; userId: string; productId: string }
	message: string
}

interface ProductRequest {
	page: number
	perPage?: number
	sort: Sort
	searchText: string
}

type LikesUpdater = (likes: Like[], userId: string) => Like[]

interface OptimisticContext {
	dispatch: (action: unknown) => unknown
	getState: () => unknown
	queryFulfilled: Promise<unknown>
}

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: customBaseQuery,
	tagTypes: ['Products'],
	endpoints: (builder) => ({
		getProducts: builder.query<ProductsResponse, ProductRequest>({
			query: ({ searchText, sort, page, perPage }) => ({
				url: '/products',
				params: {
					sort,
					searchTerm: searchText.length ? searchText : undefined,
					perPage: perPage ? page * perPage : undefined,
				},
			}),
			providesTags: [{ type: 'Products', id: 'list' }],
		}),

		getProduct: builder.query<Product, Pick<Product, 'id'>>({
			query: ({ id }) => ({ url: `/products/${id}` }),
			providesTags: (product) => [{ type: 'Products', id: product?.id }],
		}),

		createProduct: builder.mutation<Product, Product>({
			query: (product) => ({ url: '/products', method: 'POST', body: product }),
			invalidatesTags: [{ type: 'Products', id: 'list' }],
		}),

		deleteProduct: builder.mutation<Product, Pick<Product, 'id'>>({
			query: ({ id }) => ({ url: `/products/${id}`, method: 'DELETE' }),
			invalidatesTags: (product) => [
				{ type: 'Products', id: 'list' },
				{ type: 'Products', id: product?.id },
			],
		}),

		setLikeProduct: builder.mutation<SetLikeResponse, Pick<Product, 'id'>>({
			query: ({ id }) => ({ url: `/products/${id}/likes`, method: 'PUT' }),
			invalidatesTags: (res) => [{ type: 'Products', id: res?.like.productId }],
			onQueryStarted: ({ id }, ctx) =>
				applyOptimisticLike(ctx, id, (likes, userId) =>
					likes.some((l) => l.userId === userId)
						? likes
						: [...likes, makeOptimisticLike(id, userId)]
				),
		}),

		deleteLikeProduct: builder.mutation<DeleteLikeResponse, Pick<Product, 'id'>>({
			query: ({ id }) => ({ url: `/products/${id}/likes`, method: 'DELETE' }),
			invalidatesTags: (res) => [{ type: 'Products', id: res?.product.productId }],
			onQueryStarted: ({ id }, ctx) =>
				applyOptimisticLike(ctx, id, (likes, userId) => likes.filter((l) => l.userId !== userId)),
		}),
	}),
})

const makeOptimisticLike = (productId: string, userId: string): Like => ({
	id: `optimistic-${productId}-${userId}`,
	userId,
	productId,
	user: undefined as unknown as LikeUser,
})

async function applyOptimisticLike(
	{ dispatch, getState, queryFulfilled }: OptimisticContext,
	productId: string,
	update: LikesUpdater
) {
	const userId = (getState() as RootState).user.user?.id
	const patches = userId
		? patchProductLikes(getState as () => RootState, dispatch as AppDispatch, productId, (likes) =>
				update(likes, userId)
		  )
		: []

	try {
		await queryFulfilled
	} catch {
		patches.forEach((patch) => patch.undo())
	}
}

function patchProductLikes(
	getState: () => RootState,
	dispatch: AppDispatch,
	productId: string,
	update: (likes: Like[]) => Like[]
) {
	const state = getState()
	const patches: Array<{ undo: () => void }> = []

	const listEntries = productsApi.util.selectInvalidatedBy(state, [
		{ type: 'Products', id: 'list' },
	])
	for (const entry of listEntries) {
		if (entry.endpointName !== 'getProducts') continue
		patches.push(
			dispatch(
				productsApi.util.updateQueryData(
					'getProducts',
					entry.originalArgs as ProductRequest,
					(draft) => {
						const product = draft.products.find((p) => p.id === productId)
						if (product) product.likes = update(product.likes)
					}
				)
			)
		)
	}

	const itemEntries = productsApi.util.selectInvalidatedBy(state, [
		{ type: 'Products', id: productId },
	])
	for (const entry of itemEntries) {
		if (entry.endpointName !== 'getProduct') continue
		patches.push(
			dispatch(
				productsApi.util.updateQueryData(
					'getProduct',
					entry.originalArgs as Pick<Product, 'id'>,
					(draft) => {
						draft.likes = update(draft.likes)
					}
				)
			)
		)
	}

	return patches
}

export const {
	useGetProductQuery,
	useGetProductsQuery,
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
} = productsApi
