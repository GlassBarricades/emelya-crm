import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css'
import './index.css'
import store, { persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { createTheme, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Provider } from 'react-redux'

const theme = createTheme({
	/** Put your mantine theme override here */
})

createRoot(document.getElementById('root')!).render(
	<MantineProvider theme={theme}>
		<ModalsProvider>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<App />
				</PersistGate>
			</Provider>
		</ModalsProvider>
	</MantineProvider>
)
