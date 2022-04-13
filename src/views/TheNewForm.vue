<template>
  <div class="card">
    <h1>Создать новую задачу</h1>
    <form class="form-control" @submit.prevent="sendTask">
      <label>
        <p>Название</p>
        <input type="text" v-model="title">
      </label>
      <label>
        <p>Дата</p>
        <input type="date" v-model="date">
      </label>
      <label>
        <p>Описание</p>
        <textarea v-model="text"/>
      </label>
      <button class="btn mt-1 primary" :disabled="isValid" type="submit">Создать</button>
    </form>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import { useRouter, useRoute } from 'vue-router'

export default {
  components: [useRouter, useRoute],
  setup() {
    const title = ref('');
    const date = ref('');
    const text = ref('');
    const store = useStore();
    const router = useRouter()
    const isValid = computed(() => [title.value, date.value, text.value].includes(""))

    function sendTask() {
      store.dispatch('sendTask', {
        id: Date.now(),
        title: title.value,
        date : date.value.split('-').reverse().join("."),
        text: text.value,
        status: Date.parse(date.value) < Date.now() ? 'Отменён' : 'Активен',
      })

      title.value = date.value = text.value = "";
      router.push('/all')
    }

    return {
      title, date, text, isValid, sendTask
    }
  }
}
</script>