<template>
  <div v-if="svg" v-html="typstSvg" />
  <div v-if="canvas" ref="typstCanvasDiv" />
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watchEffect } from 'vue';
import { TypstRenderer } from '@myriaddreamin/typst.ts/renderer';
import { getRenderer } from './get-renderer.ts';
import { InitOptions } from '@myriaddreamin/typst.ts';

export interface TypstDocumentProps {
  artifact: Uint8Array;
  fill?: string;
  canvas?: boolean;
  svg?: boolean;
  rendererInitOptions?: Partial<InitOptions>;
}
const { artifact, fill, canvas, svg = true, rendererInitOptions } = defineProps<TypstDocumentProps>();

let renderer: TypstRenderer;

const typstSvg = ref('');
const typstCanvasDiv = useTemplateRef('typstCanvasDiv');

onMounted(async () => {
  renderer = await getRenderer(rendererInitOptions);
  watchEffect(async () => {
    if (artifact.length === 0) {
      return;
    }
    if (svg) {
      if(fill!== undefined) console.warn('SVG mode doesn\'t support fill');
      typstSvg.value = await renderer.renderSvg({
        format: 'vector',
        artifactContent: artifact,
      });
      return;
    }
    if (canvas) {
      if (typstCanvasDiv.value === null) {
        console.warn('Typst Canvas Element is undefined!');
        return;
      }
      await renderer.renderToCanvas({
        format: 'vector',
        artifactContent: artifact,
        backgroundColor: fill,
        container: typstCanvasDiv.value,
      });
    }
  });
});
</script>

<style scoped lang="css"></style>
