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
      grid: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 12,
      },
      formItemProps: {
        extra: '页面跳转之后依然保存页面的状态',
      },
    },
    {
      field: 'hideInMenu',
      label: '是否隐藏',
      component: 'Switch',
      default: false,
      grid: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 12,
      },
      formItemProps: {
        extra: '在侧边栏菜单中将不会显示',
      },
    },

    {
      field: 'hideInTags',
      label: '在标签栏隐藏',
      component: 'Switch',
      default: false,
      grid: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 12,
      },
      formItemProps: {
        extra: '在页面切换时，该路由不会再标签栏中显示',
      },
    },
    {
      field: 'affixInTags',
      label: '固定在标签栏',
      component: 'Switch',
      default: false,
      grid: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 12,
      },
      formItemProps: {
        extra: '该路由一开始就会出现在标签栏中，并且不会删除',
      },
    },
    {
      field: 'alwayShowChildInMenu',
      label: '一直显示',
      component: 'Switch',
      default: false,
      formItemProps: {
        extra:
          '在侧边栏中，就算菜单中只有一个子菜单，也会把该菜单显示出来，默认如果只有子菜单是不会显示父级菜单了',
      },
    },
  ]
  const reset = useFormModal(
    // form 属性
    {
      schemas: schemas,
      labelWidth: '88',
    },
    // modal 属性
    {
      width: '60%',
      title: '添加菜单',
    },
  )

  return {
    ...reset,
  }
}
