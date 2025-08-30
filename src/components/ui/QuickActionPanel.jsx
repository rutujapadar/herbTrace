import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionPanel = ({ 
  userRole = 'collector', 
  onAction,
  className = '',
  variant = 'sidebar' // 'sidebar', 'floating', 'inline'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getQuickActions = () => {
    const actions = {
      collector: [
        {
          id: 'new-collection',
          label: 'New Collection',
          icon: 'Plus',
          description: 'Start a new herb collection batch',
          color: 'primary',
          shortcut: 'Ctrl+N'
        },
        {
          id: 'scan-qr',
          label: 'Scan QR Code',
          icon: 'QrCode',
          description: 'Scan existing batch QR code',
          color: 'secondary'
        },
        {
          id: 'record-harvest',
          label: 'Record Harvest',
          icon: 'Leaf',
          description: 'Log harvest details and location',
          color: 'success'
        },
        {
          id: 'upload-photos',
          label: 'Upload Photos',
          icon: 'Camera',
          description: 'Add collection photos',
          color: 'outline'
        }
      ],
      laboratory: [
        {
          id: 'start-test',
          label: 'Start Test',
          icon: 'FlaskConical',
          description: 'Begin new sample testing',
          color: 'primary',
          shortcut: 'Ctrl+T'
        },
        {
          id: 'scan-sample',
          label: 'Scan Sample',
          icon: 'QrCode',
          description: 'Scan sample barcode',
          color: 'secondary'
        },
        {
          id: 'enter-results',
          label: 'Enter Results',
          icon: 'FileText',
          description: 'Input test results',
          color: 'success'
        },
        {
          id: 'generate-certificate',
          label: 'Generate Certificate',
          icon: 'Award',
          description: 'Create quality certificate',
          color: 'outline'
        }
      ],
      supply_chain: [
        {
          id: 'create-shipment',
          label: 'Create Shipment',
          icon: 'Truck',
          description: 'Start new shipment tracking',
          color: 'primary',
          shortcut: 'Ctrl+S'
        },
        {
          id: 'update-location',
          label: 'Update Location',
          icon: 'MapPin',
          description: 'Log current shipment location',
          color: 'secondary'
        },
        {
          id: 'scan-batch',
          label: 'Scan Batch',
          icon: 'Package',
          description: 'Scan batch for tracking',
          color: 'success'
        },
        {
          id: 'delivery-confirm',
          label: 'Confirm Delivery',
          icon: 'CheckCircle',
          description: 'Mark shipment as delivered',
          color: 'outline'
        }
      ],
      regulatory: [
        {
          id: 'start-audit',
          label: 'Start Audit',
          icon: 'FileSearch',
          description: 'Begin compliance audit',
          color: 'primary',
          shortcut: 'Ctrl+A'
        },
        {
          id: 'flag-violation',
          label: 'Flag Violation',
          icon: 'AlertTriangle',
          description: 'Report compliance violation',
          color: 'destructive'
        },
        {
          id: 'generate-report',
          label: 'Generate Report',
          icon: 'FileBarChart',
          description: 'Create compliance report',
          color: 'success'
        },
        {
          id: 'verify-batch',
          label: 'Verify Batch',
          icon: 'ShieldCheck',
          description: 'Verify batch compliance',
          color: 'outline'
        }
      ]
    };

    return actions?.[userRole] || actions?.collector;
  };

  const quickActions = getQuickActions();

  const handleAction = (actionId) => {
    if (onAction) {
      onAction(actionId);
    }
    setIsExpanded(false);
  };

  // Floating Action Button variant for mobile
  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        {isExpanded && (
          <div className="absolute bottom-16 right-0 w-64 bg-popover border border-border rounded-lg shadow-clinical mb-2">
            <div className="p-3">
              <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions?.slice(0, 3)?.map((action) => (
                  <Button
                    key={action?.id}
                    variant={action?.color}
                    size="sm"
                    onClick={() => handleAction(action?.id)}
                    iconName={action?.icon}
                    iconPosition="left"
                    iconSize={16}
                    className="w-full justify-start"
                  >
                    {action?.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full shadow-clinical-lg"
        >
          <Icon name={isExpanded ? "X" : "Plus"} size={24} />
        </Button>
      </div>
    );
  }

  // Inline variant for dashboard cards
  if (variant === 'inline') {
    return (
      <div className={`space-y-3 ${className}`}>
        <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions?.slice(0, 4)?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.color}
              size="sm"
              onClick={() => handleAction(action?.id)}
              iconName={action?.icon}
              iconPosition="left"
              iconSize={16}
              className="justify-start h-auto py-3 px-4 flex-col items-start space-y-1"
            >
              <span className="font-medium">{action?.label}</span>
              <span className="text-xs opacity-75 font-normal">{action?.description}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  // Default sidebar variant
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Quick Actions
        </h3>
        {quickActions?.length > 4 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs h-6 px-2"
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {(isExpanded ? quickActions : quickActions?.slice(0, 4))?.map((action) => (
          <div key={action?.id} className="group relative">
            <Button
              variant={action?.color}
              size="sm"
              onClick={() => handleAction(action?.id)}
              iconName={action?.icon}
              iconPosition="left"
              iconSize={16}
              className="w-full justify-start h-10 text-sm"
            >
              <span className="flex-1 text-left">{action?.label}</span>
              {action?.shortcut && (
                <span className="text-xs opacity-60 font-mono">{action?.shortcut}</span>
              )}
            </Button>

            {/* Tooltip */}
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-popover border border-border rounded px-2 py-1 text-xs opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              {action?.description}
            </div>
          </div>
        ))}
      </div>
      {/* Role-specific tips */}
      <div className="mt-4 p-3 bg-surface rounded-lg border border-border">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Pro Tip</p>
            <p className="text-xs text-muted-foreground mt-1">
              {userRole === 'collector' && 'Use GPS coordinates for accurate location tracking'}
              {userRole === 'laboratory' && 'Always verify sample integrity before testing'}
              {userRole === 'supply_chain' && 'Update tracking status at each checkpoint'}
              {userRole === 'regulatory' && 'Document all compliance checks thoroughly'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;