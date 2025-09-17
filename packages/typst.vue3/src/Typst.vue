<template>
  <div v-html="typst.compiled" />
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue';
import { $typst } from '@myriaddreamin/typst.ts';
import { TypstSnippet } from '@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs';

interface prop {
  content: string;
  typstSnippet?: TypstSnippet;
}

const typst = reactive({
  compiled: '',
});

const props = withDefaults(defineProps<prop>(), {
  content: '',
});

onMounted(async () => {
  let typstSnippet;
  if (props.typstSnippet instanceof TypstSnippet) {
    typstSnippet = props.typstSnippet;
  } else {
    typstSnippet = $typst;
  }
  typst.compiled = await typstSnippet.svg({ mainContent: props.content });
});

watch(() => props.content, async (newVal, _) => {
  let typstSnippet;
  if (props.typstSnippet instanceof TypstSnippet) {
      typstSnippet = props.typstSnippet;
    } else {
      typstSnippet = $typst;
  }

  typst.compiled = await typstSnippet.svg({ mainContent: newVal });
},);
</script>

<style lang="css"></style>
