import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyARwaXzimi8MBWM2DvtpGIyyKsU4AS7QMw',
	authDomain: 'emelya-be976.firebaseapp.com',
	projectId: 'emelya-be976',
	storageBucket: 'emelya-be976.appspot.com',
	messagingSenderId: '542385785799',
	appId: '1:542385785799:web:970c396fdc9f5d195027e2',
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
