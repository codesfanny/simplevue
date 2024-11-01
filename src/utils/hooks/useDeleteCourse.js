import customInstance from '@/axiosInstance'

export default function deleteCourse(id) {
  customInstance
    .delete(`/course/delete//${id}`)
    .then(() => {
      return { status: 'success', errorMessage: '' }
    })
    .catch(err => {
      return { status: 'failure', errorMessage: err.response }
    })
}
