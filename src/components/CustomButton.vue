<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  onClick: {
    type: Function,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  style: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <button
    :class="['button', { disabled: props.disabled }]"
    :style="props.style"
    :disabled="props.disabled"
    @click="props.onClick"
  >
    {{ props.label }}
  </button>
</template>

<style scoped>
.button {
  padding: 20px 80px;
  font-size: 20px;
  border: none;
  border-radius: 50px;
  background-color: #007bff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.button:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>
