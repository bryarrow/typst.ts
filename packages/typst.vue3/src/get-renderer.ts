import { createTypstRenderer, TypstRenderer } from '@myriaddreamin/typst.ts/renderer';

let renderer: TypstRenderer | undefined = undefined;

export async function getRenderer(userRender?: TypstRenderer): Promise<TypstRenderer> {
  if (userRender !== undefined) {
    renderer = userRender;
    return renderer;
  }
  if (renderer === undefined) {
    renderer = createTypstRenderer();
    await renderer.init({
      getModule: () => {
        return 'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm';
      },
    });
  }
  return renderer;
}
