import { SignUpForm, WithProtection } from '@/features/auth'

export const SignUpPage = WithProtection(() => {
	return <SignUpForm />
})
