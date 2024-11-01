<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import customInstance from '../axiosInstance'

const route = useRoute()
const router = useRouter()
const course = ref(null)
const id = route.params.id

const fetchCourse = async () => {
  try {
    const response = await customInstance.get(`/api/v1/courses/${id}`)
    course.value = response.data
  } catch (error) {
    console.error('Error fetching course:', error)
  }
}

const handleDelete = async () => {
  try {
    await customInstance.delete(`/api/v1/courses/${id}`)
    router.push('/')
  } catch (error) {
    console.error('Error deleting course:', error)
  }
}

const handleEdit = () => {
  router.push(`/course/edit/${id}`)
  console.log('Edit course:', course.value)
}

onMounted(() => {
  if (id) fetchCourse()
})
</script>

<template>
  <div v-if="course" class="container">
    <div class="main">
      <h2 class="coursehead">{{ course.data.title }}</h2>
      <p><strong>Description:</strong> {{ course.data.description }}</p>
      <p><strong>Weeks:</strong> {{ course.data.weeks }} weeks</p>
      <p><strong>Tuition:</strong> ${{ course.data.tuition }}</p>
      <p><strong>Minimum Skill:</strong> {{ course.data.minimumSkill }}</p>
      <p>
        <strong>Scholarship Available:</strong>
        {{ course.data.scholarshipAvailable ? 'Yes' : 'No' }}
      </p>
      <div class="thebuttons">
        <button @click="handleEdit" class="editbutton">Edit</button>
        <button @click="handleDelete" class="deletebutton">Delete</button>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.thebuttons {
  font-size: 16px;
  gap: 30px;
  margin-top: 70px;
  display: flex;
  flex-direction: row;
}

.coursehead {
  font-size: 70px;
}

.deletebutton {
  background-color: red;
  padding: 0.9rem 3.2rem;
  border: none;
  border-radius: 50px;
  color: white;
  cursor: pointer;
}

.editbutton {
  background-color: blue;
  padding: 0.9rem 3.2rem;
  border: none;
  border-radius: 50px;
  color: white;
  cursor: pointer;
}
</style>
