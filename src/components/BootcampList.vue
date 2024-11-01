<script setup>
import { ref } from 'vue'
import { useCourseData } from '../utils/hooks/useCourseData'
import deleteCourseFromAPI from '@/utils/hooks/useDeleteCourse'
import Bootcamp from './Bootcamp.vue'
import { useRouter } from 'vue-router'

const { courses, errorMessage } = useCourseData()
const router = useRouter()

const goToCourse = id => {
  router.push(`/course/${id}`)
}

const deleteCourse = id => {
  let { status, errorMessage } = deleteCourseFromAPI(id)
  status = ref(status)
  errorMessage = ref(errorMessage)

  if (status === 'failure') {
    console.error('error deleting course', errorMessage)
  } else {
    alert('Your course deleted successfuly')
  }
}
</script>

<template>
  <div class="container">
    <h1 class="bootcamphead">Our Courses</h1>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div class="grid" v-if="courses.data && courses.data.length > 0">
      <div v-for="course in courses.data" :key="course._id" class="card">
        <Bootcamp :course="course" />
        <div class="deletebtns">
          <button @click="goToCourse(course._id)">View course</button>
          <button @click="deleteCourse(course._id)" class="deletebtn">
            Delete course
          </button>
        </div>
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
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 30px 60px;
  min-height: 550px;
}

.bootcamphead {
  margin-bottom: 60px;
}

.deletebtns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 60px 0px;
}

button {
  border-radius: 50px;
  border: 1px solid transparent;
  padding: 0.9em 3.7em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  color: white;
  cursor: pointer;
  transition: border-color 0.25s;
}

.deletebtn {
  background-color: red;
}

button:hover {
  background-color: #3b3b3b;
}

.deletebtn:hover {
  background-color: rgba(204, 2, 2, 0.815);
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
