import { useForm, isNotEmpty } from '@mantine/form'
import { TextInput, Group, Checkbox, Button, Collapse } from '@mantine/core'
import writeToDatabase from '../../helpers/writeToDataBase'
import submitChangeDataBase from '../../helpers/submitChangeDataBase'
import { closeModal } from '../../store/editSlice'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useDisclosure } from '@mantine/hooks'

interface IDataObj {
	name: string
	nickname: string
	job: string
	avatar: string
	contacts: {
		phone: string | undefined
		telegram: string | undefined
	}
	taximeter: boolean
	terminal: boolean
	branding: boolean
	schedule: any
}

const AdminEmployeesForm = () => {
	const edit = useAppSelector(state => state.edit.edit)
	const editData = useAppSelector(state => state.edit.editData)
	const editUuid = useAppSelector(state => state.edit.editUuid)
	const dispatch = useAppDispatch()
	const [opened, { toggle }] = useDisclosure(false)

	useEffect(() => {
		if (edit) {
			form.setValues({
				name: editData.name,
				nickname: editData.nickname,
				job: editData.job,
				avatar: editData.avatar,
				contacts: {
					phone: editData.contacts.phone,
					telegram: editData.contacts.telegram,
				},
				taximeter: editData.taximeter,
				terminal: editData.terminal,
				branding: editData.branding,
				schedule: editData.schedule.map((item: any) => ({ ...item })),
			})
		}
	}, [edit])

	function generateMonthlySchedule() {
		const date = new Date()

		// Получаем текущий месяц и год
		const year = date.getFullYear()
		const month = date.getMonth() + 1

		// Определяем количество дней в месяце
		const daysInMonth = new Date(year, month, 0).getDate()

		// Формируем массив объектов с полями day и shift
		const schedule = []

		for (let day = 1; day <= daysInMonth; day++) {
			schedule.push({
				day: day, // Номер дня
				shift: '', // Поле shift (можно задать значение по умолчанию)
			})
		}

		return schedule
	}

	// Пример использования:
	const schedule = generateMonthlySchedule()

	// Клонируем массив schedule для того, чтобы можно было модифицировать его в форме
	const scheduleClone = schedule.map(item => ({ ...item }))

	const form = useForm<IDataObj>({
		initialValues: {
			name: '',
			nickname: '',
			job: '',
			avatar: '',
			// phone: '',
			// telegram: '',
			contacts: {
				phone: '',
				telegram: '',
			},
			schedule: scheduleClone,
			taximeter: false,
			terminal: false,
			branding: false,
		},
		validate: {
			nickname: isNotEmpty('Поле не должно быть пустым'),
		},
	})

	return (
		<form
			onSubmit={
				!edit
					? form.onSubmit(values =>
							writeToDatabase(
								`/drivers/${values.nickname}`,
								{ ...values },
								form.reset,
								() => dispatch(closeModal()),
								false
							)
					  )
					: form.onSubmit(values => {
							submitChangeDataBase(
								values,
								`/drivers/${values.nickname}`,
								editUuid,
								form.reset,
								() => dispatch(closeModal())
							)
					  })
			}
		>
			<TextInput
				placeholder='ФИО'
				label='ФИО'
				withAsterisk
				{...form.getInputProps('name')}
			/>
			<TextInput
				placeholder='Позывной'
				label='Позывной'
				withAsterisk
				disabled={edit ? true : false}
				{...form.getInputProps('nickname')}
			/>
			<TextInput
				label='Телефон'
				placeholder='Телефон'
				{...form.getInputProps('contacts.phone')}
			/>
			<TextInput
				label='Телеграм'
				placeholder='Телеграм'
				{...form.getInputProps('contacts.telegram')}
			/>
			<TextInput
				placeholder='Сотрудничество'
				label='Сотрудничество'
				{...form.getInputProps('job')}
			/>
			<TextInput
				label='Аватар'
				placeholder='Аватар'
				{...form.getInputProps('avatar')}
			/>
			<Group>
				<Checkbox
					mt='xs'
					size='md'
					variant='outline'
					label='Таксометр'
					{...form.getInputProps('taximeter', { type: 'checkbox' })}
				/>
				<Checkbox
					mt='xs'
					size='md'
					variant='outline'
					label='Терминал'
					{...form.getInputProps('terminal', { type: 'checkbox' })}
				/>
				<Checkbox
					mt='xs'
					size='md'
					variant='outline'
					label='Оклейка'
					{...form.getInputProps('branding', { type: 'checkbox' })}
				/>
			</Group>
			<Group justify='center' mb={5}>
				<Button onClick={toggle}>График</Button>
			</Group>

			<Collapse in={opened}>
				{form.values.schedule.map((item: any, index: any) => (
					<TextInput
						key={index}
						label={`День ${item.day}`}
						placeholder='Введите смену'
						{...form.getInputProps(`schedule.${index}.shift`)} // Привязываем поле к форме
					/>
				))}
			</Collapse>

			<Button mt='md' type='submit' variant='default' radius={0} size='md'>
				{edit ? 'Сохранить' : 'Отправить'}
			</Button>
		</form>
	)
}
export default AdminEmployeesForm
