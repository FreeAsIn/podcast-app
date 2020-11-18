<template>
  <div class="home">
    <template v-if="!inRoom">
      <h3>Welcome!</h3>
      <p>Enter your room ID below if joining, otherwise hit start meeting!</p>
      <input type="text" v-model="room">
      <button @click="join">Join / Start</button>
    </template>

    <template v-else>
      <h3>Welcome to {{room}}</h3>
      <shared-timer :peer="peerRef"></shared-timer>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import joinRoom from '../utils/joinRoom'
import peer from '../utils/peer'
export default defineComponent({
  setup(props, {}) {
    const colors = ['purple', 'orange', 'black', 'green', 'blue', 'red', 'yellow'],
      animals = ['monkey', 'whale', 'bird', 'gorilla', 'turtle', 'dog', 'cat', 'elephant'];

    const color = colors[Math.floor(Math.random() * colors.length)],
      animal = animals[Math.floor(Math.random() * animals.length)];
    const room = ref(`${color.substr(0, 1).toUpperCase()}${color.substr(1)} ${animal.substr(0, 1).toUpperCase()}${animal.substr(1)}`);

    const inRoom = ref(false);
    const peerRef = ref(peer);

    function onConnected() {
      inRoom.value = true;
    }


    function join() {
      console.log('JOIN')
      joinRoom(room.value.toLowerCase(), onConnected);
    }

    return {
      // data
      peerRef,
      inRoom,
      room,
      // methods
      join,
    };
  },
});
</script>
