import { update, ref } from 'firebase/database'
import { db } from '../firebase'

const submitChangeDataBase = (data: {}, link: string, tempId: string, reset: () => void, close: () => void): void => {
	update(ref(db, link), {
		...data,
		uuid: tempId,
	})

	reset()
	close()
}

export default submitChangeDataBase
