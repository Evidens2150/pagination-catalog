<template>
  <div
    class="flex items-center justify-center fixed top-0 left-0 h-screen w-screen"
  >
    <div class="inline-block relative w-20 h-20">
      <div
        v-for="num in [1, 2, 3, 4]"
        :key="num"
        class="box-border block absolute w-16 h-16 m-2 border-[8px] border-white rounded-[50%] animate-custom-spin"
        style="border-color: #313131 transparent transparent transparent"
        :style="{
          'animation-delay':
            num === 2
              ? '-150ms'
              : num === 3
              ? '-300ms'
              : num === 4
              ? '-450ms'
              : '',
        }"
      ></div>
    </div>
  </div>
</template>
