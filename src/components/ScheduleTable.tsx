import React, { useRef, useEffect } from 'react'
import { Table, Loader } from '@mantine/core'
import styles from './ScheduleTable.module.css' // Импортируем стили из модуля

interface ISchedule {
	day: number
	shift: string
}

interface IDriver {
	nickname: string
	schedule: ISchedule[] | undefined // Объявляем, что schedule может быть undefined
}

interface ScheduleTableProps {
	drivers: IDriver[]
	loading: boolean
}

const generateTable = ({ drivers, loading }: ScheduleTableProps) => {
	if (loading) {
		return <Loader size='md' color='blue' /> // Показать индикатор загрузки
	}

	if (!drivers || drivers.length === 0) {
		return <p>Нет данных водителей</p>
	}

	// Фильтруем водителей, у которых хотя бы один shift не пустой
	const driversWithSchedule = drivers.filter(
		driver => driver.schedule && driver.schedule.some(s => s.shift !== '')
	)

	// Если после фильтрации водителей не осталось
	if (driversWithSchedule.length === 0) {
		return <p>Нет доступных графиков</p>
	}

	// Определяем количество дней в месяце по первому объекту
	const daysInMonth = driversWithSchedule[0]?.schedule?.length || 0

	return (
		<Table striped highlightOnHover withTableBorder withColumnBorders>
			{/* Заголовок таблицы */}
			<Table.Thead>
				<Table.Tr>
					<Table.Th className={`${styles.stickyHeader} ${styles.header}`}>
						№
					</Table.Th>
					{/* Заголовки для дней месяца */}
					{Array.from({ length: daysInMonth }, (_, index) => (
						<Table.Th
							className={`${styles.stickyHeader} ${styles.header}`}
							key={index + 1}
						>
							{index + 1}
						</Table.Th>
					))}
				</Table.Tr>
			</Table.Thead>

			{/* Тело таблицы */}
			<Table.Tbody>
				{driversWithSchedule.map(driver => (
					<Table.Tr key={driver.nickname}>
						{/* Столбец с никнеймом */}
						<Table.Td className={`${styles.stickyColumn} ${styles.column}`}>
							{driver.nickname}
						</Table.Td>

						{/* Столбцы с графиком смен */}
						{driver.schedule?.map((scheduleItem, index) => (
							<Table.Td key={index}>{scheduleItem.shift || ''}</Table.Td>
						))}
					</Table.Tr>
				))}
			</Table.Tbody>
		</Table>
	)
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ drivers, loading }) => {
	const tableContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleScroll = () => {
			if (!tableContainerRef.current) return

			const isScrolled =
				tableContainerRef.current.scrollTop > 0 ||
				tableContainerRef.current.scrollLeft > 0

			const headers = tableContainerRef.current.querySelectorAll(
				`.${styles.header}`
			)
			const columns = tableContainerRef.current.querySelectorAll(
				`.${styles.column}`
			)

			headers.forEach(header => {
				if (isScrolled) {
					header.classList.add(styles.scrolled)
				} else {
					header.classList.remove(styles.scrolled)
				}
			})

			columns.forEach(column => {
				if (isScrolled) {
					column.classList.add(styles.scrolled)
				} else {
					column.classList.remove(styles.scrolled)
				}
			})
		}

		const container = tableContainerRef.current
		if (container) {
			container.addEventListener('scroll', handleScroll)
		}

		// Удаляем обработчик событий при размонтировании компонента
		return () => {
			if (container) {
				container.removeEventListener('scroll', handleScroll)
			}
		}
	}, [])

	return (
		<div className={styles.tableContainer} ref={tableContainerRef}>
			{generateTable({ drivers, loading })} {/* Передаем пропсы в функцию */}
		</div>
	)
}

export default ScheduleTable
