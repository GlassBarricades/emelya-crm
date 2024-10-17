import { memo } from 'react'
import AdminRowEmployeers from './AdminRow/AdminRowEmployeers'
import AdminRowOffRoad from './AdminRow/AdminRowOffRoad'

interface IAdminRowProps {
	element: any
	variant: string
}

const AdminRow = memo(({ element, variant }: IAdminRowProps) => {
	switch (variant) {
		case 'employees':
			return <AdminRowEmployeers element={element} />
		case 'off-road':
			return <AdminRowOffRoad element={element} />
	}
})
export default AdminRow
