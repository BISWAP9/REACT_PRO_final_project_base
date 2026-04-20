import { combineReducers } from 'redux'
import { userSlice } from '@/shared/store/slices/user'
import { cartSlice } from '@/shared/store/slices/cart'
import { productsSlice } from '@/shared/store/slices/products'
import { authApi } from '@/shared/store/api/authApi'
import { productsApi } from '@/shared/store/api/productsApi'

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
	[productsSlice.name]: productsSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
})
