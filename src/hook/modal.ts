import { Modal } from 'ant-design-vue'
import { ref } from 'vue'
import 'ant-design-vue/lib/modal/style/index.css'

const useModal = () => {
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
export default useModal
