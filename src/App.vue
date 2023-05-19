<template>
  <v-app>
    <v-main>
      <TodoList />
    </v-main>
  </v-app>
</template>

<script>

import TodoList from './components/Todo-list.vue';


export default {

  name: 'App',

  components: {
    TodoList,

  },

  data: () => ({
    //
  }),
}
</script>
