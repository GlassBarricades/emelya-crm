import AuthForm from './AuthForm'
import { setUser } from '../../store/authSlice'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { auth } from '../../firebase'

const AuthLogin = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const handleLogin = (email: string, password: string): void => {
		// const auth = getAuth()
		signInWithEmailAndPassword(auth, email, password)
			 .then(({ user }: any) => {
			 	dispatch(
			 		setUser({
			 			email: user.email,
			 			id: user.id,
			 			token: user.accessToken,
			 		})
			 	)
			 })
			.then(() => navigate('/admin', { replace: true }))
			.catch(console.log)
	}
	return <AuthForm title={'Войти'} handleClick={handleLogin} />
}

export default AuthLogin
