import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = ({ alerts, onAlertAction, onMarkAsRead }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedAlert, setExpandedAlert] = useState(null);

  const filterAlerts = (alerts, filter) => {
    switch (filter) {
      case 'critical':
        return alerts?.filter(alert => alert?.severity === 'critical');
      case 'violations':
        return alerts?.filter(alert => alert?.type === 'violation');
      case 'audits':
        return alerts?.filter(alert => alert?.type === 'audit');
      default:
        return alerts;
    }
  };

  const filteredAlerts = filterAlerts(alerts, activeTab);

  const getAlertIcon = (type, severity) => {
    if (severity === 'critical') return 'AlertTriangle';
    
    switch (type) {
      case 'violation':
        return 'ShieldAlert';
      case 'audit':
        return 'FileSearch';
      case 'blockchain':
        return 'Link';
      case 'certification':
        return 'Award';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'high':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'medium':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const tabs = [
    { id: 'all', label: 'All Alerts', count: alerts?.length },
    { id: 'critical', label: 'Critical', count: alerts?.filter(a => a?.severity === 'critical')?.length },
    { id: 'violations', label: 'Violations', count: alerts?.filter(a => a?.type === 'violation')?.length },
    { id: 'audits', label: 'Audits', count: alerts?.filter(a => a?.type === 'audit')?.length }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Real-time Alerts</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            iconSize={16}
          >
            Settings
          </Button>
        </div>
        
        {/* Alert Tabs */}
        <div className="flex space-x-1 bg-surface rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{tab?.label}</span>
              {tab?.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredAlerts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">No alerts in this category</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredAlerts?.map((alert) => (
              <div key={alert?.id} className={`p-4 hover:bg-accent/50 transition-colors ${!alert?.read ? 'bg-primary/5' : ''}`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${getAlertColor(alert?.severity)}`}>
                    <Icon name={getAlertIcon(alert?.type, alert?.severity)} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{alert?.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert?.description}</p>
                        
                        {alert?.entityName && (
                          <div className="flex items-center space-x-1 mt-2">
                            <Icon name="Building" size={12} className="text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{alert?.entityName}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{alert?.timestamp}</span>
                        {!alert?.read && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    </div>
                    
                    {expandedAlert === alert?.id && alert?.details && (
                      <div className="mt-3 p-3 bg-surface rounded border">
                        <div className="space-y-2">
                          {alert?.details?.blockchainTx && (
                            <div className="flex items-center space-x-2">
                              <Icon name="Link" size={14} className="text-primary" />
                              <span className="text-xs font-mono text-foreground">{alert?.details?.blockchainTx}</span>
                            </div>
                          )}
                          {alert?.details?.affectedBatches && (
                            <div>
                              <p className="text-xs font-medium text-foreground mb-1">Affected Batches:</p>
                              <div className="flex flex-wrap gap-1">
                                {alert?.details?.affectedBatches?.map((batch, index) => (
                                  <span key={index} className="px-2 py-1 bg-muted rounded text-xs font-mono">
                                    {batch}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2 mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedAlert(expandedAlert === alert?.id ? null : alert?.id)}
                        iconName={expandedAlert === alert?.id ? "ChevronUp" : "ChevronDown"}
                        iconSize={14}
                        className="text-xs"
                      >
                        {expandedAlert === alert?.id ? 'Less' : 'Details'}
                      </Button>
                      
                      {alert?.actionRequired && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAlertAction(alert?.id, alert?.suggestedAction)}
                          className="text-xs"
                        >
                          {alert?.suggestedAction}
                        </Button>
                      )}
                      
                      {!alert?.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMarkAsRead(alert?.id)}
                          iconName="Check"
                          iconSize={14}
                          className="text-xs"
                        >
                          Mark Read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;