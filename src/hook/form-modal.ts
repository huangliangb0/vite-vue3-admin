import { ModalProps } from 'ant-design-vue'
import { computed, h, ref, Slot } from 'vue'
import 'ant-design-vue/lib/modal/style/index.css'
import { EditForm, EditFormInstance } from '@/components/form'
import useModal from './modal'
import useAppStore from '@/store/modules/app'
// 添加-编辑模态框
const useFormModal = (
  formProps: Partial<EditFormInstance>,
  modalProps: ModalProps = {},
) => {
  /***** hook **********/

  const appStore = useAppStore()
  const { Modal, visible } = useModal()

  /***** ref 或者 reactive **********/

  const formRef = ref<EditFormInstance | null>(null)
  const initialState = ref<Recordable>()
  const isEdit = ref(false)

  /***** computed **********/

  // 设置编辑表格模态框自适配宽度
  const modalWidth = computed(() => {
    const o: GridColType = {
      xs: '90%',
      sm: '90%',
      md: '80%',
      lg: '70%',
      xl: '60%',
      xxl: '50%',
      xxxl: '40%',
    }
    const width = o[appStore.breakpoint]
    return width
  })

  /***** methods **********/

  const openFormModal = () => {
    visible.value = true
  }
  const closeFormModal = () => {
    initialState.value = undefined
    formRef.value?.reset()
    visible.value = false
    isEdit.value = false
  }

  const openEditFormModal = (initValue: Recordable) => {
    initialState.value = initValue
    visible.value = true
    isEdit.value = true
  }

  /***** render 或者 component **********/
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
        width: modalWidth.value,
        ...modalProps,
        ...props,
      },
      {
        default: () =>
          h(
            EditForm,
            {
              initialState: initialState.value,
              isEdit: isEdit.value,
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
    openEditFormModal,
    openFormModal,
    closeFormModal,
    FormModal,
  }
}
export default useFormModal
