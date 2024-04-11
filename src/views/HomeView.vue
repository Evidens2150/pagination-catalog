<template>
  <div
    class="p-5 max-w-[1440px] my-0 mx-auto min-h-screen bg-slate-100 flex items-stretch"
  >
    <CatalogComponent />
  </div>
</template>

<script>
import CatalogComponent from "@/components/CatalogComponent.vue";

export default {
  name: "HomeView",
  components: {
    CatalogComponent,
  },
};
</script>
