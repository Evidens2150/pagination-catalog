<template>
  <div class="flex w-fit gap-1">
    <button
      class="pagination-button"
      :disabled="model <= 1"
      @click.prevent="model = 1"
    >
      {{ "<<" }}
    </button>
    <button
      class="pagination-button"
      :disabled="model <= 1"
      @click.prevent="goToPrevPage"
    >
      {{ "<" }}
    </button>
    <button
      v-for="page in pages[0]"
      :key="page"
      class="pagination-button"
      :class="{ 'pagination-button_active': model === page }"
      @click.prevent="model = page"
    >
      <span>{{ page }}</span>
    </button>
    <div
      v-if="pages[1].length"
      class="ml-[-1px] text-black flex h-8 w-8 items-center justify-center"
    >
      <span>...</span>
    </div>
    <button
      v-for="page in pages[1]"
      :key="page"
      class="pagination-button"
      :class="{ 'pagination-button_active': model === page }"
      @click.prevent="model = page"
    >
      <span>{{ page }}</span>
    </button>
    <button
      class="pagination-button"
      :disabled="model >= maxPage"
      @click.prevent="goToNextPage"
    >
      {{ ">" }}
    </button>
    <button
      class="pagination-button"
      :disabled="model >= maxPage"
      @click.prevent="model = maxPage"
    >
      {{ ">>" }}
    </button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
  },
  total: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const maxPage = computed(() => {
  if (props.total <= 0) {
    return 1;
  }
  let maxPage = Math.floor(props.total / props.pageSize);
  let mod = props.total % props.pageSize;
  if (mod > 0) {
    maxPage++;
  }
  return maxPage;
});

const pages = computed(() => {
  const pages = [[], []];
  const firstPage = model.value % 2 === 0 ? model.value - 1 : model.value;
  if (maxPage.value < 4) {
    pages[0] = maxPage.value === 1 ? [1] : [1, 2];
    pages[1] = maxPage.value <= 2 ? [] : [3];
  } else if (maxPage.value - firstPage >= props.pageSize) {
    pages[0] = [firstPage, firstPage + 1];
    pages[1] = [firstPage + props.pageSize - 1, firstPage + props.pageSize];
  } else {
    pages[0] =
      firstPage + 3 >= maxPage.value
        ? [maxPage.value - 3, maxPage.value - 2]
        : [firstPage, firstPage + 1];
    pages[1] = [maxPage.value - 1, maxPage.value];
  }

  return pages;
});

const goToNextPage = () => {
  if (model.value + 1 <= maxPage.value) {
    model.value += 1;
  }
};

const goToPrevPage = () => {
  if (model.value - 1 >= 1) {
    model.value -= 1;
  }
};
</script>
