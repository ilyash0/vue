<script>
export default {
  name: "NewAdView"
}
</script>

<script setup>
import {inject, ref} from "vue";
import apiFetch from "@/helpers/apiFetch";
import InvalidFeedback from "@/components/InvalidFeedback.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const token = inject("token")
const form = ref({
  data: {
    title: '',
    description: '',
    price: '',
    image: null,
    characteristics: [
      {
        "title": "",
        "type": "checkbox",
        "checkbox_values": [""]
      }
    ]
  },
  errors: {},
  isSending: false,
})

const addCharacteristic = () => {
  form.value.data.characteristics.push({
    title: '',
    type: 'checkbox',
    checkbox_values: [''],
    number_value: ''
  })
}

const addCheckboxValue = (ch) => {
  ch.checkbox_values.push('')
}

const deleteCheckboxValue = (ch, index) => {
  ch.checkbox_values.splice(index, 1)
}

const deleteCharacteristic = (index) => {
  form.value.data.characteristics.splice(index, 1)
}

const setImage = (event) => {
  const file = event?.target?.files?.[0] ?? null
  form.value.data.image = file
}

const sendForm = async () => {
  if (form.value.isSending) return
  form.value.errors = {}
  form.value.isSending = true

  form.value.isSending = true
  form.value.errors = {}
  const formData = new FromData()
  formData.append('title', formData.value.data.title)
  formData.append('description', formData.value.data.description)
  formData.append('price', formData.value.data.price)
  formData.append('image', formData.value.data.image)

  for (const key in form.value.data.characteristics) {
    formData.append(`characteristics[${key}][title]`, form.value.data.characteristics[key].title)
    formData.append(`characteristics[${key}][type]`, form.value.data.characteristics[key].type)

    if (form.value.data.characteristics[key].type === 'number') {
      formData.append(`characteristics[${key}][number_value]`, form.value.data.characteristics[key].number_value)
    } else {
      form.value.data.characteristics[key].checkbox_values.forEach((value, index) => {
        formData.append(`characteristics[${key}][checkbox_values][${index}]`, form.value.data.characteristics[key].checkbox_values[index])
      })
    }
  }

  const result = await apiFetch('post', '/products', formData, token.value)
  if (result.errors) {
    form.value.errors = result.errors
  } else {
    await router.push('/my')
  }
  form.value.isSending = false
}
</script>

<template>
  <div class="container mt-5" style="max-width: 700px;">
    <h2 class="mb-4">Создать объявление</h2>

    <form @submit.prevent="sendForm" novalidate>
      <div class="mb-3">
        <label>Название</label>
        <input type="text" class="form-control" required
               :class="{'is-invalid': form.errors?.title}" v-model="form.data.title">
        <InvalidFeedback :errors="form.errors?.title"/>
      </div>

      <div class="mb-3">
        <label>Описание</label>
        <textarea class="form-control" rows="3" required
                  :class="{'is-invalid': form.errors?.description}" v-model="form.data.description"></textarea>
        <InvalidFeedback :errors="form.errors?.description"/>
      </div>

      <div class="mb-3">
        <label>Цена</label>
        <input type="number" class="form-control" required
               :class="{'is-invalid': form.errors?.price}" v-model="form.data.price">
        <InvalidFeedback :errors="form.errors?.price"/>
      </div>

      <div class="mb-3">
        <label>Изображение</label>
        <input type="file" class="form-control"
               :class="{'is-invalid': form.errors?.image}" @change="setImage">
        <InvalidFeedback :errors="form.errors?.image"/>
      </div>

      <h3>Характеристики</h3>

      <div class="row flex-nowrap" v-for="(ch, chIndex) in form.data.characteristics" :key="chIndex">
        <div class="mb-3 col-lg-4">
          <label>Тип</label>
          <select class="form-control" v-model="ch.type">
            <option value="checkbox">Чекбокс</option>
            <option value="number">Число</option>
          </select>
        </div>

        <div class="mb-3 col-lg-4">
          <label>Название</label>
          <input type="text"
                 class="form-control"
                 :class="{ 'is-invalid': Boolean(form.errors?.characteristics?.[chIndex]?.title) }"
                 v-model="ch.title">
          <InvalidFeedback :errors="form.errors?.characteristics?.[chIndex]?.title"/>
        </div>

        <div class="mb-3 col-lg-4" v-if="ch.type === 'checkbox'">
          <label>Значения</label>

          <div class="mb-3" v-for="(value, index) in ch.checkbox_values" :key="index">
            <input type="text"
                   class="form-control"
                   :class="{ 'is-invalid': Boolean(form.errors?.characteristics?.[chIndex]?.checkbox_values?.[index]) }"
                   v-model="ch.checkbox_values[index]">
            <InvalidFeedback :errors="form.errors?.characteristics?.[chIndex]?.checkbox_values?.[index]"/>
            <a href="#" v-if="ch.checkbox_values.length > 1" @click.prevent="deleteCheckboxValue(ch, index)"><small>Удалить</small></a>
          </div>

          <button type="button" class="btn btn-primary" @click.prevent="addCheckboxValue(ch)">Добавить значение</button>
        </div>

        <div class="mb-3 col-lg-4" v-if="ch.type === 'number'">
          <label>Значение</label>
          <input type="number"
                 class="form-control"
                 :class="{ 'is-invalid': Boolean(form.errors?.characteristics?.[chIndex]?.number_value) }"
                 v-model="ch.number_value">
          <InvalidFeedback :errors="form.errors?.characteristics?.[chIndex]?.number_value"/>
        </div>

        <div class="col-lg-1">
          <br>
          <a href="#" class="btn btn-sm btn-danger" @click.pevent="deleteCharacteristic(chIndex)">X</a>
        </div>
      </div>

      <div class="mt-3">
        <button type="button" class="btn btn-primary" @click="addCharacteristic()">Добавить характеристику</button>
      </div>

      <hr>

      <button type="submit" class="btn btn-success" :disabled="form.isSending">Опубликовать</button>
    </form>
  </div>
</template>

<style scoped>
/* при необходимости — стили */
</style>