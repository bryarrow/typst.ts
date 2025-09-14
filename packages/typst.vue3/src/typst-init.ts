import { $typst, BeforeBuildFn } from '@myriaddreamin/typst.ts';

let initialized = false;

export function initTypst(options?: {
  compilerUrl?: string;
  compilerBeforeBuild?: BeforeBuildFn[];
  rendererUrl?: string;
  rendererBeforeBuild?: BeforeBuildFn[];
}) {
  if (initialized) return;
  $typst.setCompilerInitOptions({
    beforeBuild: options?.compilerBeforeBuild||[],
    getModule: () =>
      options?.compilerUrl||
      'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm',
  });

  $typst.setRendererInitOptions({
    beforeBuild: options?.rendererBeforeBuild||[],
    getModule: () =>
      options?.rendererUrl||
      'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm',
  });
  initialized = true;
}
export { $typst };
