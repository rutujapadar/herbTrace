import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BlockchainStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [currentBlock, setCurrentBlock] = useState(2847392);
  const [gasPrice, setGasPrice] = useState(25);
  const [pendingTransactions, setPendingTransactions] = useState(3);

  const recentTransactions = [
    {
      id: 'tx-001',
      type: 'Test Results',
      batchId: 'HT-2024-003',
      hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
      status: 'confirmed',
      timestamp: '2024-08-30 01:45:23',
      gasUsed: '21,000',
      gasFee: '0.000525 ETH'
    },
    {
      id: 'tx-002',
      type: 'Certificate',
      batchId: 'HT-2024-005',
      hash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c',
      status: 'pending',
      timestamp: '2024-08-30 01:42:15',
      gasUsed: '45,000',
      gasFee: '0.001125 ETH'
    },
    {
      id: 'tx-003',
      type: 'Quality Update',
      batchId: 'HT-2024-001',
      hash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
      status: 'confirmed',
      timestamp: '2024-08-30 01:38:47',
      gasUsed: '32,000',
      gasFee: '0.0008 ETH'
    }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (connectionStatus === 'connected') {
        setCurrentBlock(prev => prev + Math.floor(Math.random() * 3));
        setGasPrice(prev => prev + Math.floor(Math.random() * 5) - 2);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [connectionStatus]);

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case 'connected':
        return {
          color: 'text-success',
          bgColor: 'bg-success',
          icon: 'Wifi',
          label: 'Connected',
          description: 'Blockchain network operational'
        };
      case 'pending':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning',
          icon: 'Clock',
          label: 'Syncing',
          description: 'Synchronizing with network'
        };
      case 'disconnected':
        return {
          color: 'text-error',
          bgColor: 'bg-error',
          icon: 'WifiOff',
          label: 'Disconnected',
          description: 'Unable to connect to network'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted-foreground',
          icon: 'HelpCircle',
          label: 'Unknown',
          description: 'Status unknown'
        };
    }
  };

  const statusConfig = getStatusConfig();

  const getTransactionStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'failed': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'Test Results': return 'FlaskConical';
      case 'Certificate': return 'Award';
      case 'Quality Update': return 'CheckCircle';
      default: return 'FileText';
    }
  };

  const handleReconnect = () => {
    setConnectionStatus('pending');
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 3000);
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Blockchain Status</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${statusConfig?.bgColor} ${connectionStatus === 'connected' ? 'blockchain-status-pulse' : ''}`} />
            <span className={`text-sm font-medium ${statusConfig?.color}`}>
              {statusConfig?.label}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {/* Network Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-surface rounded-lg border border-border">
            <p className="text-xs text-muted-foreground">Current Block</p>
            <p className="text-sm font-medium text-foreground font-mono">#{currentBlock?.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-surface rounded-lg border border-border">
            <p className="text-xs text-muted-foreground">Gas Price</p>
            <p className="text-sm font-medium text-foreground">{gasPrice} gwei</p>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="p-3 bg-surface rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">Pending Transactions</p>
            <span className="text-lg font-semibold text-warning">{pendingTransactions}</span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span>Confirmed: 15</span>
            <span>Failed: 0</span>
            <span>Total Today: 18</span>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">Recent Transactions</h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              iconSize={14}
            >
              View All
            </Button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {recentTransactions?.map((tx) => (
              <div
                key={tx?.id}
                className="p-3 bg-surface rounded-lg border border-border"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={getTransactionIcon(tx?.type)} size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-sm font-medium text-foreground">{tx?.type}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTransactionStatusColor(tx?.status)}`}>
                          {tx?.status?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Batch: {tx?.batchId}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {tx?.hash?.slice(0, 20)}...
                      </p>
                      <p className="text-xs text-muted-foreground">{tx?.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Gas: {tx?.gasUsed}</p>
                    <p className="text-xs text-muted-foreground">Fee: {tx?.gasFee}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border">
          {connectionStatus === 'disconnected' ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReconnect}
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={14}
              className="col-span-2"
            >
              Reconnect to Network
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                iconName="Activity"
                iconPosition="left"
                iconSize={14}
              >
                Network Stats
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Settings"
                iconPosition="left"
                iconSize={14}
              >
                Configure
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockchainStatus;