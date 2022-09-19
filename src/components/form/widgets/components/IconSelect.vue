<script lang="tsx">
  import { getIconNameList } from '@/assets'
  import { defineComponent, PropType, reactive, toRefs } from 'vue'
  export default defineComponent({
    name: 'IconSelect',
    inheritAttrs: false,
    props: {
      value: String,
      onChange: {
        type: Function as PropType<(arg: string) => void>,
      },
    },
    setup(props, { attrs }) {
      const icons = getIconNameList()
      return () => (
        <div class="icon--select_wrap">
          <a-select
            class="icon--select"
            dropdownClassName="icon-select-dropdown"
            dropdownRender={() => (
              <div class="icon-list">
                {icons.map((name) => (
                  <span
                    key={name}
                    class={{ 'icon-item': true, active: props.value === name }}
                    onClick={() => props.onChange!(name)}
                  >
                    <svg-icon name={name}></svg-icon>
                  </span>
                ))}
              </div>
            )}
            menuItemSelectedIcon={() => (
              <svg-icon name={props.value}></svg-icon>
            )}
            value={props.value}
            onClear={() => props.onChange!(undefined)}
            {...attrs}
          ></a-select>
          {props.value ? (
            <span class={{ 'icon-box': true }}>
              <svg-icon name={props.value}></svg-icon>
            </span>
          ) : null}
        </div>
      )
    },
  })
</script>

<style lang="less">
  .icon--select_wrap {
    width: 100%;
    display: flex;
    align-items: center;
    .icon--select {
      flex: 1;
    }
    .icon-box {
      font-size: 28px;
      color: @primary-color;
      padding: 0 12px;
      margin: 0;
      line-height: 1;
    }
  }
  .icon-select-dropdown {
    .icon-list {
      .icon-item {
        display: inline-block;
        font-size: 20px;
        padding: 6px 12px;
        border: 1px solid #f0f0f0;
        margin: 8px;
        cursor: pointer;
        &.active {
          color: @primary-color;
        }
      }
    }
  }
</style>
