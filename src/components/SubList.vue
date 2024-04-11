<template>
  <div class="h-[220px] px-2 border flex flex-col gap-2 items-stretch">
    <slot></slot>
    <div class="overflow-auto flex flex-col gap-2 pr-1 pb-2">
      <SinglePost
        v-for="item in list"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :body="item.body"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import SinglePost from "@/components/SinglePost.vue";

defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});
</script>
