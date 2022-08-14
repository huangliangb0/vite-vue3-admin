import { FormSchemas } from '@/components/form'
import { useFormModal } from '@/hook'

export const useForm = () => {
  const schemas: FormSchemas = [
    {
      field: 'parentId',
      label: '父级菜单',
      component: 'Select',
      default: '',
      componentProps: () => ({
        placeholder: '请输入父级菜单',
        options: [],
      }),
    },
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
      component: 'IconSelect',
      componentProps: () => ({
        allowClear: true,
        placeholder: '请选择菜单图标',
      }),
    },
    {
      field: 'sort',
      label: '排序',
      component: 'InputNumber',
      default: 0,
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
      label: '在标签栏隐藏',
      component: 'Switch',
      default: false,
    },

    {
      field: 'affixInTags',
      label: '固定在标签栏',
      component: 'Switch',
      default: false,
    },
  ]
  const reset = useFormModal(
    // form 属性
    {
      schemas: schemas,
    },
    // modal 属性
    {
      title: '添加菜单',
    },
  )

  return {
    ...reset,
  }
}
