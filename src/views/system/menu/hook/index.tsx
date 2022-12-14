import { FormSchemas } from '@/components/form'
import { useFormModal } from '@/hook'
import useMenuStore from '@/store/modules/menu'
import { computed, Ref } from 'vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { Space, Tooltip } from 'ant-design-vue'
import { Rule } from 'ant-design-vue/lib/form'

export const useForm = ({ name }: { name: Ref<string> }) => {
  const menuStore = useMenuStore()
  const schemas = computed(
    () =>
      [
        {
          field: 'parentId',
          label: '父级菜单',
          component: 'Select',
          default: undefined,
          componentProps: () => ({
            placeholder: '请输入父级菜单',
            showSearch: true,
            options: menuStore.menus.map((item) => ({
              label: item.title,
              value: item.id,
            })),
          }),
        },

        {
          field: 'name',
          component: 'InputSelect',
          formItemProps: () => {
            const validate = async (_rule: Rule, value: string) => {
              if (value === '' || value === undefined) {
                return Promise.reject('请输入组件名')
              } else {
                const isExist = menuStore.menus.some(
                  (item) => item.name === value,
                )

                if (isExist && value !== name.value) {
                  return Promise.reject('该组件名已存在')
                }
                return Promise.resolve()
              }
            }

            return {
              label: () => (
                <Tooltip
                  title={
                    '通过组件名称映射到对应路由组件, keep-alive的作用也与组件名称有关联'
                  }
                >
                  <Space>
                    <span>组件名称</span>
                    <QuestionCircleOutlined />
                  </Space>
                </Tooltip>
              ),
              rules: [
                {
                  required: true,
                  validator: validate,
                  trigger: 'change',
                },
              ],
            }
          },
          componentProps: () => ({
            placeholder: '请输入',
            options: menuStore.usablePermissionRouteNames,
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
          field: 'redirect',
          label: '重定向',
          component: 'Input',
          default: undefined,
          formItemProps: {},
          componentProps: () => ({
            placeholder: '请输入重定向',
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
          component: 'InputNumber',
          default: 0,
          formItemProps: {
            label: () => (
              <Tooltip title={'排序值越小越靠前'}>
                <Space>
                  <span>排序</span>
                  <QuestionCircleOutlined />
                </Space>
              </Tooltip>
            ),
          },
          componentProps: () => ({
            placeholder: '请输入排序',
          }),
        },
        {
          field: 'isCache',
          component: 'Switch',
          default: false,
          grid: {
            xs: 12,
            sm: 12,
            md: 8,
            lg: 8,
          },
          formItemProps: {
            label: () => (
              <Tooltip
                title={'组件的name必须和菜单的name一直，不然缓存效果将会失效'}
              >
                <Space>
                  <span>是否缓存</span>
                  <QuestionCircleOutlined />
                </Space>
              </Tooltip>
            ),
          },
        },
        {
          field: 'hideInMenu',
          component: 'Switch',
          default: false,
          grid: {
            xs: 12,
            sm: 12,
            md: 8,
            lg: 8,
          },
          formItemProps: {
            label: () => (
              <Tooltip title={'在侧边栏菜单中将不会显示'}>
                <Space>
                  <span>是否隐藏</span>
                  <QuestionCircleOutlined />
                </Space>
              </Tooltip>
            ),
          },
        },

        {
          field: 'hideInTags',
          component: 'Switch',
          default: false,
          grid: {
            xs: 12,
            sm: 12,
            md: 8,
            lg: 8,
          },
          formItemProps: {
            label: () => (
              <Tooltip title={'在页面切换时，该路由不会再标签栏中显示'}>
                <Space>
                  <span>在标签栏隐藏</span>
                  <QuestionCircleOutlined />
                </Space>
              </Tooltip>
            ),
          },
        },
        {
          field: 'affixInTags',
          component: 'Switch',
          default: false,
          grid: {
            xs: 12,
            sm: 12,
            md: 8,
            lg: 8,
          },
          formItemProps: {
            label: () => (
              <Tooltip title={'该路由一开始就会出现在标签栏中，并且不会删除'}>
                <Space>
                  <span>固定在标签栏</span>
                  <QuestionCircleOutlined />
                </Space>
              </Tooltip>
            ),
          },
        },
        {
          field: 'alwayShowChildInMenu',
          component: 'Switch',
          default: false,
          grid: {
            xs: 12,
            sm: 12,
            md: 8,
            lg: 8,
          },
          formItemProps: {
            label: () => (
              <Tooltip
                title={
                  '在侧边栏中，就算菜单中只有一个子菜单，也会把该菜单显示出来，默认如果只有子菜单是不会显示父级菜单了'
                }
              >
                <Space>
                  <span>一直显示</span>
                  <QuestionCircleOutlined />
                </Space>
              </Tooltip>
            ),
          },
        },
      ] as FormSchemas,
  )
  const reset = useFormModal(
    // form 属性
    {
      schemas: schemas.value,
      labelWidth: 120,
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
