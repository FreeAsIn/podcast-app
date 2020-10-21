<template>
  <div class="home">
    <h3>Welcome!</h3>
    <p>Enter your room ID below if joining, otherwise hit start meeting!</p>
    <input type="text" v-model="room">
    <button @click="join">Join / Start</button>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import joinRoom from '../utils/joinRoom'
export default defineComponent({
  setup(props, {}) {
    const colors = ['purple', 'orange', 'black', 'green', 'blue', 'red', 'yellow'],
      animals = ['monkey', 'whale', 'bird', 'gorilla', 'turtle', 'dog', 'cat', 'elephant'];

    const color = colors[Math.floor(Math.random() * colors.length)],
      animal = animals[Math.floor(Math.random() * animals.length)];
    const room = ref(`${color.substr(0, 1).toUpperCase()}${color.substr(1)} ${animal.substr(0, 1).toUpperCase()}${animal.substr(1)}`);

    function join() {
      console.log('JOIN')
      joinRoom(room.value.toLowerCase());
    }

    return {
      // data
      room,
      // methods
      join,
    };
  },
});
</script>
