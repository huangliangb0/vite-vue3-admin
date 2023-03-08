import dayjs, { Dayjs } from 'dayjs'

// 今天之前的时间不可选择
export const disabledBefore = (current: Dayjs) => {
  if (!current) {
    return false
  }

  return dayjs() < current
}

// 今天以后的时间不可选择
export const disabledFeature = (current: Dayjs) => {
  if (!current) {
    return false
  }

  return dayjs() > current
}

// 结束时间不能大于开始时间
export const disabledBeginDate =
  (beginDate?: Dayjs | string) => (current: Dayjs) => {
    if (!beginDate || !current) {
      return false
    }

    if (typeof beginDate === 'string') {
      beginDate = dayjs(beginDate)
    }

    return beginDate > current
  }

// 开始时间不能大于结束时间
export const disabledEndDate =
  (endDate?: Dayjs | string) => (current: Dayjs) => {
    if (!endDate || !current) {
      return false
    }

    if (typeof endDate === 'string') {
      endDate = dayjs(endDate)
    }

    return endDate < current
  }
