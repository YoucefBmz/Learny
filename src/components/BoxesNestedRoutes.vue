<template>
  <div class="">
    <div class="boxes-container">
      <div class="box" v-for="doc in pageOfItems" :key="doc.title">
        <h2 class="box-title">{{ doc.title }}</h2>
        <div class="">{{ doc.Module }} & {{ doc.type }}</div>
        <a class="box-btn" target="_blank">voir le document </a>
      </div>
    </div>
    <div class="pagination-container">
      <jw-pagination :items="docs" :pageSize="6" @changePage="onChangePage">
      </jw-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "boxes",
};
</script>

<style>
</style>