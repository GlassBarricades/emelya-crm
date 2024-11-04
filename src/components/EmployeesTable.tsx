import {
	Badge,
	Table,
	Text,
	ActionIcon,
	rem,
	Stack,
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
	contacts: {
		phone: string
		telegram: string
	}
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

	console.log(data)

	const rows = data.map((item: Employee) => (
		<Table.Tr key={item.nickname}>
			<Table.Td>
				<Stack>
					<Text>{item.nickname}</Text>
					<Text fz='sm' fw={500}>
						{item.name}
					</Text>
				</Stack>
			</Table.Td>
			<Table.Td>
				<Stack align='stretch' justify='center'>
					<Button
						variant='outline'
						component='a'
						href={`tel:${item.contacts.phone}`}
					>
						Позвонить
					</Button>
					{item.contacts.telegram !== '' ? (
						<Button
							variant='default'
							component='a'
							miw={"100%"}
							href={`https://t.me/${item.contacts.telegram}`}
							target='_blank'
						>
							Написать
						</Button>
					) : undefined}
				</Stack>
			</Table.Td>
			<Table.Td>
				<ActionIcon
					variant='subtle'
					color='gray'
					onClick={() => {
						modals.open({
							title: 'Профиль сотрудника',
							children: (
										<Stack>
											<Text>{item.name}</Text>
											<Text>{item.nickname}</Text>
											<Text
												component='a'
												href={`tel:${item.contacts.phone}`}
												fz='sm'
											>
												{item.contacts.phone}
											</Text>
											{item.contacts.telegram !== '' ? (
												<Text
													component='a'
													href={`https://t.me/${item.contacts.telegram}`}
													target='_blank'
													fz='sm'
												>
													{item.contacts.telegram}
												</Text>
											) : undefined}

											<Badge color={item.job.toLowerCase()} variant='light'>
												{item.job}
											</Badge>
										</Stack>
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
export default EmployeesTable
