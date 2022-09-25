import http from '@/utils/http'

export const getStudentList = () => {
  return http.get<Student.StudentsType>(
    {
      url: '/student',
    },
    {
      isDirectly: false,
    },
  )
}
