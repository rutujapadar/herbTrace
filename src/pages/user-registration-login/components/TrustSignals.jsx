import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 'ssl',
      icon: 'Shield',
      label: 'SSL Secured',
      description: '256-bit encryption'
    },
    {
      id: 'blockchain',
      icon: 'Link',
      label: 'Blockchain Verified',
      description: 'Immutable records'
    },
    {
      id: 'compliance',
      icon: 'CheckCircle',
      label: 'FDA Compliant',
      description: 'Regulatory approved'
    },
    {
      id: 'iso',
      icon: 'Award',
      label: 'ISO 27001',
      description: 'Security certified'
    }
  ];

  const networkStatus = {
    status: 'connected',
    blockHeight: 2847392,
    lastUpdate: new Date()?.toLocaleTimeString()
  };

  return (
    <div className="space-y-6">
      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4">
        {trustBadges?.map((badge) => (
          <div
            key={badge?.id}
            className="flex items-center space-x-3 p-3 bg-surface/50 rounded-lg border border-border/50"
          >
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name={badge?.icon} size={16} className="text-success" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">{badge?.label}</p>
              <p className="text-xs text-muted-foreground">{badge?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Blockchain Network Status */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-foreground">Network Status</h4>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full blockchain-status-pulse" />
            <span className="text-xs text-success font-medium">Connected</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-muted-foreground">Block Height</p>
            <p className="font-mono text-foreground">#{networkStatus?.blockHeight?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Update</p>
            <p className="font-mono text-foreground">{networkStatus?.lastUpdate}</p>
          </div>
        </div>
      </div>
      {/* Security Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="ShieldCheck" size={18} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-primary">Secure Authentication</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your data is protected by enterprise-grade security and blockchain technology. 
              All transactions are cryptographically signed and immutable.
            </p>
          </div>
        </div>
      </div>
      {/* Regulatory Compliance */}
      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground">Trusted by regulatory authorities</p>
        <div className="flex justify-center space-x-4 opacity-60">
          <div className="text-xs font-medium">FDA</div>
          <div className="text-xs font-medium">AYUSH</div>
          <div className="text-xs font-medium">WHO-GMP</div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;