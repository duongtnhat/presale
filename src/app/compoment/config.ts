/**
 * @title EIP6963EventNames
 * @dev Enum defining EIP-6963 event names.
 */
export enum EIP6963EventNames {
    Announce = "eip6963:announceProvider",
    Request = "eip6963:requestProvider",
}

/**
 * @title SupportedChainId
 * @dev Enum defining supported chain IDs.
 */
export enum SupportedChainId {
    ETH = 1,
    BSC = 56,
}

/**
 * @title networkInfoMap
 * @dev Object containing network information for supported chains.
 */
export const networkInfoMap = {
    [SupportedChainId.ETH]: {
        chainId: `0x${SupportedChainId.ETH.toString(16)}`,
        chainName: "Ethereum Mainnet",
        rpcUrls: ["https://eth.llamarpc.com/"],
        blockExplorerUrls: ["https://etherscan.io/"],
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
    },
    [SupportedChainId.BSC]: {
        chainId: `0x${SupportedChainId.BSC.toString(16)}`,
        chainName: "BNB Smart Chain Mainnet",
        rpcUrls: ["https://bsc-dataseed.binance.org/"],
        blockExplorerUrls: ["https://bscscan.com/"],
        nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
        },
    },
};

/**
 * @title isPreviouslyConnectedProvider
 * @dev Function to check if a provider was previously connected by comparing its rdns to the rdns previously store in the local storage the last time a connection was made.
 * @param providerRDNS The provider RDNS string.
 * @returns True if the providerRDNS matches the rdns found in the local storage.
 */
export function isPreviouslyConnectedProvider(providerRDNS: string): boolean {
    return (
        localStorage.getItem(
            "PREVIOUSLY_CONNECTED_PROVIDER_RDNS"
        ) === providerRDNS
    );
}

/**
 * @title isSupportedChain
 * @dev Function to check if a chain is supported.
 * @param chainId The chain ID to check.
 * @returns True if the chain ID is supported, false otherwise.
 */
export function isSupportedChain(
    chainId: number | null | undefined
): chainId is SupportedChainId {
    if (!chainId) return false;
    return !!SupportedChainId[chainId];
}

/**
 * @title switchChain
 * @dev Function to switch to a supported chain.
 * @param chain The chain ID to switch to.
 * @param provider The EIP1193Provider instance.
 */
export const switchChain = async (chain: number, provider: EIP1193Provider) => {
    if (!isSupportedChain(chain))
        return console.error("attempt to switch to a wrong chain!");
    try {
        await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${chain.toString(16)}` }],
        });
    } catch (error) {
        if (error.code === 4902 || error.code === -32603) {
            const chainInfo = networkInfoMap[chain];
            try {
                await provider.request({
                    method: "wallet_addEthereumChain",
                    params: [chainInfo],
                });
            } catch (addError) {
                console.error("user rejected network addition!", addError);
            }
        }
    }
};
