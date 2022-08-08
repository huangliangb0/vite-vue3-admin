import { Modal, ModalProps } from 'ant-design-vue'
import { h, ref } from 'vue'
import 'ant-design-vue/lib/modal/style/index.css'
import { ModalFunc, ModalFuncProps } from 'ant-design-vue/lib/modal/Modal'

export const useModal = (modalProps: ModalProps = {}) => {
  type Keys = 'info' | 'success' | 'error' | 'warning' | 'confirm'
  const types = ['info', 'success', 'error', 'warning', 'confirm'] as const
  const Modals = types.reduce((prev, type) => {
    return { ...prev, [type]: Modal[type] }
  }, {} as Record<Keys, ModalFunc>)

  const openModal = ({
    type,
    onOk,
    onCancel,
  }: {
    type: Keys
    onOk?: ModalFuncProps['onOk']
    onCancel?: ModalFuncProps['onCancel']
  }) => {
    Modals[type]({ ...modalProps, onOk, onCancel })
  }

  return {
    openModal,
    ...Modals,
    Modal,
  }
}
