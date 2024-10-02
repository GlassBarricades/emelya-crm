import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { ref, onValue } from 'firebase/database'

const useFetchSortedData = ({ url, field }: { url: string; field: string }) => {
	const [data, setData] = useState<any>([])
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		if (url) {
			fetchData(url)
		}
	}, [url])

	function fetchData(url: string) {
		setLoading(true)
		onValue(ref(db, url), snapshot => {
			setData([])
			const dataValue = Object.values(snapshot.val()).sort(
				(a: any, b: any) => Number(a[field]) - Number(b[field])
			)
			if (dataValue !== null) {
				dataValue.map(item => setData((oldArray: any) => [...oldArray, item]))
				setLoading(false)
			}
		})
	}

	return [data, loading]
}
export default useFetchSortedData
