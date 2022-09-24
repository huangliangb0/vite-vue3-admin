<script lang="tsx">
  import { Item } from 'ant-design-vue/lib/menu'
  import { computed, defineComponent, PropType, reactive, ref } from 'vue'
  export default defineComponent({
    name: 'InputSelect',
    inheritAttrs: false,
    props: {
      value: String,
      options: {
        type: Array as PropType<OptionsType>,
        default: () => [],
      },
      onChange: {
        type: Function as PropType<(arg: String) => void>,
      },
    },
    emits: ['update:value'],
    setup(props, { emit, attrs }) {
      const visible = ref(false)

      const options = computed(() => {
        const { value, options = [] } = props
        if (!value) {
          return options
        }
        const arr = options.filter((item) => {
          return item.value.toLowerCase().startsWith(value.toLowerCase())
        })
        return arr.length === 0 ? options : arr
      })

      const handleInputFocus = () => {
        visible.value = true
      }
      const handleInputBlur = () => {
        visible.value = false
      }
      const handleChange = (v: string) => {
        props.onChange && props.onChange(v)
        emit('update:value', v)
      }
      const handleSelect = (e: Event, v: string) => {
        e.stopPropagation()
        props.onChange && props.onChange(v)
        emit('update:value', v)
      }
      return () => (
        <a-dropdown
          visible={visible.value}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          v-slots={{
            overlay: () => (
              <div class="select-box">
                {options.value.length > 0 ? (
                  <ul class="select-list">
                    {options.value.map((item) => (
                      <li
                        key={item.value}
                        class={{
                          'ant-select-item ant-select-item-option': true,
                          disabled: !!item.disabled,
                          active: item.value === props.value,
                        }}
                        onMousedown={(e) =>
                          !item.disabled
                            ? handleSelect(e, item.value)
                            : undefined
                        }
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>
                    <a-empty></a-empty>
                    {props.value}
                  </div>
                )}
              </div>
            ),
          }}
        >
          <a-input
            value={props.value}
            onChange={(e: Event) =>
              handleChange((e.target as HTMLInputElement).value)
            }
            {...attrs}
          ></a-input>
        </a-dropdown>
      )
    },
  })
</script>

<style lang="less" scoped>
  // .my--input-select {
  //   position: relative;

  //   .ant-select-dropdown {
  //     position: absolute;
  //     top: 100%;
  //     left: 0;
  //     right: 0;
  //     z-index: 999;
  //   }
  // }
  .select-box {
    color: rgba(0, 0, 0, 0.85);
    line-height: 1.5715;
    box-sizing: border-box;
    padding: 4px 0;
    overflow: hidden;
    font-size: 14px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
      0 9px 28px 8px rgb(0 0 0 / 5%);
  }
  .select-list {
    padding: 0;
    margin: 0;
    list-style: none;
    max-height: 254px;
    overflow-y: auto;
    li {
      &:hover {
        background-color: #fafafa;
      }
      &.disabled {
        color: @disabled-color;
        // cursor: no-drop;
        cursor: not-allowed;
      }
      &.active {
        font-weight: 600;
        background-color: #e3f4fc;
      }
    }
  }
</style>
