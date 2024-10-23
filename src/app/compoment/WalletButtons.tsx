const WalletButton: React.FC<{
    handleConnect: (walletDetails: EIP6963ProviderDetail) => void;
    walletDetails: EIP6963ProviderDetail;
    isConnected?: boolean;
}> = ({ walletDetails, handleConnect, isConnected }) => {
    console.log(isConnected);
    return (
        <button type="button" className="button_button button_black" onClick={() => {
            console.log("walletDetails", walletDetails);
            handleConnect(walletDetails)
        }}>
          Connect wallet
        </button>
    );
};

export default WalletButton;