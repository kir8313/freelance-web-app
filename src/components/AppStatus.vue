<template>
  <span class="badge" :class="setColor"><slot/></span>
</template>

<script>
import {computed} from "vue";

export default {
  props: ['color'],
  setup(props) {
    const setColor = computed(() => props.color === "Выполняется" ? 'warning' : (props.color === 'Отменён') ? 'danger' : 'primary')

    return { setColor }
  }
}
</script>