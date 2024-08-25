<template>
  <div>
    <span>Filter Todos : </span>

    <!-- <select @change="onChange"> -->
    <!-- 코드가 간략할 경우 한 줄로 해결, $event : methods 에서 사용하는 e(vent) 를 대체 -->
    <select @change="filterTodos($event)">
      <option value="30">30</option>
      <option value="20">20</option>
      <option value="10">10</option>
      <option value="5">5</option>
    </select>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'FilterTodos',
    // methods: {
    //     ...mapActions(['filterTodos']),
    //     onChange(e) {
    //         this.filterTodos(e)
    //     },
    // },
    methods: mapActions(['filterTodos'])
}
</script>

<style scoped>
select {
  margin-top: 20px;
  padding: 6px;
  border: #41b883 1px solid;
}
span {
    font-size: 1.2rem;
    font-weight: 600;
}
</style>