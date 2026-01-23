<script setup>
defineProps({
  errors: Object,
})
</script>

<template>
  <span class="invalid-feedback" v-if="errors">{{errors[0]}}</span>
</template>