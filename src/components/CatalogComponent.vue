<template>
  <div class="flex w-full">
    <LoaderRing v-if="isLoading" />
    <span v-else-if="!fullList?.length" class="flex w-full justify-center"
      >Not results</span
    >
    <div v-else class="flex flex-col gap-5 h-full w-full">
      <MainList :list="main" :total="main.length" />
      <div class="mt-auto gap-2 grid grid-flow-col grid-cols-2">
        <SubList :list="favorite" class="border-red-300">
          <LikeIkon :size="40" class="mx-auto shrink-0 text-red-500" />
        </SubList>
        <SubList :list="unfavorite" class="border-blue-300">
          <DislikeIcon :size="40" class="mx-auto shrink-0 text-blue-500" />
        </SubList>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { usePostListStore } from "@/store/posts.ts";
import MainList from "@/components/MainList.vue";
import SubList from "@/components/SubList.vue";
import LoaderRing from "@/components/LoaderRing.vue";
import LikeIkon from "@/assets/icons/LikeIkon.vue";
import DislikeIcon from "@/assets/icons/DislikeIcon.vue";

const listStore = usePostListStore();

const isLoading = ref(false);

const fullList = computed(() => listStore.getFullList);
const main = computed(() => listStore.getMainList);
const favorite = computed(() => listStore.getFavoriteList);
const unfavorite = computed(() => listStore.getUnfavoriteList);

onMounted(async () => {
  await fillList();
});

const fillList = async () => {
  isLoading.value = true;
  try {
    const originList = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    ).then((response) => response.json());
    const result = originList.map((el) => {
      return { ...{ sublist: "" }, ...el };
    });
    listStore.fillList(result);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
