import React, { useState, useEffect } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import walletLogo from "../../assets/wallet.svg";
import "./Wallet.css";

export default function Wallet({ setRefresh }) {
  function getErrorMessage(error) {
    if (!error) {
      return "";
    }
    if (error instanceof NoEthereumProviderError) {
      return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    }
    if (error instanceof UnsupportedChainIdError) {
      return "You're connected to an unsupported network.";
    }
    if (error instanceof UserRejectedRequestErrorInjected) {
      return "Please authorize this website to access your Ethereum account.";
    }
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }

  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 97, 1337, 31337],
  });

  const { library, account, activate, deactivate, active, error } =
    useWeb3React();

  const [blockNumber, setBlockNumber] = useState();
  const errorMessage = getErrorMessage(error);

  useEffect(() => {
    if (library) {
      let stale = false;
      library
        .getBlockNumber()
        .then((blockNumber) => {
          if (!stale) {
            setBlockNumber(blockNumber);
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null);
          }
        });

      const updateBlockNumber = (blockNumber) => {
        setBlockNumber(blockNumber);
      };

      library.on("block", updateBlockNumber);

      return () => {
        library.removeListener("block", updateBlockNumber);
        stale = true;
        setBlockNumber(undefined);
      };
    }
  }, [library]);

  const [, setShowWallet] = useState(false);

  useEffect(() => {
    if (!active) {
      activate(injected);
      setShowWallet(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (library) {
      let stale = false;
      library
        .getBlockNumber()
        .then((blockNumber) => {
          if (!stale) {
            setBlockNumber(blockNumber);
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null);
          }
        });

      const updateBlockNumber = (blockNumber) => {
        setBlockNumber(blockNumber);
      };

      library.on("block", updateBlockNumber);

      return () => {
        library.removeListener("block", updateBlockNumber);
        stale = true;
        setBlockNumber(undefined);
      };
    }
  }, [library]);

  return (
    <>
      {!active && (
        <img
          src={walletLogo}
          alt="Wallet logo"
          onClick={() => {
            activate(injected);
            setShowWallet(false);
          }}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        />
      )}
      {active && (
        <div
          className={active ? "connected" : ""}
          style={{
            borderStyle: "solid",
            margin: "10px",
            padding: "10px",
            borderWidth: "1px",
            textAlign: "center",
            position: "absolute",
            top: "50px",
            right: "10px",
          }}
        >
          <div>
            {account === undefined
              ? "..."
              : account === null
              ? "None"
              : `${account.substring(0, 6)}...${account.substring(
                  account.length - 4
                )}`}
          </div>
          <div>{errorMessage}</div>
          <div>Block Number: {blockNumber}</div>
          <br />
          <button onClick={() => deactivate()}>Disconnect Wallet </button>
          <br />
        </div>
      )}
    </>
  );
}
