import './App.css'
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DirectoryPage from './pages/DirectoryPage'
import EmployeesAdminPage from './pages/Admin/EmployeesAdminPage'
import RequireAuth from './hoc/RequireAuth'
import LoginPage from './pages/LoginPage'
import OffRoadAdminPage from './pages/Admin/OffRoadAdminPage'
import AdminLayout from './layouts/AdminLayout'
import ScheduleAdminPage from './pages/Admin/ScheduleAdminPage'
import SchedulePage from './pages/SchedulePage'

function App() {

	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path='/' element={<MainLayout />}>
					<Route index element={<DirectoryPage />} />
					<Route path='directory' element={<DirectoryPage />} />
					<Route path='schedule' element={<SchedulePage />} />
					{/* <Route
						index
						element={
							<HomePage
								image={settings.mainImage}
								textHero={settings.heroText}
							/>
						}
					/>
					<Route path='catalog' element={<CatalogPage />} />
					<Route
						path='catalog/:category'
						element={<CategoryPage />}
						loader={categoryLoader}
					/>
					<Route
						path='catalog/:category/:product'
						element={<ProductPage />}
						loader={productLoader}
					/>
					<Route path='about' element={<AboutPage />} />
					<Route path='contacts' element={<ContactsPage />} />
					<Route path='info' element={<InfoPage />} /> */}
				</Route>
				<Route
					path='admin'
					element={
						<RequireAuth>
							<AdminLayout />
						</RequireAuth>
					}
				>
					<Route
						index
						element={
							<RequireAuth>
								<EmployeesAdminPage />
							</RequireAuth>
						}
					/>
					<Route
						path='off-road'
						element={
							<RequireAuth>
								<OffRoadAdminPage />
							</RequireAuth>
						}
					/>
					<Route
						path='schedule'
						element={
							<RequireAuth>
								<ScheduleAdminPage />
							</RequireAuth>
						}
					/>
					{/* <Route
						path='category'
						element={
							<RequireAuth>
								<AdminCategoriesPage />
							</RequireAuth>
						}
					/>
					<Route
						path=':category'
						element={
							<RequireAuth>
								<AdminProductsPage />
							</RequireAuth>
						}
					/>
					<Route
						path='info'
						element={
							<RequireAuth>
								<AdminInfoPage />
							</RequireAuth>
						}
					/>
					<Route
						path='about'
						element={
							<RequireAuth>
								<AdminAboutPage />
							</RequireAuth>
						}
					/>
					<Route
						path='partners'
						element={
							<RequireAuth>
								<AdminPartnersPage />
							</RequireAuth>
						}
					/>
					<Route
						path='video'
						element={
							<RequireAuth>
								<AdminVideoPage />
							</RequireAuth>
						}
					/>
					<Route
						path='mainsettings'
						element={
							<RequireAuth>
								<AdminMainSettings />
							</RequireAuth>
						}
					/> */}
				</Route>
				<Route path={'/login'} element={<LoginPage />} />
			</>
		)
	)

	return <RouterProvider router={router}></RouterProvider>
}

export default App
