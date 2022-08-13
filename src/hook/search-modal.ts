import { FilterSearch, FilterSearchInstance } from '@/components/form'
import { useAppStore } from '@/store/modules/app'
import { Button, ModalProps } from 'ant-design-vue'
import { computed, h, Slot } from 'vue'
import useModal from './modal'

/* 过滤查询表单 */
const useSearchModal = (
  formProps: Partial<FilterSearchInstance>,
  confing?: { modal?: Partial<Record<GridKey, boolean>> },
) => {
  const { Modal, visible, openModal, closeModal } = useModal()
  const { modal = { xs: true } } = confing || {}
  const appStore = useAppStore()

  const isModal = computed(() => {
    return modal[appStore.windowSize]
  })

  const SearchForm = (
    props: ModalProps,
    { slots, attrs }: { slots: Slot; attrs: Recordable },
  ) => {
    if (isModal.value) {
      return h(
        'div',
        {
          class: 'filer--search--with--modal',
        },
        {
          default: () => [
            h(
              Button,
              {
                onClick: openModal,
                style: {
                  width: '100%',
                },
              },
              {
                default: () => '点击搜索',
              },
            ),
            h(
              Modal,
              {
                visible: visible.value,
                footer: null,
                onCancel: closeModal,
                title: '按筛选条件进行搜索',
                width: '88%',
                ...props,
              },
              {
                default: () =>
                  h(
                    FilterSearch,
                    {
                      ...formProps,
                      ...attrs,
                    },
                    slots,
                  ),
              },
            ),
          ],
        },
      )
    }

    return h(FilterSearch, {
      ...formProps,
    })
  }
  return {
    SearchForm,
  }
}

export default useSearchModal
