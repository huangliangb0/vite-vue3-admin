import { ModalProps } from 'ant-design-vue'
import { h, ref, Slot } from 'vue'
import 'ant-design-vue/lib/modal/style/index.css'
import { EditForm, EditFormInstance, FilterSearch } from '@/components/form'
import useModal from './modal'
// 添加-编辑模态框
const useFormModal = (formProps: Partial<EditFormInstance>) => {
  const { Modal, visible } = useModal()
  const formRef = ref<EditFormInstance | null>(null)
  const initialValue = ref<Recordable>()
  const openFormModal = (initValue?: Recordable) => {
    initialValue.value = initValue
    visible.value = true
  }
  const closeFormModal = () => {
    initialValue.value = undefined
    visible.value = false
    formRef.value?.reset()
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
        ...props,
      },
      {
        default: () =>
          h(
            EditForm,
            {
              initialValue: initialValue.value,
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
