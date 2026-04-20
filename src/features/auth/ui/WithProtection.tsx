import { ComponentType, FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/shared/store/utils'
import { userSelectors } from '@/shared/store/slices/user'

const AUTH_PATHS = ['/signin', '/signup']

export const WithProtection = <P extends object>(WrappedComponent: ComponentType<P>) => {
	const ReturnedComponent: FC<P> = (props) => {
		const accessToken = useAppSelector(userSelectors.getAccessToken)
		const location = useLocation()

		if (!accessToken && !AUTH_PATHS.includes(location.pathname)) {
			return (
				<Navigate
					to='/signin'
					state={{
						from: location.pathname,
					}}
				/>
			)
		}

		return <WrappedComponent {...props} />
	}

	ReturnedComponent.displayName = `withProtection${WrappedComponent.displayName}`

	return ReturnedComponent
}
