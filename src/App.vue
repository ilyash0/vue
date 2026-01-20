<script setup>
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <RouterLink to="/" class="navbar-brand">Объявления</RouterLink>
    <div class="ms-auto">
      <RouterLink to="/login" class="btn btn-outline-light me-2">Войти</RouterLink>
      <RouterLink to="/registration" class="btn btn-outline-light">Регистрация</RouterLink>
    </div>
  </nav>

  <RouterView/>
</template>
