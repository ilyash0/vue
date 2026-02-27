<script>
export default {
  name: "MyAdView"
}
</script>

<script setup>
import {inject, onMounted, ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";

const token = inject('token')
const products = ref([])
const isLoaded = ref(false)

const updateProducts = async () => {
  const result = await apiFetch('get', '/my-products', null, token.value)
  products.value = result.data
}

const deleteAds = async (id) => {
  await apiFetch('delete', `/products/${id}`, null, token.value)
  await updateProducts()
}

onMounted(async () => {
  await updateProducts()
  isLoaded.value = true
})
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Мои объявления</h2>
    <div class="row g-3" v-if="isLoaded">
      <div class="col-md-6" v-for="product in products">
        <div class="card h-100">
          <img :src="product.image_url" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="fw-bold">Цена: {{ product.price }} ₽</p>
            <div class="d-flex justify-content-between">
              <RouterLink :to="`/edit/${product.id}`" class="btn btn-outline-primary btn-sm">Редактировать</RouterLink>
              <button @click.prevent="deleteAds(product.id)" class="btn btn-outline-danger btn-sm">Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>