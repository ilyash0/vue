<script>
import {RouterLink} from "vue-router";

export default {
  name: "LoginView",
  components: {RouterLink}
}
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
      <h4 class="mb-4 text-center">Вход</h4>
      <form>
        <div class="mb-3">
          <label>Email</label>
          <input type="email" class="form-control" required>
        </div>
        <div class="mb-3">
          <label>Пароль</label>
          <input type="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">Войти</button>
        <div class="text-center mt-3">
          <RouterLink to="/registration">Нет аккаунта? Зарегистрироваться</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>