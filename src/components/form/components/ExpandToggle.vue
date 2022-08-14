<script lang="tsx">
  import { defineComponent } from 'vue'
  import { UpOutlined, DownOutlined } from '@ant-design/icons-vue'
  export default defineComponent({
    name: 'ExpandToggle',
    props: {
      isExpand: Boolean,
    },
    setup(props) {
      return () => (
        <a-button type="link">
          {!props.isExpand ? (
            <>
              展开<UpOutlined></UpOutlined>
            </>
          ) : (
            <>
              收缩<DownOutlined></DownOutlined>
            </>
          )}
        </a-button>
      )
    },
  })
</script>
