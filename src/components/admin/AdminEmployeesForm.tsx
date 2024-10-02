import { useForm, isNotEmpty } from '@mantine/form'
import {
	TextInput,
	Group,
	Checkbox,
	Button
} from '@mantine/core'
import writeToDatabase from '../../helpers/writeToDataBase'
import submitChangeDataBase from '../../helpers/submitChangeDataBase'
import { closeModal } from '../../store/editSlice'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'

interface IDataObj {
	name: string
	nickname: string
	job: string
	avatar: string
	phone: string
	taximeter: boolean
	terminal: boolean
	branding: boolean
}

const AdminEmployeesForm = () => {
	const edit = useAppSelector(state => state.edit.edit)
	const editData = useAppSelector(state => state.edit.editData)
	const editUuid = useAppSelector(state => state.edit.editUuid)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (edit) {
			form.setValues({
				name: editData.name,
				nickname: editData.nickname,
				job: editData.job,
				avatar: editData.avatar,
				phone: editData.phone,
				taximeter: editData.taximeter,
				terminal: editData.terminal,
				branding: editData.branding,
			})
		}
	}, [edit])

	const form = useForm<IDataObj>({
		initialValues: {
			name: '',
			nickname: '',
			job: '',
			avatar: '',
			phone: '',
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
				{...form.getInputProps('phone')}
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

			<Button mt='md' type='submit' variant='default' radius={0} size='md'>
				{edit ? 'Сохранить' : 'Отправить'}
			</Button>
		</form>
	)
}
export default AdminEmployeesForm