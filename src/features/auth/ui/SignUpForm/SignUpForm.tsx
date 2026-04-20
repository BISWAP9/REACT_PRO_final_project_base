import { FC, useEffect, useRef } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Avatar, Box, Link, TextField, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'

import { SignUpFormValues } from '@/features/auth/model/types'
import { signUpFormSchema } from '@/features/auth/model/validators'
import { userActions } from '@/shared/store/slices/user'
import { getMessageFromError } from '@/shared/utils'
import { useSignUpMutation } from '@/shared/store/api/authApi'

export const SignUpForm: FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [signUpRequestFn] = useSignUpMutation()

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
	} = useForm<SignUpFormValues>({
		defaultValues: { email: '', password: '' },
		resolver: yupResolver(signUpFormSchema),
	})

	const submitHandler: SubmitHandler<SignUpFormValues> = async (values) => {
		submitAttemptsRef.current += 1
		const timeToSubmitMs = Math.round(performance.now() - mountedAtRef.current)

		try {
			const response = await signUpRequestFn(values).unwrap()

			console.info(
				`[SignUpForm] success after ${submitAttemptsRef.current} attempt(s), ${timeToSubmitMs}ms`
			)

			dispatch(userActions.setUser(response.user))
			dispatch(userActions.setAccessToken({ accessToken: response.accessToken }))

			toast.success('Вы успешно зарегистрированы!')
			navigate('/')
		} catch (error) {
			console.info(`[SignUpForm] failed attempt #${submitAttemptsRef.current}, ${timeToSubmitMs}ms`)
			toast.error(getMessageFromError(error, 'Не известная ошибка при регистрации пользователя'))
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
					Sign Up
				</Typography>
				<Box component='form' onSubmit={handleSubmit(submitHandler)} noValidate sx={{ mt: 1 }}>
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
						Sign Up
					</LoadingButton>
					<Box display='flex' justifyContent='center' flexGrow={1}>
						<Link component={RouterLink} to='/signin'>
							SIGN IN
						</Link>
					</Box>
				</Box>
			</Box>
		</>
	)
}
