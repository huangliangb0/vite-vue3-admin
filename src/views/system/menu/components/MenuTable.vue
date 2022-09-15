<script lang="tsx" setup>
  import { TableColumns } from '@/components/basic-table'
  import BasicTable from '@/components/basic-table/index.vue'
  import { deleteMenu, patchMenu } from '@/server/menu'
  import useMenuStore from '@/store/modules/menu'
  import { message } from 'ant-design-vue'
  import { computed } from 'vue'
  defineOptions({
    name: 'MenuTable',
  })
  const emit = defineEmits<{
    (e: 'edit', value: MenuItem): void
  }>()
  const menuStore = useMenuStore()
  const columns: TableColumns<MenuItem> = [
    {
      dataIndex: 'name',
      title: '路由名称',
    },
    {
      dataIndex: 'path',
      title: '路由地址',
    },
    {
      dataIndex: 'title',
      title: '菜单名称',
    },
    {
      dataIndex: 'icon',
      title: '菜单图标',
      slot: ({ record }) => (
        <span style={{ 'font-size': '20px' }}>
          <svg-icon name={record.icon}></svg-icon>
        </span>
      ),
    },
    {
      dataIndex: 'sort',
      title: '排序',
    },
    {
      dataIndex: 'redirect',
      title: '重定向',
    },
    {
      dataIndex: 'isCache',
      title: '是否缓存',
      slot: ({ record }) => (
        <a-switch
          checked={record.isCache}
          onChange={(v: boolean) =>
            handleSwitchChange(record.id, { prop: 'isCache', value: v })
          }
        />
      ),
    },
    {
      dataIndex: 'hideInMenu',
      title: '是否隐藏',
      slot: ({ record }) => (
        <a-switch
          checked={record.hideInMenu}
          onChange={(v: boolean) =>
            handleSwitchChange(record.id, { prop: 'hideInMenu', value: v })
          }
        />
      ),
    },
    {
      dataIndex: 'alwayShowChildInMenu',
      title: '是否显示',
      slot: ({ record }) => (
        <a-switch
          checked={record.alwayShowChildInMenu}
          onChange={(v: boolean) =>
            handleSwitchChange(record.id, {
              prop: 'alwayShowChildInMenu',
              value: v,
            })
          }
        />
      ),
    },
    {
      dataIndex: 'hideInTags',
      title: '是否在标签栏隐藏',
      slot: ({ record }) => (
        <a-switch
          checked={record.hideInTags}
          onChange={(v: boolean) =>
            handleSwitchChange(record.id, { prop: 'hideInTags', value: v })
          }
        />
      ),
    },
    {
      dataIndex: 'affixInTags',
      title: '是否固定子啊标签栏',
      slot: ({ record }) => (
        <a-switch
          checked={record.affixInTags}
          onChange={(v: boolean) =>
            handleSwitchChange(record.id, { prop: 'affixInTags', value: v })
          }
        />
      ),
    },
    {
      dataIndex: 'action',
      title: '操作',
      slot: ({ record }) => (
        <a-space>
          <a-button type="primary" size="small" onClick={() => onEdit(record)}>
            编辑
          </a-button>

          <a-popconfirm
            title="确定要删除这个菜单?"
            ok-text="确定"
            cancel-text="取消"
            onConfirm={() => onDelete(record.id)}
          >
            <a-button type="danger" size="small">
              删除
            </a-button>
          </a-popconfirm>
        </a-space>
      ),
    },
  ]
  const data = computed(() => menuStore.menusTree)

  function handleSwitchChange(
    id: string,
    { prop, value }: { prop: keyof MenuItem; value: boolean | string | number },
  ) {
    patchMenu(id, { prop, value }).then(() => {
      menuStore.getMenuList()
    })
  }
  function onEdit(record: MenuItem) {
    console.log('data', data.value)
    emit('edit', record)
  }
  function onDelete(id: string) {
    const key = 'updatable'
    message.loading({ content: '正在删除...', key })
    deleteMenu(id).then(() => {
      message.success({ content: '删除成功', key, duration: 2 })
      menuStore.getMenuList()
    })
  }
</script>

<template>
  <BasicTable :columns="columns" :data="data" />
</template>
<style lang="less" scoped></style>
