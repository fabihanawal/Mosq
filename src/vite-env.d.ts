/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHEETDB_API_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
