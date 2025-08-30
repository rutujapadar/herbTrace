import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const BlockchainStatusIndicator = ({ 
  status = 'connected', 
  blockHeight = 2847392, 
  pendingTransactions = 0,
  networkName = 'Ethereum Mainnet',
  gasPrice = 25,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(status);
  const [currentBlock, setCurrentBlock] = useState(blockHeight);

  // Simulate real-time blockchain updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (connectionStatus === 'connected') {
        setCurrentBlock(prev => prev + Math.floor(Math.random() * 3));
      }
    }, 15000); // Update every 15 seconds

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
          description: 'Blockchain network is operational'
        };
      case 'pending':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning',
          icon: 'Clock',
          label: 'Syncing',
          description: 'Synchronizing with blockchain network'
        };
      case 'disconnected':
        return {
          color: 'text-error',
          bgColor: 'bg-error',
          icon: 'WifiOff',
          label: 'Disconnected',
          description: 'Unable to connect to blockchain network'
        };
      case 'error':
        return {
          color: 'text-error',
          bgColor: 'bg-error',
          icon: 'AlertTriangle',
          label: 'Error',
          description: 'Blockchain connection error'
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

  const handleReconnect = () => {
    setConnectionStatus('pending');
    // Simulate reconnection
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 3000);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Compact Status Indicator */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-2 px-3 py-1.5 h-auto bg-surface border border-border rounded-lg hover:bg-accent"
      >
        <div className={`w-2 h-2 rounded-full ${statusConfig?.bgColor} ${connectionStatus === 'connected' ? 'blockchain-status-pulse' : ''}`} />
        <span className={`text-xs font-medium ${statusConfig?.color} hidden sm:inline`}>
          {statusConfig?.label}
        </span>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={14} 
          className="text-muted-foreground hidden sm:inline"
        />
      </Button>
      {/* Expanded Status Panel */}
      {isExpanded && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-clinical z-60">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Icon name={statusConfig?.icon} size={18} className={statusConfig?.color} />
                <h3 className="font-semibold text-foreground">Blockchain Status</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
                className="w-6 h-6"
              >
                <Icon name="X" size={14} />
              </Button>
            </div>

            {/* Status Details */}
            <div className="space-y-4">
              {/* Connection Status */}
              <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">Network Status</p>
                  <p className="text-xs text-muted-foreground">{statusConfig?.description}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig?.color} bg-opacity-10`}>
                  {statusConfig?.label}
                </div>
              </div>

              {/* Network Information */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-surface rounded-lg">
                  <p className="text-xs text-muted-foreground">Network</p>
                  <p className="text-sm font-medium text-foreground font-mono">{networkName}</p>
                </div>
                <div className="p-3 bg-surface rounded-lg">
                  <p className="text-xs text-muted-foreground">Block Height</p>
                  <p className="text-sm font-medium text-foreground font-mono">#{currentBlock?.toLocaleString()}</p>
                </div>
              </div>

              {/* Transaction Information */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-surface rounded-lg">
                  <p className="text-xs text-muted-foreground">Pending Txns</p>
                  <p className="text-sm font-medium text-foreground">{pendingTransactions}</p>
                </div>
                <div className="p-3 bg-surface rounded-lg">
                  <p className="text-xs text-muted-foreground">Gas Price</p>
                  <p className="text-sm font-medium text-foreground">{gasPrice} gwei</p>
                </div>
              </div>

              {/* Recent Transactions */}
              {pendingTransactions > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">Recent Transactions</p>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {Array.from({ length: Math.min(pendingTransactions, 3) })?.map((_, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-surface rounded text-xs">
                        <div className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-warning rounded-full" />
                          <span className="font-mono text-muted-foreground">0x{Math.random()?.toString(16)?.substr(2, 8)}...</span>
                        </div>
                        <span className="text-warning">Pending</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2 pt-2 border-t border-border">
                {connectionStatus === 'disconnected' || connectionStatus === 'error' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReconnect}
                    iconName="RefreshCw"
                    iconPosition="left"
                    iconSize={14}
                    className="flex-1"
                  >
                    Reconnect
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://etherscan.io', '_blank')}
                    iconName="ExternalLink"
                    iconPosition="left"
                    iconSize={14}
                    className="flex-1"
                  >
                    View Explorer
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Handle settings
                  }}
                  iconName="Settings"
                  iconSize={14}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainStatusIndicator;