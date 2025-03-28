declare module 'web3.storage' {
  export interface Web3StorageOptions {
    token: string;
    endpoint?: string;
  }

  export interface PutOptions {
    name?: string;
    maxRetries?: number;
    wrapWithDirectory?: boolean;
    onRootCidReady?: (cid: string) => void;
    onStoredChunk?: (size: number) => void;
  }

  export class Web3Storage {
    constructor(options: Web3StorageOptions);
    put(files: File[], options?: PutOptions): Promise<string>;
    get(cid: string): Promise<Response | null>;
    delete(cid: string): Promise<void>;
    status(cid: string): Promise<Status>;
    list(options?: { before?: string; maxResults?: number }): AsyncIterable<Upload>;
  }

  export interface Status {
    cid: string;
    dagSize: number;
    created: Date;
    pins: Pin[];
    deals: Deal[];
  }

  export interface Pin {
    peerId: string;
    peerName: string;
    region: string;
    status: 'Pinned' | 'Pinning' | 'PinQueued';
    updated: Date;
  }

  export interface Deal {
    dealId: number;
    storageProvider: string;
    status: 'Queued' | 'Published' | 'Active';
    pieceCid: string;
    dataCid: string;
    dataModelSelector: string;
    activation: Date;
    expiration: Date;
    created: Date;
    updated: Date;
  }

  export interface Upload {
    name: string;
    cid: string;
    created: Date;
    dagSize: number;
    pins: Pin[];
    deals: Deal[];
  }
} 