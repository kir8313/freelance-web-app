<template>
  <div class="card" v-if="task !== undefined" v-cloak>
    <h2>{{ task.title }}</h2>
    <p>Статус:
      <app-status :color="task.status">{{ task.status }}</app-status>
    </p>
    <p>Дедлайн: {{ task.date }}</p>
    <p>Описание: {{ task.text }}</p>
    <button class="btn" @click="changeStatus('Выполняется')">Взять в работу</button>
    <button class="btn primary" @click="changeStatus('Завершён')">Завершить</button>
    <button class="btn warning" @click="changeStatus('Отменён')">Отменить</button>
  </div>
  <div v-else>
    <p class="error">Куда лезешь на {{ id }}? Нет такой страницы :)</p>
  </div>
</template>

<script>
import {useStore} from "vuex";
import appStatus from "@/components/AppStatus";
import {onMounted, ref} from "vue";

export default {
  components: {appStatus},

  setup() {
    const store = useStore();
    const id = +window.location.pathname.split('/')[2];
    const tasks = ref('');
    const task = ref('');

    onMounted(async () => {
      await store.dispatch('getTasks')
      tasks.value = store.getters.tasks;
      store.commit('currentTask', id);
      task.value = store.getters.currentTask;
    })

    function changeStatus(status) {
      if(task.value.status !== status) {
        task.value.status = status;
        console.log('da');
        store.dispatch('changeStatus', status)
      }
    }

    return {
      task, id, changeStatus
    }
  },
}
</script>

<style scoped>
.error {
  text-align: center;
  color: #fff;
  font-size: 20px;
}
</style>
