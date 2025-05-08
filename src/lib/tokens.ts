export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  chainId: number;
  logoURI: string;
}

export const baseSepoliaTokens: Token[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    decimals: 18,
    chainId: 84532,
    logoURI: "/tokens/eth.png",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    decimals: 6,
    chainId: 84532,
    logoURI: "/tokens/usdc.png",
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    address: "0xF1b4239b364554aB6c1e220991739e4250649CC4",
    decimals: 18,
    chainId: 84532,
    logoURI: "/tokens/dai.png",
  },
];

export const formatAmount = (
  amount: number | string,
  decimals: number = 18
): string => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "0";

  if (num === 0) return "0";

  if (num < 0.0001) {
    return "<0.0001";
  }

  if (num < 1) {
    return num.toFixed(4);
  }

  if (num < 1000) {
    return num.toFixed(2);
  }

  if (num < 1000000) {
    return (num / 1000).toFixed(2) + "K";
  }

  return (num / 1000000).toFixed(2) + "M";
};

export const getTokenBySymbol = (symbol: string): Token | undefined => {
  return baseSepoliaTokens.find((token) => token.symbol === symbol);
};

export const getTokenByAddress = (address: string): Token | undefined => {
  return baseSepoliaTokens.find(
    (token) => token.address.toLowerCase() === address.toLowerCase()
  );
};
