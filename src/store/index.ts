import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from './authSlice'
import navBarSlice from './navBarSlice'
import editSlice from './editSlice'
import editSliceText from './textEditSlice'
import settingsSlice from './settingsSlice'

const rootReducer = combineReducers({
	auth: authSlice,
	navBar: navBarSlice,
	edit: editSlice,
	editText: editSliceText,
	settings: settingsSlice
})

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['categories', 'navBar', 'edit', 'editText', 'settingsSlice'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})
export const persistor = persistStore(store)
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch