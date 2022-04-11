<template>
  <div>
    <div class="content">{{ todo.title }}</div>
    <div class="buttons">
      <button @click="toggleDone"> Done</button>
      <button @click="removeTask" class="delete">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo : Object,
  },
  methods: {
    toggleDone() {
      // this.$store.dispatch('TOGGLE_TASK', this.todo)
    },
    removeTask() {
      console.log(" here to start deleting todo : "  + this.todo);
      console.log(" id : "  + this.todo.to_do_id);

      this.$store.dispatch('DeleteToDOs', { id: this.todo.to_do_id})
    },
  },
}
</script>

<style></style>
