<script setup>
import { ref, onMounted } from 'vue'
import { useCourseData } from '../utils/hooks/useCourseData'
import Bootcamp from './Bootcamp.vue'
import { useRouter } from 'vue-router'

const { courses, errorMessage } = useCourseData()
const router = useRouter()

const goToCourse = id => {
  router.push(`/course/${id}`)
}
</script>

<template>
  <div class="container">
    <h1 class="bootcamphead">Our Courses</h1>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div class="grid" v-if="courses.data.length > 0">
      <div
        v-for="course in courses.data"
        :key="course._id"
        @click="goToCourse(course._id)"
      >
        <Bootcamp :course="course" />
      </div>
    </div>
    <div v-else>No courses available.</div>
  </div>
</template>

<style scoped>
.container {
  padding: 16px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  width: 90%;
}

.grid div {
  cursor: pointer;
  text-decoration: none;
}

.bootcamphead {
  margin-bottom: 60px;
}
</style>
