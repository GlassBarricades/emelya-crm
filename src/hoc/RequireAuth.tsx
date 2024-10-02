import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface IRequareAuthProps {
	children: React.ReactNode
}

const RequireAuth = ({ children }: IRequareAuthProps) => {
	const location = useLocation()
	const { isAuth } = useAuth()

	if (!isAuth) {
		return <Navigate to='/login' state={{ from: location }} />
	}

	return children
}

export default RequireAuth
