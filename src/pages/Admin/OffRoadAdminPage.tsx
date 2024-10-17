import { Button, Container, Group, Title } from '@mantine/core'
import AdminModal from '../../components/admin/AdminModal'
import AdminTable from '../../components/admin/AdminTable'
import useFetchSortedData from '../../hooks/useFetchSortedData'
import AdminRow from '../../components/admin/AdminRow'
import { openModal } from '../../store/editSlice'
import { useAppDispatch } from '../../hooks'
import AdminOffRoadForm from '../../components/admin/AdminOffRoadForm'

const OffRoadAdminPage = () => {
	const dispatch = useAppDispatch()
	const [categories, loading] = useFetchSortedData({
		url: '/off-road',
		field: 'name',
	})

    console.log(categories)

	const rows = categories.map((element: any) => (
		<AdminRow
			key={element.uuid}
			element={element}
            variant='off-road'
		/>
	))

	return (
		<Container fluid>
			<AdminModal size='calc(100vw - 3rem)'>
				<AdminOffRoadForm />
			</AdminModal>
			<Group justify='space-between' mt='md'>
				<Title>Бездорожье</Title>
				<Button
					variant='default'
					radius={0}
					size='md'
					onClick={() => dispatch(openModal())}
				>
					Добавить населенный пункт
				</Button>
			</Group>
			<AdminTable
				rows={rows}
				columnArray={[
					'id',
					'Населенный пункт',
					'Настройки',
				]}
				loading={loading}
			/>
		</Container>
	)
}
export default OffRoadAdminPage
