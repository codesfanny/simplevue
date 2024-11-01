<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import customInstance from '../axiosInstance'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const course = ref({
  data: {
    title: '',
    description: '',
    weeks: '',
    tuition: '',
    minimumSkill: '',
    scholarshipAvailable: false,
  },
})

const fetchCourse = async () => {
  try {
    const response = await customInstance.get(`/api/v1/courses/${id}`)
    course.value = response.data
  } catch (error) {
    console.error('Error fetching course:', error)
  }
}

const handleChange = e => {
  const { name, type, value, checked } = e.target
  course.value.data[name] = type === 'checkbox' ? checked : value
}

const handleSubmit = async e => {
  e.preventDefault()
  try {
    await customInstance.put(`/api/v1/courses/${id}`, course.value.data)
    router.push(`/course/${id}`)
  } catch (error) {
    console.error(
      'Error updating course:',
      error.response?.status,
      error.response?.data || error.message,
    )
  }
}

onMounted(() => {
  if (id) fetchCourse()
})
</script>

<template>
  <div class="container">
    <h2>Edit Course</h2>
    <form @submit="handleSubmit">
      <label>
        Title:
        <input type="text" name="title" v-model="course.data.title" required />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          v-model="course.data.description"
          required
        />
      </label>
      <label>
        Weeks:
        <input
          type="number"
          name="weeks"
          v-model="course.data.weeks"
          required
        />
      </label>
      <label>
        Tuition:
        <input
          type="number"
          name="tuition"
          v-model="course.data.tuition"
          required
        />
      </label>
      <label>
        Minimum Skill:
        <input
          type="text"
          name="minimumSkill"
          v-model="course.data.minimumSkill"
          required
        />
      </label>
      <label>
        Scholarship Available:
        <input
          type="checkbox"
          name="scholarshipAvailable"
          v-model="course.data.scholarshipAvailable"
        />
      </label>
      <button type="submit">Update Course</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 1280px;
}

.container h2 {
  font-size: 70px;
}

form {
  width: 60%;
}

input {
  padding: 10px;
  border-radius: 50px;
}

textarea {
  border-radius: 50px;
  padding: 15px;
}

label {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
