<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CustomButton from '../components/CustomButton.vue'
import BootcampList from '../components/BootcampList.vue'

const router = useRouter()
const isAuthenticated = ref(!!localStorage.getItem('authToken'))

const handleLogout = () => {
  localStorage.removeItem('authToken')
  router.push('/login')
}
</script>

<template>
  <div class="homecontainer">
    <div v-if="!isAuthenticated">
      <div class="main">
        <h1 class="pagetitle">Welcome! Na Project</h1>
        <div class="loginsignup">
          <div>
            <CustomButton label="Login" @click="router.push('/login')" />
          </div>
          <div>
            <CustomButton
              label="Sign Up"
              :style="{ backgroundColor: '#fff', color: '#007bff' }"
              @click="router.push('/signup')"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="submain">
      <BootcampList />
      <button @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<style scoped>
.homecontainer {
  display: block;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  width: 100%;
  min-width: 1280px;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.submain {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.loginsignup {
  display: flex;
  gap: 20px;
}

.pagetitle {
  font-size: 70px;
}

button {
  border-radius: 50px;
  border: 1px solid transparent;
  padding: 0.9em 3.7em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #b4b4b4;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
