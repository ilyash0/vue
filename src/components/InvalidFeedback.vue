<script setup>
defineProps({
  error: Object,
})
</script>

<template>
  <span class="invalid-feedback" v-if="error">{{error[0]}}</span>
</template>