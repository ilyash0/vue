<script>
import {RouterLink} from "vue-router";

export default {
  name: "RegistrationView",
  components: {RouterLink}
}
</script>

<script setup>
import {ref} from "vue";
import apiFetch from "@/helpers/apiFetch";
import InvalidFeedback from "@/components/InvalidFeedback.vue";

const form = ref({
  data: {
    name: '',
    email: '',
    password: '',
  },
  errors: {},
  isSending: false,
})

const sendForm = async () => {
  if (form.value.isSending) return;
  form.value.errors = {}

  form.value.isSending = true;

  const result = await apiFetch('post', '/registration', form.value.data)
  if (result.errors) {
    form.value.errors = result.errors
  }
  form.value.isSending = false
}
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow p-4" style="max-width: 450px; width: 100%;">
      <h4 class="mb-4 text-center">Регистрация</h4>
      <form @submit.prevent="sendForm()" novalidate>
        <div class="mb-3">
          <label>Имя</label>
          <input type="text" v-model="form.data.name" class="form-control" :class="{'is-invalid': form.errors?.name}">
          <InvalidFeedback :errors="form.errors?.name"/>
        </div>
        <div class="mb-3">
          <label>Email</label>
          <input type="email" v-model="form.data.email" class="form-control"
                 :class="{'is-invalid': form.errors?.email}">
          <InvalidFeedback :errors="form.errors?.email"/>
        </div>
        <div class="mb-3">
          <label>Пароль</label>
          <input type="password" v-model="form.data.password" class="form-control"
                 :class="{'is-invalid': form.errors?.password}">
          <InvalidFeedback :errors="form.errors?.password"/>
        </div>
        <button type="submit" class="btn btn-success w-100">Зарегистрироваться</button>
        <div class="text-center mt-3">
          <RouterLink to="/login">Уже есть аккаунт? Войти</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
