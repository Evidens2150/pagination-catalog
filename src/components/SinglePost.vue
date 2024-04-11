<template>
  <div
    class="flex flex-col gap-2 p-2 border border-gray-400"
    :class="[
      isMainList ? 'text-[12px] min-h-[90px]' : 'text-[10px] min-h-[100px]',
    ]"
  >
    <span
      class="font-semibold capitalize"
      :class="{ 'line-clamp-1': !isMainList }"
      >{{ title }}</span
    >
    <span :class="{ 'line-clamp-2': !isMainList }">{{ body }}</span>
    <div class="mt-auto">
      <div v-if="isMainList" class="flex gap-5 w-fit mx-auto">
        <button
          class="transition-all hover:text-red-500"
          @click="addToFavorite"
        >
          <LikeIkon />
        </button>
        <button
          class="transition-all hover:text-blue-500"
          @click="addToUnfavorite"
        >
          <DislikeIcon />
        </button>
      </div>
      <button
        v-else
        class="transition-all hover:text-red-300"
        @click="returnItemToFullList"
      >
        <DeleteIcon />
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import LikeIkon from "@/assets/icons/LikeIkon.vue";
import DislikeIcon from "@/assets/icons/DislikeIcon.vue";
import DeleteIcon from "@/assets/icons/DeleteIcon.vue";
import { usePostListStore } from "@/store/posts.ts";

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: "",
  },
  body: {
    type: String,
    default: "",
  },
  isMainList: {
    type: Boolean,
    default: false,
  },
});

const listStore = usePostListStore();

const addToFavorite = () => {
  listStore.addToFavorite(props.id);
};
const addToUnfavorite = () => {
  listStore.addToUnfavorite(props.id);
};
const returnItemToFullList = () => {
  listStore.returnItemToFullList(props.id);
};
</script>
