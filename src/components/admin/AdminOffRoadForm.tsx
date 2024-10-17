import { TextInput, Button } from '@mantine/core'
import writeToDatabase from '../../helpers/writeToDataBase'
import submitChangeDataBase from '../../helpers/submitChangeDataBase'
import { isNotEmpty, useForm } from '@mantine/form'
import { closeModal } from '../../store/editSlice'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'

interface IDataObj {
	name: string
}

const AdminOffRoadForm = () => {
	const edit = useAppSelector(state => state.edit.edit)
	const editData = useAppSelector(state => state.edit.editData)
	const editUuid = useAppSelector(state => state.edit.editUuid)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (edit) {
			form.setFieldValue('name', editData.name)
		}
	}, [edit])

	const form = useForm<IDataObj>({
		initialValues: {
			name: '',
		},
		validate: {
			name: isNotEmpty('Поле не должно быть пустым'),
		},
	})

	return (
		<form
			onSubmit={
				!edit
					? form.onSubmit(values =>
							writeToDatabase(
								`/off-road/`,
								{ ...values },
								form.reset,
								() => dispatch(closeModal()),
								true
							)
					  )
					: form.onSubmit(values => {
							submitChangeDataBase(
								values,
								`/off-road/${editUuid}`,
								editUuid,
								form.reset,
								() => dispatch(closeModal())
							)
					  })
			}
		>
			<TextInput
				placeholder='Название населенного пункта'
				label='Название населенного пункта'
				withAsterisk
				{...form.getInputProps('name')}
			/>
			<Button mt='md' type='submit'>
				{edit ? 'Сохранить' : 'Создать'}
			</Button>
		</form>
	)
}

export default AdminOffRoadForm
