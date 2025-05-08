import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import { parseEther, toHex } from "viem";

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: "BaseSend",
      preference: {
        keysUrl: "https://keys-dev.coinbase.com/connect",
        options: "smartWalletOnly",
      },
      subAccounts: {
        enableAutoSubAccounts: true,
        defaultSpendLimits: {
          84532: [
            {
              // Native ETH
              token: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
              allowance: toHex(parseEther("0.01")),
              period: 86400, // Daily limit (24 hours in seconds)
            },
          ],
        },
      },
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [baseSepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
