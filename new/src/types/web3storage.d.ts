declare module 'web3.storage' {
  export class Web3Storage {
    constructor(options: { token: string });
    put(files: File[]): Promise<string>;
    get(cid: string): Promise<{
      ok: boolean;
      files: () => Promise<File[]>;
      status: number;
      statusText: string;
    }>;
  }
} 