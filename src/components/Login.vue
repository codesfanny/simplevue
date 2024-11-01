<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import customInstance from '../axiosInstance'

const router = useRouter()
const form = ref({
  email: '',
  password: '',
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  let valid = true

  if (!form.value.email) {
    errors.value.email = 'Email is required.'
    valid = false
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Invalid email address.'
    valid = false
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required.'
    valid = false
  }

  return valid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    const response = await customInstance.post('/api/v1/auth/login', form.value)
    localStorage.setItem('authToken', response.data.token)
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
    alert('Login failed. Please check your credentials.')
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Email</label>
        <input type="email" v-model="form.email" />
        <span v-if="errors.email">{{ errors.email }}</span>
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="form.password" />
        <span v-if="errors.password">{{ errors.password }}</span>
      </div>
      <button type="submit">Submit</button>
    </form>

    <RouterLink to="/Signup">Signup</RouterLink>
  </div>
</template>

<style scoped></style>
