<script setup lang="ts">
import Typst from '../src/Typst.vue';
import TypstDocument from '../src/TypstDocument.vue';
import { ref } from 'vue';
import { $typst } from '@myriaddreamin/typst.ts';

const sourceCode = '= Hello World!\nThis is a typst document compiled in browser.';

let artifact = ref(new Uint8Array(0));
$typst.vector({ mainContent: sourceCode }).then(value => {
  artifact.value = value;
});
</script>

<template>
  <Typst :content="sourceCode" />
  <TypstDocument :artifact="artifact" />
</template>

<style lang="css"></style>
