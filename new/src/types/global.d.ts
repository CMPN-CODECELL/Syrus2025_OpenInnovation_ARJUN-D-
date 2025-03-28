interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    isConnected: () => boolean;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    removeListener: (event: string, callback: (...args: any[]) => void) => void;
    selectedAddress: string | null;
    chainId: string;
  };
}

declare interface ImportMetaEnv {
  readonly NEXT_PUBLIC_INFURA_PROJECT_ID: string;
  readonly NEXT_PUBLIC_INFURA_PROJECT_SECRET: string;
  readonly NEXT_PUBLIC_WEB3_STORAGE_TOKEN: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
} 