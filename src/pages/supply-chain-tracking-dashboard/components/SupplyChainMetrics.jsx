import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SupplyChainMetrics = () => {
  const [timeRange, setTimeRange] = useState('7d'); // '24h', '7d', '30d', '90d'

  const mockMetrics = {
    '24h': {
      totalShipments: 12,
      inTransit: 8,
      delivered: 4,
      delayed: 0,
      averageDeliveryTime: '2.3 days',
      blockchainVerifications: 45,
      qualityScore: 98.5,
      temperatureAlerts: 1,
      onTimeDelivery: 100
    },
    '7d': {
      totalShipments: 89,
      inTransit: 23,
      delivered: 62,
      delayed: 4,
      averageDeliveryTime: '2.8 days',
      blockchainVerifications: 312,
      qualityScore: 96.8,
      temperatureAlerts: 3,
      onTimeDelivery: 95.5
    },
    '30d': {
      totalShipments: 342,
      inTransit: 45,
      delivered: 278,
      delayed: 19,
      averageDeliveryTime: '3.1 days',
      blockchainVerifications: 1247,
      qualityScore: 94.2,
      temperatureAlerts: 12,
      onTimeDelivery: 94.4
    },
    '90d': {
      totalShipments: 1024,
      inTransit: 67,
      delivered: 891,
      delayed: 66,
      averageDeliveryTime: '3.2 days',
      blockchainVerifications: 3856,
      qualityScore: 93.7,
      temperatureAlerts: 34,
      onTimeDelivery: 93.5
    }
  };

  const currentMetrics = mockMetrics?.[timeRange];

  const mockAlerts = [
    {
      id: 1,
      type: 'temperature',
      severity: 'high',
      message: 'Temperature exceeded threshold for batch HT-2024-005',
      timestamp: '2024-08-30T01:15:00Z',
      batchNumber: 'HT-2024-005',
      resolved: false
    },
    {
      id: 2,
      type: 'delay',
      severity: 'medium',
      message: 'Shipment HT-2024-003 delayed by 4 hours',
      timestamp: '2024-08-29T22:30:00Z',
      batchNumber: 'HT-2024-003',
      resolved: false
    },
    {
      id: 3,
      type: 'verification',
      severity: 'low',
      message: 'Blockchain verification pending for batch HT-2024-007',
      timestamp: '2024-08-29T18:45:00Z',
      batchNumber: 'HT-2024-007',
      resolved: true
    },
    {
      id: 4,
      type: 'quality',
      severity: 'high',
      message: 'Quality check failed for batch HT-2024-002',
      timestamp: '2024-08-29T14:20:00Z',
      batchNumber: 'HT-2024-002',
      resolved: false
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'temperature': return 'Thermometer';
      case 'delay': return 'Clock';
      case 'verification': return 'ShieldAlert';
      case 'quality': return 'AlertTriangle';
      default: return 'Bell';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const MetricCard = ({ title, value, subtitle, icon, trend, color = 'primary' }) => (
    <div className="p-4 bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-10 h-10 rounded-lg bg-${color}/10 flex items-center justify-center`}>
          <Icon name={icon} size={20} className={`text-${color}`} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-xs ${trend > 0 ? 'text-success' : 'text-error'}`}>
            <Icon name={trend > 0 ? 'TrendingUp' : 'TrendingDown'} size={12} />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-foreground">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Supply Chain Health Metrics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Supply Chain Health</h2>
            <p className="text-sm text-muted-foreground">
              Real-time metrics and performance indicators
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {['24h', '7d', '30d', '90d']?.map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Shipments"
            value={currentMetrics?.totalShipments}
            icon="Package"
            color="primary"
            trend={timeRange === '7d' ? 12 : undefined}
            subtitle=""
          />
          <MetricCard
            title="In Transit"
            value={currentMetrics?.inTransit}
            icon="Truck"
            color="warning"
            trend={undefined}
            subtitle=""
          />
          <MetricCard
            title="Delivered"
            value={currentMetrics?.delivered}
            icon="CheckCircle"
            color="success"
            trend={timeRange === '7d' ? 8 : undefined}
            subtitle=""
          />
          <MetricCard
            title="Delayed"
            value={currentMetrics?.delayed}
            icon="Clock"
            color="error"
            trend={undefined}
            subtitle=""
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Avg Delivery Time"
            value={currentMetrics?.averageDeliveryTime}
            icon="Timer"
            color="secondary"
            trend={undefined}
            subtitle=""
          />
          <MetricCard
            title="Blockchain Verifications"
            value={currentMetrics?.blockchainVerifications}
            icon="Shield"
            color="primary"
            trend={undefined}
            subtitle=""
          />
          <MetricCard
            title="Quality Score"
            value={`${currentMetrics?.qualityScore}%`}
            icon="Award"
            color="success"
            trend={timeRange === '7d' ? 2.3 : undefined}
            subtitle=""
          />
          <MetricCard
            title="On-Time Delivery"
            value={`${currentMetrics?.onTimeDelivery}%`}
            icon="Target"
            color="primary"
            trend={timeRange === '7d' ? 1.5 : undefined}
            subtitle=""
          />
        </div>
      </div>
      {/* Alert Notifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Alert Notifications</h2>
            <p className="text-sm text-muted-foreground">
              Recent alerts and system notifications
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              iconSize={16}
            >
              Configure
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="CheckCircle"
              iconSize={16}
            >
              Mark All Read
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {mockAlerts?.map((alert) => (
            <div
              key={alert?.id}
              className={`p-4 rounded-lg border transition-colors ${
                alert?.resolved 
                  ? 'bg-surface/50 border-border opacity-60' : 'bg-surface border-border hover:bg-surface/80'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  alert?.severity === 'high' ? 'bg-error/10' :
                  alert?.severity === 'medium' ? 'bg-warning/10' : 'bg-muted/10'
                }`}>
                  <Icon 
                    name={getAlertIcon(alert?.type)} 
                    size={16} 
                    className={getAlertColor(alert?.severity)} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">
                      {alert?.message}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(alert?.timestamp)}
                      </span>
                      {alert?.resolved && (
                        <div className="verification-badge verified">
                          <Icon name="Check" size={10} />
                          <span className="ml-1">Resolved</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      Batch: {alert?.batchNumber}
                    </span>
                    {!alert?.resolved && (
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs"
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs"
                        >
                          Resolve
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockAlerts?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No alerts</h3>
            <p className="text-muted-foreground">
              All systems are running smoothly
            </p>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            className="justify-start"
          >
            Create Shipment
          </Button>
          <Button
            variant="outline"
            iconName="MapPin"
            iconPosition="left"
            iconSize={16}
            className="justify-start"
          >
            Update Location
          </Button>
          <Button
            variant="outline"
            iconName="Package"
            iconPosition="left"
            iconSize={16}
            className="justify-start"
          >
            Scan Batch
          </Button>
          <Button
            variant="outline"
            iconName="FileBarChart"
            iconPosition="left"
            iconSize={16}
            className="justify-start"
          >
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainMetrics;