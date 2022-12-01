import { TableColumns } from '@/components/basic-table'
import { useTable } from '@/hook'
import { h, onMounted, ref } from 'vue'
import {
  createArticle,
  deleteArticle,
  fetchArticleList,
  updateArticle,
} from '@/server/article'
import { Button, Space } from 'ant-design-vue'

interface props {
  openEditFormModal: (formState: Recordable<any>) => void
}

const useArticleTable = ({ openEditFormModal }: props) => {
  /* 常量值 */
  const columns: TableColumns<Article.ArticleItem> = [
    {
      title: '文章标题',
      dataIndex: 'title',
    },
    {
      title: '文章内容',
      dataIndex: 'content',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
    {
      title: '操作',
      dataIndex: 'updateTime',
      slot: ({ record }) =>
        h(Space, {}, [
          h(
            Button,
            { type: 'primary', onClick: () => openEditFormModal(record) },
            '编辑',
          ),
          h(Button, { onClick: () => onDelete(record.id) }, '删除'),
        ]),
    },
  ]

  /* state状态值 ref reactive computed*/

  const data = ref<Article.ArticleList>([])

  /* 钩子函数 && watch */

  onMounted(() => {
    getList()
  })

  /******************* method *******************/

  // 获取文章
  const getList = () => {
    fetchArticleList()
      .then((ret) => {
        console.log(ret)
        data.value = ret
      })
      .finally(() => {
        done()
      })
  }

  // 添加文章
  const onCreate = async (
    data: Pick<Article.ArticleItem, 'content' | 'title'>,
  ) => {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(null)
      }, 2000),
    )
    return createArticle(data).then(() => {
      getList()
    })
  }

  // 更新文章
  const onUpdate = async (
    id: Article.ArticleItem['id'],
    data: Pick<Article.ArticleItem, 'content' | 'title'>,
  ) => {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(null)
      }, 2000),
    )
    return updateArticle(id, data).then(() => {
      getList()
    })
  }

  // 删除文章
  const onDelete = (id: Article.ArticleItem['id']) => {
    return deleteArticle(id).then(() => {
      getList()
    })
  }

  const { Table, done } = useTable({ columns, data })

  return { onCreate, onUpdate, ArticleTable: Table }
}

export default useArticleTable
