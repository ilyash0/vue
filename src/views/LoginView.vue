<script>
import {RouterLink} from "vue-router";

export default {
  name: "LoginView",
  components: {RouterLink}
}
</script>

<script setup>
import {inject, ref} from 'vue';
import apiFetch from "@/helpers/apiFetch.js";
import InvalidFeedback from "@/components/InvalidFeedback.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const form = ref({
  data:{
    email:'',
    password:'',
  },
  errors:{},
  isSending: false,
})

const updateToken = inject('updateToken')

const sendForm = async () =>{
  if (form.value.isSending) return;
  form.value.errors = {}

  form.value.isSending = true

  const result = await apiFetch('post', '/authorization', form.value.data)
  if (result.errors) {
    form.value.errors = result.errors
  } else {
    updateToken(result.token)
    await router.push('/')
  }
  form.value.isSending = false
}
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
      <h4 class="mb-4 text-center">Вход</h4>
      <form @submit.prevent="sendForm()" novalidate>
        <div class="mb-3">
          <label>Email</label>
          <input type="email" v-model="form.data.email" class="form-control" :class="{'is-invalid': form.errors?.email}">
          <InvalidFeedback :errors="form.errors?.email"/>
        </div>
        <div class="mb-3">
          <label>Пароль</label>
          <input type="password" v-model="form.data.password" class="form-control"
                 :class="{'is-invalid': form.errors?.password}">
          <InvalidFeedback :errors="form.errors?.password"/>
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