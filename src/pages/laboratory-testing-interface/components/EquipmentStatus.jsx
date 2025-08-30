import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EquipmentStatus = () => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const equipment = [
    {
      id: 'HPLC-001',
      name: 'High Performance Liquid Chromatography',
      type: 'HPLC',
      status: 'active',
      currentTest: 'Bacosides Analysis',
      batchId: 'HT-2024-003',
      timeRemaining: '45 min',
      lastMaintenance: '2024-08-15',
      nextMaintenance: '2024-09-15',
      utilizationRate: 85,
      temperature: '25°C',
      pressure: '300 bar'
    },
    {
      id: 'HPLC-002',
      name: 'High Performance Liquid Chromatography',
      type: 'HPLC',
      status: 'active',
      currentTest: 'Ginsenoside Content',
      batchId: 'HT-2024-007',
      timeRemaining: '2h 15min',
      lastMaintenance: '2024-08-10',
      nextMaintenance: '2024-09-10',
      utilizationRate: 72,
      temperature: '24°C',
      pressure: '295 bar'
    },
    {
      id: 'ICP-MS-001',
      name: 'Inductively Coupled Plasma Mass Spectrometry',
      type: 'ICP-MS',
      status: 'active',
      currentTest: 'Heavy Metal Screening',
      batchId: 'HT-2024-009',
      timeRemaining: '15 min',
      lastMaintenance: '2024-08-20',
      nextMaintenance: '2024-09-20',
      utilizationRate: 90,
      temperature: '1200°C',
      pressure: 'N/A'
    },
    {
      id: 'GC-MS-001',
      name: 'Gas Chromatography Mass Spectrometry',
      type: 'GC-MS',
      status: 'idle',
      currentTest: null,
      batchId: null,
      timeRemaining: null,
      lastMaintenance: '2024-08-25',
      nextMaintenance: '2024-09-25',
      utilizationRate: 45,
      temperature: '22°C',
      pressure: 'N/A'
    },
    {
      id: 'UV-VIS-001',
      name: 'UV-Visible Spectrophotometer',
      type: 'UV-VIS',
      status: 'maintenance',
      currentTest: null,
      batchId: null,
      timeRemaining: null,
      lastMaintenance: '2024-08-30',
      nextMaintenance: '2024-09-30',
      utilizationRate: 0,
      temperature: '23°C',
      pressure: 'N/A'
    },
    {
      id: 'FTIR-001',
      name: 'Fourier Transform Infrared Spectroscopy',
      type: 'FTIR',
      status: 'idle',
      currentTest: null,
      batchId: null,
      timeRemaining: null,
      lastMaintenance: '2024-08-18',
      nextMaintenance: '2024-09-18',
      utilizationRate: 30,
      temperature: '21°C',
      pressure: 'N/A'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'idle': return 'bg-warning text-warning-foreground';
      case 'maintenance': return 'bg-error text-error-foreground';
      case 'offline': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Play';
      case 'idle': return 'Pause';
      case 'maintenance': return 'Wrench';
      case 'offline': return 'Power';
      default: return 'HelpCircle';
    }
  };

  const getUtilizationColor = (rate) => {
    if (rate >= 80) return 'text-error';
    if (rate >= 60) return 'text-warning';
    if (rate >= 40) return 'text-success';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Equipment Status</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-xs text-muted-foreground">Active: 3</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-warning rounded-full" />
              <span className="text-xs text-muted-foreground">Idle: 2</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-error rounded-full" />
              <span className="text-xs text-muted-foreground">Maintenance: 1</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
        {equipment?.map((item) => (
          <div
            key={item?.id}
            className={`p-3 rounded-lg border transition-all cursor-pointer ${
              selectedEquipment === item?.id 
                ? 'border-primary bg-primary/5' :'border-border bg-surface hover:bg-accent'
            }`}
            onClick={() => setSelectedEquipment(selectedEquipment === item?.id ? null : item?.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-foreground">{item?.id}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item?.status)}`}>
                    <Icon name={getStatusIcon(item?.status)} size={12} className="inline mr-1" />
                    {item?.status?.toUpperCase()}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{item?.name}</p>
                
                {item?.currentTest && (
                  <div className="text-sm">
                    <p className="text-foreground">Running: {item?.currentTest}</p>
                    <p className="text-muted-foreground">Batch: {item?.batchId}</p>
                    <p className="text-muted-foreground">Time left: {item?.timeRemaining}</p>
                  </div>
                )}
              </div>

              <div className="text-right">
                <div className={`text-sm font-medium ${getUtilizationColor(item?.utilizationRate)}`}>
                  {item?.utilizationRate}%
                </div>
                <div className="text-xs text-muted-foreground">Utilization</div>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedEquipment === item?.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Temperature:</p>
                    <p className="text-foreground font-medium">{item?.temperature}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pressure:</p>
                    <p className="text-foreground font-medium">{item?.pressure}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Maintenance:</p>
                    <p className="text-foreground font-medium">{item?.lastMaintenance}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Next Maintenance:</p>
                    <p className="text-foreground font-medium">{item?.nextMaintenance}</p>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Configure
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="BarChart3"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Analytics
                  </Button>
                  {item?.status === 'maintenance' && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="CheckCircle"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Mark Ready
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
            iconSize={14}
          >
            Schedule Maintenance
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Activity"
            iconPosition="left"
            iconSize={14}
          >
            View Logs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentStatus;