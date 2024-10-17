import { Table } from '@mantine/core'
import { memo } from 'react'
import AdminPanelSettings from '../AdminPanelSettings'

interface IAdminRowOffRoad {
    element: any
}

const AdminRowOffRoad = memo(({ element }: IAdminRowOffRoad) => {
	return (
		<Table.Tr>
			<Table.Td>{element.uuid}</Table.Td>
			<Table.Td>{element.name}</Table.Td>
			<Table.Td>
				<AdminPanelSettings
					element={element}
					deleteLink={`off-road/${element.uuid}`}
				/>
			</Table.Td>
		</Table.Tr>
	)
})
export default AdminRowOffRoad
