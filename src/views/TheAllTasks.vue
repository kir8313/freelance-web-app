<template>
 <div v-if="tasks.length">
   <p class="count"> Всего активных задач: {{ openedTasks }}</p>
   <div class="card" v-for="task in tasks" :key="task.key">
     <h2 class="card__title">
       {{ task.title }}
       <app-status :color="task.status">{{ task.status }}</app-status>
     </h2>
     <time class="card__date">{{ task.date }}</time>
     <router-link :to="'/task/' + task.id" class="card__btn btn primary">Посмотреть</router-link>
   </div>
 </div>
  <div v-else>
    <p class="text-white">Добавьте новую задачу</p>
  </div>
</template>

<script>
import AppStatus from "@/components/AppStatus";
import {onMounted, onUpdated, ref} from "vue";
import {useStore} from "vuex";

export default {
  components: {AppStatus},
  setup() {
    const openedTasks = ref('');
    const tasks = ref('');
    const store = useStore();

    onMounted(async () => {
      await store.dispatch('getTasks');
      tasks.value = store.getters.tasks;
      openedTasks.value = store.getters.openedTasks;
      console.log(tasks.value)
    })

    onUpdated(() => {
      openedTasks.value = store.getters.openedTasks;
    })

    return {tasks, openedTasks}
  }
}
</script>

<style scoped>
.count {
  color: #fff;
  font-size: 20px;
}

.card__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card__date {
  display: block;
  margin-bottom: 10px;
}

.card__btn {
  display: inline-block;
  margin-top: 0.5em;
  font-size: 14px;
}

</style>