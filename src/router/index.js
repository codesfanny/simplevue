import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import CourseDetails from '../components/CourseDetails.vue'
import EditCourse from '../components/EditCourse.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/course/:id',
      name: 'course-details',
      component: CourseDetails,
    },
    {
      path: '/course/edit/:id',
      name: 'edit-course',
      component: EditCourse,
    },
  ],
})

export default router
