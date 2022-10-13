import { FilterSearch, FilterSearchInstance } from '@/components/form'
import useAppStore from '@/store/modules/app'
import { Button, Drawer, DrawerProps } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { computed, watch, h, ref, Slot } from 'vue'
import useModal from './modal'

/* 过滤查询表单 */
const useSearchModal = (
  formProps: Partial<FilterSearchInstance>,
  confing?: { modal?: Partial<Record<GridKeyType, boolean>> },
) => {
  const { modal = { xs: true } } = confing || {}
  const appStore = useAppStore()

  const searchRef = ref<FilterSearchInstance | null>(null)
  const initialState = ref<Recordable>()
  const { visible, openModal, closeModal } = useModal()
  const isModal = ref(false)
  const breakpoint = computed(() => appStore.breakpoint)
  watch(
    () => breakpoint.value,
    (size) => {
      initialState.value = searchRef.value
        ? cloneDeep(searchRef.value.formState)
        : undefined

      isModal.value = !!modal[size]
    },
    {
      immediate: true,
    },
  )

  const SearchForm = (
    props: DrawerProps,
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
              Drawer,
              {
                visible: visible.value,
                footer: null,
                onClose: closeModal,
                title: '按筛选条件进行搜索',
                width: '88%',
                ...props,
              },
              {
                default: () =>
                  h(
                    FilterSearch,
                    {
                      initialState: initialState.value,
                      ...formProps,
                      ...attrs,
                      ref: searchRef,
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
      initialState: initialState.value,
      ...formProps,
      ref: searchRef,
    })
  }
  return {
    SearchForm,
    searchRef,
  }
}

export default useSearchModal
