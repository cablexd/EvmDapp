import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';

// Replace these with your contract's ABI and deployed address
const TOKEN_ADDRESS = '0xYourTokenContractAddress';
const TOKEN_ABI = [
  // Minimal ABI with balanceOf
  "function balanceOf(address) view returns (uint256)"
];

const AboutPage = () => {
  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    async function fetchBalance() {
      // Connect to Ethereum (using MetaMask provider)
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request user accounts
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      setAccount(userAddress);

      const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);

      const userBalance = await tokenContract.balanceOf(userAddress);
      setBalance(ethers.utils.formatUnits(userBalance, 0)); // assuming token has 0 decimals
    }

    fetchBalance();
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>About</h1>

      {account ? (
        <p>Your balance: {balance} MHT tokens</p>
      ) : (
        <p>Connect your wallet to see your balance.</p>
      )}

      <Link to="/">Home</Link> | <Link to="/about">About</Link>
    </div>
  );
};

export default AboutPage;
