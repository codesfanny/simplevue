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
  <div class="container">
    <div class="signinpage">
      <h1>Login</h1>
      <form @submit.prevent="handleSubmit" class="mainform">
        <div>
          <input type="email" v-model="form.email" placeholder="Email" />
          <span v-if="errors.email">{{ errors.email }}</span>
        </div>
        <div>
          <input
            type="password"
            v-model="form.password"
            placeholder="Password"
          />
          <span v-if="errors.password">{{ errors.password }}</span>
        </div>
        <button type="submit">Submit</button>
      </form>

      <RouterLink to="/Signup">Signup</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.signinpage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 70px;
  font-weight: 700;
  color: white;
  margin-bottom: 4rem;
}

.mainform {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 600px;
  gap: 30px;
}

.mainform input {
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
}

.mainform button {
  border-radius: 50px;
  border: 1px solid transparent;
  padding: 0.9em 3.7em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #07a82a;
  cursor: pointer;
  transition: border-color 0.25s;
  margin-bottom: 30px;
}

.mainform button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.mainform button:hover:not(:disabled) {
  background-color: #45a049;
}
</style>
