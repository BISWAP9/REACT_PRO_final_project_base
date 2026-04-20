import { FC, useEffect, useRef } from 'react'
import { Avatar, Box, Link, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LoadingButton from '@mui/lab/LoadingButton'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { SignInFormValues } from '@/features/auth/model/types'
import { signInFormSchema } from '@/features/auth/model/validators'
import { useSignInMutation } from '@/shared/store/api/authApi'
import { userActions } from '@/shared/store/slices/user'
import { getMessageFromError } from '@/shared/utils'

export const SignInForm: FC = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const navigate = useNavigate()
	const [signInRequestFn] = useSignInMutation()

	const emailInputRef = useRef<HTMLInputElement | null>(null)
	const submitAttemptsRef = useRef(0)
	const mountedAtRef = useRef<number>(performance.now())

	useEffect(() => {
		emailInputRef.current?.focus()
	}, [])

	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignInFormValues>({
		defaultValues: { email: '', password: '' },
		resolver: yupResolver(signInFormSchema),
	})

	const submitHandler: SubmitHandler<SignInFormValues> = async (values) => {
		submitAttemptsRef.current += 1
		const timeToSubmitMs = Math.round(performance.now() - mountedAtRef.current)

		try {
			const response = await signInRequestFn(values).unwrap()

			console.info(
				`[SignInForm] success after ${submitAttemptsRef.current} attempt(s), ${timeToSubmitMs}ms`
			)

			dispatch(userActions.setUser(response.user))
			dispatch(userActions.setAccessToken({ accessToken: response.accessToken }))

			toast.success('Вы успешно авторизованы!')

			if (location.state?.from) {
				return navigate(location.state.from)
			}
			navigate('/')
		} catch (error) {
			console.info(`[SignInForm] failed attempt #${submitAttemptsRef.current}, ${timeToSubmitMs}ms`)
			toast.error(getMessageFromError(error, 'Не известная ошибка при авторизации пользователя'))
		}
	}

	return (
		<>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign In
				</Typography>
				<Box component='form' onSubmit={handleSubmit(submitHandler)} noValidate sx={{ my: 1 }}>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<TextField
								margin='normal'
								label='Email Address'
								type='email'
								fullWidth
								required
								autoComplete='email'
								inputRef={emailInputRef}
								error={!!errors.email?.message}
								helperText={errors.email?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name='password'
						control={control}
						render={({ field }) => (
							<TextField
								label='Password'
								type='password'
								error={!!errors.password?.message}
								helperText={errors.password?.message}
								margin='normal'
								fullWidth
								required
								{...field}
							/>
						)}
					/>

					<LoadingButton
						type='submit'
						disabled={isSubmitted && (!isValid || isSubmitting)}
						loading={isSubmitting}
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}>
						Sign IN
					</LoadingButton>
					<Box display='flex' justifyContent='center' flexGrow={1}>
						<Link component={RouterLink} to='/signup'>
							SIGN UP
						</Link>
					</Box>
				</Box>
			</Box>
		</>
	)
}
