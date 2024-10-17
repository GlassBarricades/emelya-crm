import ScheduleTable from "../components/ScheduleTable"
import useFetchSortedData from "../hooks/useFetchSortedData"


const SchedulePage = () => {
	const [drivers, loading] = useFetchSortedData({
		url: '/drivers',
		field: 'nickname',
	})

	return <ScheduleTable drivers={drivers} loading={loading}/>
}
export default SchedulePage
