import './styles/normalize.css'
import './styles/styles.css'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import { Sort } from '@/features/products'
import { Container } from '@mui/material'

export const App = () => {
	return (
		<>
			<Header />
			<Sort />
			<Container sx={{ flexGrow: 1 }} component='main'>
				<Outlet />
			</Container>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				pauseOnHover
				theme='colored'
			/>
			<Footer />
		</>
	)
}
