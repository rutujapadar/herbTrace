import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveTestSummary = () => {
  const activeTests = [
    {
      id: 'HT-2024-003',
      herbType: 'Brahmi',
      testType: 'Bacosides Analysis',
      progress: 75,
      timeRemaining: '45 min',
      technician: 'Dr. Sarah Johnson',
      equipment: 'HPLC-001',
      status: 'running'
    },
    {
      id: 'HT-2024-007',
      herbType: 'Ginseng',
      testType: 'Ginsenoside Content',
      progress: 30,
      timeRemaining: '2h 15min',
      technician: 'Dr. Michael Chen',
      equipment: 'HPLC-002',
      status: 'running'
    },
    {
      id: 'HT-2024-009',
      herbType: 'Echinacea',
      testType: 'Heavy Metal Screening',
      progress: 90,
      timeRemaining: '15 min',
      technician: 'Dr. Emily Rodriguez',
      equipment: 'ICP-MS-001',
      status: 'finalizing'
    }
  ];

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-primary';
    if (progress >= 25) return 'bg-warning';
    return 'bg-error';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running': return 'Play';
      case 'finalizing': return 'CheckCircle';
      case 'paused': return 'Pause';
      default: return 'Clock';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Active Tests</h3>
          <span className="text-sm text-muted-foreground">{activeTests?.length} running</span>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {activeTests?.map((test) => (
          <div key={test?.id} className="p-4 bg-surface rounded-lg border border-border">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">{test?.id}</h4>
                <p className="text-sm text-muted-foreground">{test?.herbType}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(test?.status)} 
                  size={16} 
                  className="text-success" 
                />
                <span className="text-xs text-muted-foreground capitalize">
                  {test?.status}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Test Type:</span>
                <span className="text-foreground font-medium">{test?.testType}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Equipment:</span>
                <span className="text-foreground">{test?.equipment}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Technician:</span>
                <span className="text-foreground">{test?.technician}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground font-medium">{test?.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(test?.progress)}`}
                  style={{ width: `${test?.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-muted-foreground">Time remaining: {test?.timeRemaining}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  iconSize={14}
                  className="h-6 px-2 text-xs"
                >
                  Monitor
                </Button>
              </div>
            </div>
          </div>
        ))}

        {activeTests?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="FlaskConical" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Active Tests</h4>
            <p className="text-muted-foreground">Start a test from the queue to see progress here</p>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Pause"
            iconPosition="left"
            iconSize={14}
          >
            Pause All
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={14}
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActiveTestSummary;