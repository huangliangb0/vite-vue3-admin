import { Modal, ModalProps } from 'ant-design-vue'
import { h, reactive, ref, Slot } from 'vue'
import 'ant-design-vue/lib/modal/style/index.css'
import { EditForm, FormSchemas } from '@/components/form'

export const useModal = () => {
  const visible = ref(false)
  const initialValue = reactive<Recordable>({})
  const openModal = (initValue?: Recordable) => {
    if (initValue) {
      Object.keys(initValue).forEach((k) => {
        initialValue[k] = initValue[k]
      })
    }
    visible.value = true
  }
  const closeModal = () => {
    Object.keys(initialValue).forEach((k) => {
      initialValue[k] = undefined
    })
    visible.value = false
  }

  return {
    visible,
    initialValue,
    openModal,
    closeModal,
    Modal,
  }
}

export const useFormModal = (
  formProps: Partial<InstanceType<typeof EditForm>>,
) => {
  const { Modal, closeModal, initialValue, ...reset } = useModal()

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
              initialValue,
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
