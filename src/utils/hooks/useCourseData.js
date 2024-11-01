import { ref, onMounted } from 'vue'
import customInstance from '../../axiosInstance'

export function useCourseData() {
  const courses = ref({ data: [] })
  const errorMessage = null

  const fetchCourses = async () => {
    try {
      const response = await customInstance.get('/api/v1/courses')
      courses.value = response.data
    } catch (error) {
      errorMessage.value = error.response || error.message
    }
  }

  onMounted(fetchCourses)

  return { courses, errorMessage }
}
