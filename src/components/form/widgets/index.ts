import { Input, Select, DatePicker, InputNumber } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.variable.min.css'
export { default as Widget } from './index.vue'

export default {
  Input,
  Select,
  DatePicker,
  InputNumber,
  RangePicker: DatePicker.RangePicker,
  // ... 自定义组件
}
