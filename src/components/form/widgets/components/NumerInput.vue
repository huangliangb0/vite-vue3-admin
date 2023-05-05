<script lang="ts" setup>
  import { isNumber } from 'lodash-es'

  defineOptions({
    name: 'NumberInput',
  })
  const emit = defineEmits<{
    (e: 'update:value', v: string | number): void
  }>()
  const props = defineProps({
    type: {
      type: String as PropType<'default' | 'count' | 'amount'>,
      default: 'default',
    },
    max: Number,
    value: [String, Number],
    onChange: Function as PropType<(e: any) => void>,
    onBlur: Function as PropType<(e: any) => void>,
    onFocus: Function as PropType<(e: any) => void>,
  })

  const isBlur = ref(false)

  const formatter = new Intl.NumberFormat()
  const v = ref<number | string>()

  const text = computed(() => {
    if (
      props.value === '' ||
      props.value === undefined ||
      props.type === 'default' ||
      isBlur.value === false
    ) {
      return props.value
    }

    return formatter.format(+props.value)
  })

  const onChange = (e: any) => {
    let value = e.target.value

    if (value) {
      if (props.type === 'default') {
        value = value.replace(/[^\d]/g, '')
      } else if (props.type === 'count') {
        value = value.replace(/[^\d]/g, '')
        value = Number(value)
      } else if (props.type === 'amount') {
        value = value
          .replace(/[^\d.]/g, '')
          .replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
        // value = Number(value).
      }

      if (
        props.type !== 'default' &&
        isNumber(props.max) &&
        Number(value) > props.max
      ) {
        value = props.max
      }
    }
    v.value = value

    emit('update:value', value)
    props.onChange?.(value)
  }
  const onFocus = (e: any) => {
    isBlur.value = false
    props.onFocus?.(e)
  }

  const onBlur = (e: any) => {
    isBlur.value = true
    props.onFocus?.(e)

    if (v.value && props.type !== 'default') {
      const value = Number(v.value)
      emit('update:value', value)
      props.onChange?.(value)
    }
  }
</script>

<template>
  <a-input
    :value="text"
    @change="onChange"
    @blur="onBlur"
    @focus="onFocus"
    v-bind="$attrs"
  />
</template>
<style lang="less" scoped></style>
