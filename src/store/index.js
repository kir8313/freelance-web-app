import {createStore} from "vuex";
import url from "@/config/url"

export default createStore({
  state: {
    allTasks: [],
    currentTask: '',
  },
  getters: {
    tasks(state) {
      return state.allTasks;
    },

    currentTask(state) {
      return state.currentTask;
    },

    openedTasks(state) {
      return state.allTasks.filter(task => task.status === "Активен").length;
    }
  },
  mutations: {
    pushNewTask(state, task) {
     state.allTasks.push(task);
    },

    parseTasks(state, tasks) {
      state.allTasks = Object.keys(tasks).map(key => ({
        key: key,
        ...tasks[key]
      }))
    },

    changeTasks(state, tasks) {
      return state.allTasks = tasks;
    },

    currentTask(state, id) {
      return state.currentTask = state.allTasks[state.allTasks.findIndex(task => task.id === id)]
    },

    changeStatus(state, status) {
      return state.currentTask.status = status;
    }
  },
  actions: {
    async getTasks(ctx) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Данные не получены')
        }
        const result = await response.json();
        if (result !== null) {
          ctx.commit('parseTasks', result);
        } else {
          console.log('Данные = null')
        }
      } catch (e) {
        console.error('Ошибка', e);
      }
    },

    async sendTask(ctx, task) {
      await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      ctx.commit('pushNewTask', task);
    },

    async sendAllTasks(ctx, tasks) {
      await fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tasks),
      });
    },

    async changeStatus(ctx, status) {
      ctx.commit('changeStatus', status);
      ctx.dispatch('sendAllTasks', ctx.getters.tasks)
    }
  },
});
