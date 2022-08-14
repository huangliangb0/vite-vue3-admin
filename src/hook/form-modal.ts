import { ModalProps } from 'ant-design-vue'
import { h, ref, Slot } from 'vue'
import 'ant-design-vue/lib/modal/style/index.css'
import { EditForm, EditFormInstance } from '@/components/form'
import useModal from './modal'
// 添加-编辑模态框
const useFormModal = (formProps: Partial<EditFormInstance>) => {
  const { Modal, visible } = useModal()
  const formRef = ref<EditFormInstance | null>(null)
  const initialState = ref<Recordable>()
  const openFormModal = (initValue?: Recordable) => {
    initialState.value = initValue
    visible.value = true
  }
  const closeFormModal = () => {
    initialState.value = undefined
    formRef.value?.reset()
    visible.value = false
  }

  const FormModal = (
    props: ModalProps,
    { slots, attrs }: { slots: Slot; attrs: Recordable },
  ) => {
    return h(
      Modal,
      {
        footer: null,
        onCancel: closeFormModal,
        visible: visible.value,
        ...props,
      },
      {
        default: () =>
          h(
            EditForm,
            {
              initialState: initialState.value,
              ...formProps,
              ...attrs,
              ref: formRef,
            },
            slots,
          ),
      },
    )
  }
  return {
    formRef,
    visible,
    openFormModal,
    closeFormModal,
    FormModal,
  }
}
export default useFormModal
