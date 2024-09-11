interface Window {
  ethereum?: {
    isMetaMask: boolean;
    request: (request: { method: string; params?: any[] }) => Promise<any>;
    selectedAddress: string;
    on: (event: string, callback: (...args: any[]) => void) => void;
  };
}
