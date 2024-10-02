import { ref, remove } from 'firebase/database'
import { db } from '../firebase'

const deleteDataBase = (link: string) => {
	remove(ref(db, link))
}
export default deleteDataBase
