import { Modal, ModalProps } from 'ant-design-vue'
import { h, ref, Slot } from 'vue'
import 'ant-design-vue/lib/modal/style/index.css'
import { EditForm, FormSchemas } from '@/components/form'

export const useModal = () => {
  const visible = ref(false)
  const openModal = () => {
    visible.value = true
  }
  const closeModal = () => {
    visible.value = false
  }

  return {
    visible,
    openModal,
    closeModal,
    Modal,
  }
}

export const useFormModal = (
  formProps: Partial<InstanceType<typeof EditForm>>,
) => {
  const { Modal, closeModal, ...reset } = useModal()
  const FormModal = (
    props: ModalProps,
    { slots, attrs }: { slots: Slot; attrs: Recordable },
  ) => {
    return h(
      Modal,
      {
        footer: null,
        onCancel: closeModal,
        ...props,
      },
      {
        default: () =>
          h(
            EditForm,
            {
              ...formProps,
              ...attrs,
            },
            slots,
          ),
      },
    )
  }
  return {
    FormModal,
    ...reset,
  }
}
