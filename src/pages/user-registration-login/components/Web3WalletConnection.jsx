import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Web3WalletConnection = ({ onWalletConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);

  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: 'Wallet',
      description: 'Connect using MetaMask browser extension',
      color: 'bg-orange-500'
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: 'Smartphone',
      description: 'Connect using mobile wallet',
      color: 'bg-blue-500'
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: 'CreditCard',
      description: 'Connect using Coinbase Wallet',
      color: 'bg-blue-600'
    }
  ];

  const handleWalletConnect = async (walletId) => {
    setIsConnecting(true);
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockWalletData = {
        address: '0x742d35Cc6634C0532925a3b8D4C2C4e4C8b4C8b4',
        balance: '2.45 ETH',
        network: 'Ethereum Mainnet'
      };
      
      setConnectedWallet({
        ...mockWalletData,
        type: walletId
      });
      
      if (onWalletConnect) {
        onWalletConnect(mockWalletData);
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setConnectedWallet(null);
    if (onWalletConnect) {
      onWalletConnect(null);
    }
  };

  if (connectedWallet) {
    return (
      <div className="w-full max-w-md mx-auto bg-card border border-border rounded-lg shadow-clinical p-6">
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Wallet Connected</h3>
          <p className="text-sm text-muted-foreground">Your blockchain wallet is ready</p>
        </div>
        <div className="space-y-3">
          <div className="p-3 bg-surface rounded-lg">
            <p className="text-xs text-muted-foreground">Wallet Address</p>
            <p className="text-sm font-mono text-foreground">{connectedWallet?.address}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-surface rounded-lg">
              <p className="text-xs text-muted-foreground">Balance</p>
              <p className="text-sm font-medium text-foreground">{connectedWallet?.balance}</p>
            </div>
            <div className="p-3 bg-surface rounded-lg">
              <p className="text-xs text-muted-foreground">Network</p>
              <p className="text-sm font-medium text-foreground">{connectedWallet?.network}</p>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
          iconName="Unlink"
          iconPosition="left"
          className="w-full mt-4"
        >
          Disconnect Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-card border border-border rounded-lg shadow-clinical p-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Icon name="Wallet" size={24} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Connect Your Wallet</h3>
        <p className="text-sm text-muted-foreground">
          Connect your Web3 wallet for blockchain authentication
        </p>
      </div>
      <div className="space-y-3">
        {walletOptions?.map((wallet) => (
          <Button
            key={wallet?.id}
            variant="outline"
            size="lg"
            onClick={() => handleWalletConnect(wallet?.id)}
            disabled={isConnecting}
            loading={isConnecting}
            className="w-full justify-start h-auto py-4 px-4"
          >
            <div className={`w-10 h-10 ${wallet?.color} rounded-lg flex items-center justify-center mr-4`}>
              <Icon name={wallet?.icon} size={20} color="white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground">{wallet?.name}</p>
              <p className="text-xs text-muted-foreground">{wallet?.description}</p>
            </div>
          </Button>
        ))}
      </div>
      <div className="mt-6 p-3 bg-surface rounded-lg border border-border">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Why connect a wallet?</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your wallet enables secure blockchain transactions and data verification in the supply chain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Web3WalletConnection;