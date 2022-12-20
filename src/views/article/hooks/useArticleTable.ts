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
import { useQueryWithPagination } from '@/hook/useAsync'

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

  const { data, loading, run, pagination, onPageChange } =
    useQueryWithPagination<Article.ArticleList>(fetchArticleList)

  /******************* method *******************/

  // 添加文章
  const onCreate = async (
    data: Pick<Article.ArticleItem, 'content' | 'title'>,
  ) => {
    return createArticle(data).then(() => {
      run()
    })
  }

  // 更新文章
  const onUpdate = async (
    id: Article.ArticleItem['id'],
    data: Pick<Article.ArticleItem, 'content' | 'title'>,
  ) => {
    return updateArticle(id, data).then(() => {
      run()
    })
  }

  // 删除文章
  const onDelete = (id: Article.ArticleItem['id']) => {
    return deleteArticle(id).then(() => {
      run()
    })
  }

  const Table = useTable({
    columns,
    data,
    loading,
  })

  return { pagination, onCreate, onUpdate, onPageChange, ArticleTable: Table }
}

export default useArticleTable
