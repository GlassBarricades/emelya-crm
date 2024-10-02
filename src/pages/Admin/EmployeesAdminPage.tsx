import { Button, Container, Group, Title } from '@mantine/core'
import AdminModal from '../../components/admin/AdminModal'
import AdminTable from '../../components/admin/AdminTable'
import useFetchSortedData from '../../hooks/useFetchSortedData'
import AdminRow from '../../components/admin/AdminRow'
import AdminEmployeesForm from '../../components/admin/AdminEmployeesForm'
import { openModal } from '../../store/editSlice'
import { useAppDispatch } from '../../hooks'

const EmployeesAdminPage = () => {
	const dispatch = useAppDispatch()
	const [categories, loading] = useFetchSortedData({
		url: '/drivers',
		field: 'nickname',
	})

	const rows = categories.map((element: any) => (
		<AdminRow
			key={element.uuid}
			element={element}
			deleteLink={`/drivers/${element.nickname}`}
		/>
	))

	return (
		<Container fluid>
			<AdminModal size='calc(100vw - 3rem)'>
				<AdminEmployeesForm />
			</AdminModal>
			<Group justify='space-between' mt='md'>
				<Title>Водители</Title>
				<Button
					variant='default'
					radius={0}
					size='md'
					onClick={() => dispatch(openModal())}
				>
					Добавить водителя
				</Button>
			</Group>
			<AdminTable
				rows={rows}
				columnArray={[
					'Позывной',
					'ФИО',
					'Аватар',
					'Сотрудничество',
					'Телефон',
					'Оборудование',
					'Настройки',
				]}
				loading={loading}
			/>
		</Container>
	)
}
export default EmployeesAdminPage
