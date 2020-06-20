<template>
  <div>
    <b-alert variant="info" show class="mt-5">{{ message }}</b-alert>
    <br>
  </div>
</template>

<script>
export default {
  props: ['message'],
};
</script>
