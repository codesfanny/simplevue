<script setup>
const props = defineProps({
  course: {
    type: Object,
    required: true,
    validator: course => {
      return (
        typeof course.title === 'string' &&
        (typeof course.description === 'string' ||
          course.description === undefined) &&
        (typeof course.weeks === 'string' || course.weeks === undefined) &&
        (typeof course.tuition === 'number' || course.tuition === undefined) &&
        (typeof course.minimumSkill === 'string' ||
          course.minimumSkill === undefined) &&
        (typeof course.scholarshipAvailable === 'boolean' ||
          course.scholarshipAvailable === undefined) &&
        course.bootcamp &&
        typeof course.bootcamp.name === 'string' &&
        course.bootcamp &&
        (typeof course.bootcamp.description === 'string' ||
          course.bootcamp.description === undefined)
      )
    },
  },
})
</script>

<template>
  <div class="container">
    <div class="card">
      <h2 class="title">{{ course.title }}</h2>
      <p class="description">
        Description:
        {{ course.description || 'N/A' }}
      </p>
      <p class="description">
        Weeks:
        {{ course.weeks || 'N/A' }} weeks
      </p>
      <p class="description">Tuition: ${{ course.tuition || 0 }}</p>
      <p class="description">
        Minimum Skill:
        {{ course.minimumSkill || 'N/A' }}
      </p>
      <p :class="course.scholarshipAvailable ? 'available' : 'unavailable'">
        Scholarship Available:
        {{ course.scholarshipAvailable ? 'Yes' : 'No' }}
      </p>
      <div class="bootcampInfo">
        <h3 class="bootcampTitle">Bootcamp Info</h3>
        <p class="description">
          Bootcamp:
          {{ course.bootcamp?.name || 'N/A' }}
        </p>
        <p class="description">
          Bootcamp Description:
          {{ course.bootcamp?.description || 'N/A' }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 30px 60px;
  min-height: 550px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #3b82f6;
}

.description,
.details {
  color: #141414;
  margin-bottom: 8px;
}

.available {
  color: #16a34a;
}

.unavailable {
  color: #ef4444;
}

.bootcampInfo {
  margin-top: 12px;
}

.bootcampTitle {
  font-size: 18px;
  font-weight: 600;
  color: #3b82f6;
}

.bootcampDetails {
  color: #4b5563;
}
</style>
