<template>
  <div v-html="typst.compiled" />
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue';
import { $typst, BeforeBuildFn } from '@myriaddreamin/typst.ts';
import { initTypst } from "./typst-init.ts";

interface prop {
  content: string;
  compilerUrl?: string;
  compilerBeforeBuild?: BeforeBuildFn[];
  rendererUrl?: string;
  rendererBeforeBuild?: BeforeBuildFn[];
}

const typst = reactive({
  compiled: '',
});

const props = withDefaults(defineProps<prop>(), {
  content: '',
});

onMounted(async () => {
  initTypst(props);
  typst.compiled = await $typst.svg({ mainContent: props.content });
});

watch(()=>props.content, async (newVal, _) => {
  typst.compiled = await $typst.svg({ mainContent: newVal });
});
</script>

<style lang="css"></style>
