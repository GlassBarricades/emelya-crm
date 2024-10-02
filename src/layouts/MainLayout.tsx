import { AppShell, Burger, Group, Title, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './MainLayout.module.css'
import { NavLink, Outlet } from 'react-router-dom'

const MainLayout = () => {
	const [opened, { toggle }] = useDisclosure()

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: 'sm',
				collapsed: { desktop: true, mobile: !opened },
			}}
			padding='md'
		>
			<AppShell.Header>
				<Group h='100%' px='md'>
					<Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
					<Group justify='space-between' style={{ flex: 1 }}>
						<Title>Емеля</Title>
						<Group ml='xl' gap={0} visibleFrom='sm'>
							<UnstyledButton
								className={classes.control}
								component={NavLink}
								to='/directory'>
								Справочник
							</UnstyledButton>
							<UnstyledButton className={classes.control} component={NavLink} to='/grafik'>
								График
							</UnstyledButton>
						</Group>
					</Group>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar py='md' px={4}>
				<UnstyledButton className={classes.control}>Справочник</UnstyledButton>
				<UnstyledButton className={classes.control}>График</UnstyledButton>
			</AppShell.Navbar>

			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	)
}
export default MainLayout
