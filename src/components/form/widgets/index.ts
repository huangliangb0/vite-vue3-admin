import { Input, Select, DatePicker, InputNumber, Switch } from './components'

export { default as Widget } from './index.vue'

export default {
  Input,
  Select,
  DatePicker,
  InputNumber,
  RangePicker: DatePicker.RangePicker,
  Switch,
  // ... 自定义组件
}
