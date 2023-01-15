import { ModalProps, Space } from 'ant-design-vue'
import { Button } from '@/components/antd'

import { computed, h, provide, ref, Slot } from 'vue'
import 'ant-design-vue/lib/modal/style/index.css'
import { Form, EditFormInstance } from '@/components/form'
import useModal from './modal'
import useAppStore from '@/store/modules/app'
// 添加-编辑模态框
const useFormModal = (
  formProps: Partial<EditFormInstance>,
  modalProps: ModalProps & { updateTitle?: string } = {},
) => {
  /***** hook **********/

  const appStore = useAppStore()
  const { Modal, visible } = useModal()

  /***** ref 或者 reactive **********/

  const formRef = ref<EditFormInstance | null>(null)
  const initialState = ref<Recordable>()
  const loading = ref(false)
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

  /***** provide **********/

  /**
   * 你的表单部件可能需要监听modal关闭时做一些操作，比如 Input组件
   *
   * const visible = inject('form-modal-visible')
   *
   * const watch(() => visible.value, () => {
   *   一些额外的操作
   * })
   */
  provide('form-modal-visible', visible)

  /***** methods **********/

  // 提交按钮
  const startLoading = () => {
    loading.value = true
  }

  // 提交表单成功处理后或者出现异常，关闭loading
  const stopLoading = () => {
    loading.value = false
  }

  const openFormModal = () => {
    visible.value = true
  }
  const closeFormModal = () => {
    initialState.value = undefined
    isEdit.value = false
    visible.value = false
    formRef.value?.reset()
  }

  const openEditFormModal = (initValue: Recordable) => {
    isEdit.value = true
    visible.value = true
    initialState.value = initValue
  }

  /***** render 或者 component **********/
  const FormModal = (
    props: ModalProps & { updateTitle?: string },
    { slots, attrs }: { slots: Slot; attrs: Recordable },
  ) => {
    const title = props.title || modalProps.title
    const updateTitle = props.updateTitle || modalProps.updateTitle

    return h(
      Modal,
      {
        onCancel: closeFormModal,
        visible: visible.value,
        width: modalWidth.value,
        ...modalProps,
        ...props,
        title: isEdit.value ? updateTitle || title : title,
      },
      {
        default: () =>
          h(
            Form,
            {
              hideAction: false,
              initialState: initialState.value,
              isEdit: isEdit.value,
              ...formProps,
              ...attrs,
              ref: formRef,
            },
            slots,
          ),
        footer: () =>
          h(
            Space,
            {},
            {
              default: () => [
                h(
                  Button,
                  { onClick: formRef.value?.reset },
                  {
                    default: () => '重置',
                  },
                ),
                h(
                  Button,
                  {
                    type: 'primary',
                    loading: loading.value,
                    onClick: formRef.value?.submit,
                  },
                  {
                    default: () => '提交',
                  },
                ),
              ],
            },
          ),
      },
    )
  }
  return {
    formRef,
    visible,
    isEdit,
    startLoading,
    stopLoading,
    openEditFormModal,
    openFormModal,
    closeFormModal,
    FormModal,
  }
}
export default useFormModal
