<template>
  <div class="w-full flex flex-col gap-3 items-center">
    <div class="w-full flex flex-col gap-2 px-2">
      <SinglePost
        v-for="item in currentList"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :body="item.body"
        is-main-list
      />
    </div>
    <ListPagination
      v-if="!!total"
      :model-value="currentPage"
      :total="total"
      @update:modelValue="onPageChanged"
    />
  </div>
</template>

<script setup>
import { defineProps, ref, computed, watch } from "vue";
import SinglePost from "./SinglePost.vue";
import ListPagination from "./ListPagination.vue";

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  total: {
    type: Number,
    default: 0,
  },
});

const currentPage = ref(1);
const currentStartIndex = ref(0);

const currentList = computed(() =>
  props.list.slice(currentStartIndex.value, currentStartIndex.value + 5)
);

watch(
  () => currentList.value.length,
  (value) => {
    if (!value && currentPage.value !== 1) {
      onPageChanged(currentPage.value - 1);
    }
  }
);

const onPageChanged = (value) => {
  currentPage.value = value;
  currentStartIndex.value = value === 1 ? 0 : (value - 1) * 5;
};
</script>
