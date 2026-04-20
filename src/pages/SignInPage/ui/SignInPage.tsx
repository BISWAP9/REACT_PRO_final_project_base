import { SignInForm, WithProtection } from '@/features/auth'

export const SignInPage = WithProtection(() => {
	return <SignInForm />
})
