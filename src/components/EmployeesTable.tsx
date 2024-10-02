import {
	Avatar,
	Badge,
	Table,
	Group,
	Text,
	ActionIcon,
	rem,
	Grid,
	Stack,
	Image,
	Button,
	Loader,
	Center,
} from '@mantine/core'
import { InfoCircle } from 'tabler-icons-react'
import { modals } from '@mantine/modals'
import useFetchSortedData from '../hooks/useFetchSortedData'

interface Employee {
	name: string
	nickname: string
	avatar: string
	phone: string
	job: string
	taximeter: boolean
	terminal: boolean
	branding: boolean
}

const EmployeesTable = () => {
	const [data, loading] = useFetchSortedData({
		url: '/drivers',
		field: 'nickname',
	})

	const rows = data.map((item: Employee) => (
		<Table.Tr key={item.name}>
			<Table.Td>
				<Group gap='sm'>
					<Text w={25}>{item.nickname}</Text>
					<Avatar size={30} src={item.avatar} radius={30} />
					<Text fz='sm' fw={500}>
						{item.name}
					</Text>
				</Group>
			</Table.Td>
			<Table.Td>
				<Button variant='outline' component='a' href={`tel:${item.phone}`}>
					Позвонить
				</Button>
			</Table.Td>
			<Table.Td>
				<ActionIcon
					variant='subtle'
					color='gray'
					onClick={() => {
						modals.open({
							title: 'Профиль сотрудника',
							children: (
								<Grid>
									<Grid.Col span={6}>
										<Stack>
											<Image src={item.avatar} />
										</Stack>
									</Grid.Col>
									<Grid.Col span={6}>
										<Stack>
											<Text>{item.name}</Text>
											<Text>{item.nickname}</Text>
											<Text component='a' href={`tel:${item.phone}`} fz='sm'>
												{item.phone}
											</Text>
											<Badge color={item.job.toLowerCase()} variant='light'>
												{item.job}
											</Badge>
											<Text>Таксометр: {item.taximeter ? `Да` : `Нет`}</Text>
											<Text>Терминал: {item.terminal ? `Да` : `Нет`}</Text>
											<Text>Оклейка: {item.branding ? `Да` : `Нет`}</Text>
										</Stack>
									</Grid.Col>
								</Grid>
							),
						})
					}}
				>
					<InfoCircle style={{ width: rem(20), height: rem(20) }} />
				</ActionIcon>
			</Table.Td>
		</Table.Tr>
	))

	return (
		<>
			{loading ? (
				<Center style={{ height: '50vh' }}>
					<Loader size='lg' />
				</Center>
			) : (
				<Table verticalSpacing='sm'>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Сотрудник</Table.Th>
							<Table.Th>Телефон</Table.Th>
							<Table.Th />
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			)}
		</>
	)
}
export default EmployeesTable;