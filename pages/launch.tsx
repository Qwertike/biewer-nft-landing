"use client";

import { useState } from "react";
import {
  createThirdwebClient,
  getContract,
} from "thirdweb";
import { defineChain } from "thirdweb/chains";
import {
  useConnect,
  useDisconnect,
  useActiveWallet,
  useContract,
  useClaimNFT,
} from "thirdweb/react";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

const chain = defineChain(137); // Polygon

export default function LaunchPage() {
  const connect = useConnect();
  const disconnect = useDisconnect();
  const wallet = useActiveWallet();

  const { contract } = useContract({
    client,
    chain,
    address: "0xAFeaAeE58bEDF28807Bd48E6d00AF7AFf5655ba5", // NFT contract
  });

  const { claimNFT, isLoading, error } = useClaimNFT({
    contract,
  });

  const handleMint = async () => {
    if (!wallet) {
      alert("Csatlakozz először a walleteddel!");
      return;
    }

    try {
      await claimNFT({
        to: wallet.address,
        quantity: 1,
      });
      alert("Sikeres mintelés!");
    } catch (err) {
      console.error(err);
      alert("Hiba történt mintelés közben.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold mb-6">Biewer Dog Lovers NFT Mint</h1>

      {!wallet ? (
        <button onClick={() => connect.connect("injected")}>
          Wallet csatlakoztatása
        </button>
      ) : (
        <>
          <p>Csatlakozva: {wallet.address}</p>
          <button onClick={handleMint} disabled={isLoading}>
            {isLoading ? "Mintelés..." : "NFT mintelése USDC-ért"}
          </button>
          <button onClick={disconnect.disconnect} className="mt-4">
            Leválasztás
          </button>
        </>
      )}

      {error && <p className="text-red-600 mt-4">Hiba: {error.message}</p>}
    </main>
  );
}


