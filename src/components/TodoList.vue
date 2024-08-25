<template>
  <div>
    <h3>Todo List</h3>

    <div class="legend">
      <span>Double click to mark as completed</span>
      <span>
        <span class="incomplete-box"></span> = Incomplete
      </span>
      <span>
        <span class="complete-box"></span> = Complete
      </span>
    </div>

    <div class="todos">
        <div class="todo" 
            v-for="todo in allTodos" 
            :key="todo.id"
            @dblclick="onDblclick(todo)"
            :class="{'is-complete' : todo.completed}"
        >
            {{ todo.title }} 

            <!-- <i class="fas fa-trash-alt" @click="onClick(todo.id)"></i> -->
            <!-- 코드가 간략할 경우 한 줄로 해결 -->
            <i class="fas fa-trash-alt" @click="deleteTodo(todo.id)"></i>

        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'TodoList',
    // methods: mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),
    methods: {
        ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),
        // onClick(id) {
        //     this.deleteTodo(id)
        // },
        onDblclick(todo) {
          this.updateTodo({
            id: todo.id,
            title: todo.title,
            completed: !todo.completed
          })
        }

    },
    computed: mapGetters(['allTodos', ]), // Deriving data from existing state !!!
    created() { // Fetching initial data via API calls !!! (and saving to state) 
        this.fetchTodos()
    },

}
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  /* Parent */
  position: relative; 
}

i {
  /* Child */
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}

.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}
.is-complete {
  background: #35495e;
  color: #fff;
}

@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>