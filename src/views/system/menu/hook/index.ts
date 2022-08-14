import { FormSchemas } from '@/components/form'
import { useFormModal } from '@/hook'

export const useForm = () => {
  const schemas: FormSchemas = [
    {
      field: 'name',
      label: '组件名称',
      component: 'Input',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '组件名称必填',
            trigger: 'blur',
          },
        ],
      },
      componentProps: () => ({
        placeholder: '请输入组件名称',
      }),
    },
    {
      field: 'path',
      label: '路由地址',
      component: 'Input',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '路由地址必填',
            trigger: 'blur',
          },
        ],
      },
      componentProps: () => ({
        placeholder: '请输入路由地址',
      }),
    },
    {
      field: 'title',
      label: '菜单名称',
      component: 'Input',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '菜单名称必填',
            trigger: 'blur',
          },
        ],
      },
      componentProps: () => ({
        placeholder: '请输入菜单名称',
      }),
    },

    {
      field: 'icon',
      label: '菜单图标',
      component: 'Input',
      componentProps: () => ({
        placeholder: '请输入菜单图标',
      }),
    },
    {
      field: 'sort',
      label: '排序',
      component: 'InputNumber',
      componentProps: () => ({
        placeholder: '请输入排序',
      }),
    },
    {
      field: 'isCache',
      label: '是否缓存',
      component: 'Switch',
      default: false,
    },
    {
      field: 'hideInMenu',
      label: '是否隐藏',
      component: 'Switch',
      default: false,
    },

    {
      field: 'alwayShowChildInMenu',
      label: '一直显示',
      component: 'Switch',
      default: false,
    },
    {
      field: 'hideInTags',
      label: '标签栏不显示',
      component: 'Switch',
      default: false,
    },

    {
      field: 'affixInTags',
      label: '标签栏显示',
      component: 'Switch',
      default: false,
    },
  ]
  const reset = useFormModal({
    schemas: schemas,
  })

  return {
    ...reset,
  }
}
