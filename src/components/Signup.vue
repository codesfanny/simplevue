<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import customInstance from '../axiosInstance'

const router = useRouter()
const form = ref({
  name: '',
  email: '',
  password: '',
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  let valid = true

  if (!form.value.name) {
    errors.value.name = 'Name is required.'
    valid = false
  }

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
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters.'
    valid = false
  }

  return valid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    const response = await customInstance.post(
      '/api/v1/auth/register',
      form.value,
    )
    alert('Account Created Successfully')
    router.push('/')
  } catch (error) {
    console.error('Error response:', error.response?.data || error.message)
    alert(error.response?.data?.message || 'Signup failed. Please try again.')
  }
}
</script>

<template>
  <div>
    <h1>Signup</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Username</label>
        <input type="text" v-model="form.name" />
        <span v-if="errors.name">{{ errors.name }}</span>
      </div>
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
  </div>
</template>

<style scoped></style>
