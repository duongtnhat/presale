import {useEffect, useState} from "react";
import {apiGetConfig,createPresale,getPresale} from "@/app/api";
import {EIP6963EventNames, isPreviouslyConnectedProvider, isSupportedChain,SupportedChainId,switchChain} from "@/app/compoment/config";
import WalletButton from "@/app/compoment/WalletButtons";
import {ethers} from "ethers";

export default function BuyCrypt() {
  const [currency, setCurrency] = useState<string>()
  const [ethAddress, setEthAddress] = useState<string>()
  const [bnbAddress, setBnbAddress] = useState<string>()
  const [usdtAddress, setUsdtAddress] = useState<string>()
  const [account, setConnectedAccount] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [history, setHistory] = useState<any[]>([])
  const [injectedProviders, setInjectedProviders] = useState<
    Map<string, EIP6963ProviderDetail>
  >(new Map());

  const [connection, setConnection] = useState<{
          providerUUID: string;
          accounts: string[];
          chainId: number;
      } | null>(null);

  useEffect(() => {
    console.log("HERE")
    if (account == undefined || account.length == 0) {
        setHistory([]);
        return;
    }
    getPresale(account).then((history) => {
        console.log(history.data)
        setHistory(history.data)
    })
  }, [account]);

  useEffect(() => {
    apiGetConfig().then((res) => {
      if (res.ETH_DEPOSIT_ADDRESS) setEthAddress(res.ETH_DEPOSIT_ADDRESS)
      if (res.USDT_BEP20_DEPOSIT_ADDRESS) setUsdtAddress(res.USDT_BEP20_DEPOSIT_ADDRESS)
      if (res.BNB_DEPOSIT_ADDRESS) setBnbAddress(res.BNB_DEPOSIT_ADDRESS)
    })

    if (account == null) handleDisconnect();
    const onAnnounceProvider = (event: EIP6963AnnounceProviderEvent) => {
        const { icon, rdns, uuid, name } = event.detail.info;

        if (!icon || !rdns || !uuid || !name) {
            console.error("invalid eip6963 provider info received!");
            return;
        }
        setInjectedProviders((prevProviders) => {
            const providers = new Map(prevProviders);
            providers.set(uuid, event.detail);
            return providers;
        });

        // This ensures that on page reload, the provider that was previously connected is automatically connected again.
        // It help prevent the need to manually reconnect again when the page reloads
        if (isPreviouslyConnectedProvider(rdns)) {
            handleConnectProvider(event.detail);
        }
    };

    // Add event listener for EIP-6963 announce provider event
    window.addEventListener(
        EIP6963EventNames.Announce,
        onAnnounceProvider as EventListener
    );

    // Dispatch the request for EIP-6963 provider
    window.dispatchEvent(new Event(EIP6963EventNames.Request));

    // Clean up by removing the event listener and resetting injected providers
    return () => {
        window.removeEventListener(
            EIP6963EventNames.Announce,
            onAnnounceProvider as EventListener
        );
        setInjectedProviders(new Map());
    };

  }, [])
  async function handleConnectProvider(
        selectedProviderDetails: EIP6963ProviderDetail
    ) {
        const { provider, info } = selectedProviderDetails;
        try {
            const accounts = (await provider.request({
                method: "eth_requestAccounts",
            })) as string[];
            setConnectedAccount(accounts[0])
            const chainId = await provider.request({ method: "eth_chainId" });

            if (Number(chainId) == 1) {
                selectCurrETH()
            } else {
                selectCurrBNB()
            }
            setConnection({
                providerUUID: info.uuid,
                accounts,
                chainId: Number(chainId),
            });
            localStorage.setItem(
                "PREVIOUSLY_CONNECTED_PROVIDER_RDNS",
                info.rdns
            );
        } catch (error) {
            console.error(error);
            throw new Error("Failed to connect to provider");
        }
    }

    /**
     * @title handleSwitchChain
     * @dev Function to handle switching the chain.
     */
    const handleSwitchChain = async () => {
        try {
            if (!connection) return;
            const provider = injectedProviders.get(
                connection.providerUUID
            )!.provider;
            const chain = isSupportedChain(connection.chainId)
                ? connection.chainId === SupportedChainId.ETH
                    ? SupportedChainId.BSC
                    : SupportedChainId.ETH
                : SupportedChainId.ETH;
            await switchChain(chain, provider);
            setConnection({
                ...connection,
                chainId: chain,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const sendTransaction = async () => {
        if (amount == undefined) return;
        let hash = null;
        if (currency == 'USDT') {
          const abi = ["function transfer(address to, uint amount)"];
          const erc20 = new ethers.Contract("0x524bc91dc82d6b90ef29f76a3ecaabafffd490bc", abi);
          hash = await erc20.transfer(address, "0x" + (amount * 1e6).toString(16))
        } else {
          hash = await window.ethereum.request({
            "method": "eth_sendTransaction",
            "params": [
              {
                to: address,
                from: account,
                gas: "0x76c0",
                value: "0x" + (amount * 1e18).toString(16),
                data: "0x",
              }
            ],
          });
        }
        if (hash != null) {
            createPresale({address: account, amount: amount, currency: currency, ext_id: hash})
        }
    }

    const handleDisconnect = () => {
        setConnection(null);
        setConnectedAccount(null);
        setAddress(null)
        localStorage.clear();
    };

    // const connectedInjectProvider =
    //     connection && injectedProviders.get(connection.providerUUID);

  const selectCurr = (curr) => {
      if ((curr == "ETH" && currency != "ETH") || (curr != "ETH" && currency == "ETH")) {
        handleSwitchChain().then(r => {
          console.log(r);
        });
      }
      setCurrency(curr);
      if (curr == "ETH") setAddress(ethAddress);
      if (curr == "BNB") setAddress(bnbAddress);
      if (curr == "USDT_BEP20") setAddress(usdtAddress);
  }

  const selectCurrETH = () => {selectCurr('ETH')}
  const selectCurrBNB = () => {selectCurr('BNB')}
  const selectCurrUSDT = () => {selectCurr('USDT_BEP20')}

  return (<div className="flex flex-col rounded-[20px] shadow-[inset_0_0_32px_0_#FFFFFF26] p-3 cursor-pointer relative"
   style={{width: "45%", height: "100%"}}>
  <div className="wallet_wallet">
      <div className="wallet_dashInfo">
          <div className="wallet_buyStarterCoin">
              <div className="wallet_grid">
                  <div>
                      <span>Total Coin Sales USD</span>
                      <span translate="no" className="">$91,587.66</span>
                  </div>
                  <div>
                      <span>Total Coins Sold</span>
                      <span translate="no" className="">150,158.81</span>
                  </div>
              </div>
              <div className="wallet_bar">
                  <div className="wallet_spans">
                      <span>Remaining</span>
                      <span translate="no">5.31M</span>
                  </div>
                  <span className="wallet_progress" style={{width: "60%"}}></span>
                  <span className="wallet_progressTitle" style={{left: "60%"}}></span>
              </div>
              <div className="wallet_walletstages wallet_noVerticalPadding">
                  <p className="">1 JPO = 1 USDT</p>
              </div>
          </div>
      </div>
      <div className="wallet_calc">
          {connection && <div className="wallet_btns">
              <div className="wallet_miyagiInput newInput " id="amount" style={{pointerEvents: "unset"}}>
                  <input translate="tex" readOnly={true} type="text" value={address} /> <br />
                  <input translate="no" inputMode="decimal" min="0" placeholder="Enter amount" required={true}
                    type="number" value={amount} onChange={e => { setAmount(Number(e.currentTarget.value)); }} />
              </div>
              <div className="selectMethodBox_selecttype">
                  <div className={`selectMethodBox_item ${currency == 'ETH' && 'selectMethodBox_active'}`}
                    onClick={selectCurrETH}>
                      <span> ETH</span>
                  </div>
                  <div className={`selectMethodBox_item ${currency == 'USDT_BEP20' && 'selectMethodBox_active'}`}
                    onClick={selectCurrUSDT}>
                      <span> USDT</span>
                  </div>
                  <div className={`selectMethodBox_item ${currency == 'BNB' && 'selectMethodBox_active'}`}
                    onClick={selectCurrBNB}>
                      <span> BNB</span>
                  </div>
              </div>
          </div>}
      </div>
      <div className="btn-area w-100 wallet_newBtnsArea">
          {!connection ? <>
          {Array.from(injectedProviders).map(
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              ([_, { info, provider }]) => (
                  <WalletButton
                      key={info.uuid}
                      handleConnect={
                          handleConnectProvider
                      }
                      walletDetails={{ info, provider }}
                      isConneted={
                          connection?.providerUUID === info.uuid
                      }
                  />
              )
          )}
          </> :
          <div className="w-full " style={{display: "flex"}}>
              <button type="button" className="button_button button_black" style={{marginRight: "10px"}}
                onClick={sendTransaction}>Buy Coins</button>
              <button type="button" className="button_button button_black" onClick={handleDisconnect}>Logout</button>
          </div>}
      </div>
  </div>
  {history && (history.length > 0) && <div className={"wallet_wallet"}>
      <h5 className="ant-typography uppercase text-xl font-bold">History</h5>
      <div className="dashLead_list">
          {history.map((row) => (
          <div className="dashLead_motion" key={"history-" + row.id} style={{height: "auto"}}>
              <div className="dashLead_left">
                  <div>
                      <p>{row.attributes.ext_id.substring(0, 6)}...{row.attributes.ext_id.substring(36)}</p>
                  </div>
              </div>
              <div className="dashLead_right">
                  <h5>{row.attributes.amount} {row.attributes.currency}</h5>
              </div>
          </div>))}
      </div>
  </div>}
</div>

  );
}
