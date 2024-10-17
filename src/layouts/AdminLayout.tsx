import { AppShell, Burger, Group, Stack, Title, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './AdminLayout.module.css'
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
		<AppShell
			header={{ height: { base: 60, md: 70, lg: 80 } }}
			navbar={{
				width: { base: 200, md: 300, lg: 300 },
				breakpoint: 'sm',
				collapsed: { mobile: !opened },
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
								to='/'
							>
								Вернуться на сайт
							</UnstyledButton>
						</Group>
					</Group>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p='md'>
				<Stack>
					<UnstyledButton
						className={classes.control}
						component={NavLink}
						to='/admin'
					>
						Водители
					</UnstyledButton>
					<UnstyledButton
						className={classes.control}
						component={NavLink}
						to='off-road'
					>
						Бездорожье
					</UnstyledButton>
					<UnstyledButton
						className={classes.control}
						component={NavLink}
						to='schedule'
					>
						График
					</UnstyledButton>
				</Stack>
			</AppShell.Navbar>
			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	)
}
export default AdminLayout;