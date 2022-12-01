import { FormSchemas } from '@/components/form'
import { useFormModal } from '@/hook'

const useArticleFormModal = () => {
  const schemas = [
    {
      field: 'title',
      label: '文章标题',
      component: 'Input',
      default: undefined,
      componentProps: () => ({
        placeholder: '请输入文章标题单',
      }),
      formItemProps: () => ({
        rules: [
          { required: true, message: '文章标题不能为空', trigger: 'blur' },
        ],
      }),
    },
    {
      field: 'content',
      label: '文章内容',
      component: 'Input',
      default: undefined,
      componentProps: () => ({
        placeholder: '请输入文章标题单',
      }),
      formItemProps: () => ({
        rules: [
          { required: true, message: '文章标题不能为空', trigger: 'blur' },
        ],
      }),
    },
  ] as FormSchemas

  const reset = useFormModal(
    // form 属性
    {
      schemas: schemas,
      labelWidth: 120,
    },
    // modal 属性
    {
      title: '添加文章',
      updateTitle: '编辑文章',
    },
  )

  return {
    ArticleFormModal: reset.FormModal,
    ...reset,
  }
}

export default useArticleFormModal
