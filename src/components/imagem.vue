<script setup>
import { ref } from 'vue'
let props = defineProps({
  img: ref(''),
  width: ref('') ,
  height: ref('')
})

</script>

<template>
    <img :src='props.img' alt="Carregou não" :width="props.width" :height="props.height">
</template> 

<style scoped>
</style>