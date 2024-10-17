import { Badge, Image, Stack, Table, Text } from "@mantine/core";
import AdminPanelSettings from "../AdminPanelSettings";
import { memo } from "react";

interface IProps {
  element: any;
}

const AdminRowEmployeers = memo(({ element }: IProps) => {
	return (
		<Table.Tr>
			<Table.Td>{element.nickname}</Table.Td>
			<Table.Td>{element.name}</Table.Td>
			<Table.Td>
				<Image
					w={50}
					src={
						element.avatar
							? element.avatar
							: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
					}
					alt={element.name}
				/>
			</Table.Td>
			<Table.Td>
				<Badge color={element.job.toLowerCase()} variant='light'>
					{element.job}
				</Badge>
			</Table.Td>
			<Table.Td>{element.phone}</Table.Td>
			<Table.Td>
				<Stack gap={2}>
					<Text>{`Таксометр: ${element.taximeter}`}</Text>
					<Text>{`Терминал: ${element.terminal}`}</Text>
					<Text>{`Оклейка: ${element.branding}`}</Text>
				</Stack>
			</Table.Td>
			<Table.Td>
				<AdminPanelSettings
					element={element}
					deleteLink={`/drivers/${element.nickname}`}
				/>
			</Table.Td>
		</Table.Tr>
	)
})
export default AdminRowEmployeers;
