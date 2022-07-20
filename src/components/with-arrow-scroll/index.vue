<script lang="tsx">
import { defineComponent, useSlots } from "vue";
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    name: 'WithArrowScroll',
    setup() {
        const slot = useSlots()
        return () => <div class="with-arrow-scroll">
            <span class="left-arrow arrow">
                <LeftOutlined class="icon"/>
            </span>
            <div class="scroll-wrapper">
                <div class="scroll-content">
                    {slot.default!()}
                </div>
            </div>
            <span class="right-arrow arrow">
                <RightOutlined class="icon"/>
            </span>
        </div>
    }
})
</script>

<style lang="less" scoped>
.with-arrow-scroll {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    .arrow {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 20px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .icon {
            font-size: 12px;
        }
        &.left-arrow {
            left: 0;
        }
        &.right-arrow {
            right: 0;
        }
    }
    .scroll-wrapper {
        flex: 1;
        width: 100%;
        overflow: hidden;
    }
}
</style>