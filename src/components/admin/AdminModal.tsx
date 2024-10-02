import { Modal } from '@mantine/core'
import { closeModal } from '../../store/editSlice'
import { memo } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'

interface IProps {
	size: string
    children: React.ReactNode
}

const AdminModal = memo(({ size, children }: IProps) => {
	const edit = useAppSelector(state => state.edit.edit)
	const open = useAppSelector(state => state.edit.editModal)
	const dispatch = useAppDispatch()
	return (
		<Modal
			opened={open}
			size={size}
			onClose={() => dispatch(closeModal())}
			title={edit ? 'Редактирование элемента' : 'Добавление элемента'}
		>
			{children}
		</Modal>
	)
})
export default AdminModal
