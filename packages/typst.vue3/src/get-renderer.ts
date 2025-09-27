import { createTypstRenderer, TypstRenderer } from '@myriaddreamin/typst.ts/renderer';
import { InitOptions } from '@myriaddreamin/typst.ts';

let renderer: TypstRenderer | undefined = undefined;

export async function getRenderer(options?: Partial<InitOptions>): Promise<TypstRenderer> {
  if (renderer === undefined) {
    renderer = createTypstRenderer();
    await renderer.init(options?? {
      getModule: () => {
        return 'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm';
      },
    });
  }
  return renderer;
}
