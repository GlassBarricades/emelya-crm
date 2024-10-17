import { Group, ActionIcon, useMantineColorScheme } from '@mantine/core'
import { Pencil, Trash } from 'tabler-icons-react'
import deleteDataBase from '../../helpers/deleteDataBase'
import { edited } from '../../store/editSlice'
import { useDispatch } from 'react-redux'

interface IProps {
	element: any
	deleteLink: any
}

const AdminPanelSettings = ({ element, deleteLink }: IProps) => {
	const dispatch = useDispatch()
	const colorScheme = useMantineColorScheme()
	return (
		<Group>
			<ActionIcon
				size='lg'
				radius={0}
				variant={colorScheme.colorScheme === 'dark' ? 'outline' : 'default'}
				onClick={() => dispatch(edited(element))}
				color={colorScheme.colorScheme === 'dark' ? 'yellow.5' : undefined}
			>
				<Pencil size='1.2rem' />
			</ActionIcon>
			<ActionIcon
				size='lg'
				radius={0}
				variant={colorScheme.colorScheme === 'dark' ? 'outline' : 'default'}
				onClick={() => deleteDataBase(deleteLink)}
				color={colorScheme.colorScheme === 'dark' ? 'yellow.5' : undefined}
			>
				<Trash size='1.2rem' />
			</ActionIcon>
		</Group>
	)
}

export default AdminPanelSettings
