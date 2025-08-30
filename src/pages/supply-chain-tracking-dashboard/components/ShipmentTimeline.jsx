import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShipmentTimeline = ({ selectedBatch, onBatchSelect }) => {
  const [timelineView, setTimelineView] = useState('journey'); // 'journey', 'blockchain'

  const mockTimelineData = [
    {
      id: 1,
      batchNumber: "HT-2024-001",
      herbType: "Ashwagandha",
      currentStage: "processing",
      stages: [
        {
          id: "collection",
          name: "Collection",
          status: "completed",
          timestamp: "2024-08-25T08:30:00Z",
          location: "Uttarakhand, India",
          stakeholder: "Ramesh Kumar",
          blockchainHash: "0x1a2b3c4d5e6f7890",
          verified: true,
          description: "Herbs collected from certified organic farm"
        },
        {
          id: "testing",
          name: "Laboratory Testing",
          status: "completed",
          timestamp: "2024-08-26T14:20:00Z",
          location: "Delhi Testing Lab",
          stakeholder: "Dr. Priya Sharma",
          blockchainHash: "0x2b3c4d5e6f789012",
          verified: true,
          description: "Quality and purity tests completed successfully"
        },
        {
          id: "processing",
          name: "Processing",
          status: "in_progress",
          timestamp: "2024-08-28T10:15:00Z",
          location: "Mumbai Processing Unit",
          stakeholder: "Ayurveda Industries Ltd",
          blockchainHash: "0x3c4d5e6f78901234",
          verified: true,
          description: "Traditional processing methods applied"
        },
        {
          id: "packaging",
          name: "Packaging",
          status: "pending",
          timestamp: null,
          location: "Mumbai Processing Unit",
          stakeholder: "Ayurveda Industries Ltd",
          blockchainHash: null,
          verified: false,
          description: "Awaiting processing completion"
        },
        {
          id: "distribution",
          name: "Distribution",
          status: "pending",
          timestamp: null,
          location: "Regional Distribution Center",
          stakeholder: "HerbTrace Logistics",
          blockchainHash: null,
          verified: false,
          description: "Ready for distribution network"
        },
        {
          id: "retail",
          name: "Retail",
          status: "pending",
          timestamp: null,
          location: "Various Retail Outlets",
          stakeholder: "Retail Partners",
          blockchainHash: null,
          verified: false,
          description: "Available for consumer purchase"
        }
      ]
    },
    {
      id: 2,
      batchNumber: "HT-2024-002",
      herbType: "Turmeric",
      currentStage: "distribution",
      stages: [
        {
          id: "collection",
          name: "Collection",
          status: "completed",
          timestamp: "2024-08-20T09:00:00Z",
          location: "Kerala, India",
          stakeholder: "Spice Farmers Collective",
          blockchainHash: "0x4d5e6f7890123456",
          verified: true,
          description: "Premium turmeric harvested"
        },
        {
          id: "testing",
          name: "Laboratory Testing",
          status: "completed",
          timestamp: "2024-08-22T11:30:00Z",
          location: "Kochi Testing Facility",
          stakeholder: "Quality Labs India",
          blockchainHash: "0x5e6f789012345678",
          verified: true,
          description: "Curcumin content verified"
        },
        {
          id: "processing",
          name: "Processing",
          status: "completed",
          timestamp: "2024-08-24T16:45:00Z",
          location: "Kochi Processing Center",
          stakeholder: "Golden Spice Co.",
          blockchainHash: "0x6f78901234567890",
          verified: true,
          description: "Traditional grinding and processing"
        },
        {
          id: "packaging",
          name: "Packaging",
          status: "completed",
          timestamp: "2024-08-26T13:20:00Z",
          location: "Kochi Processing Center",
          stakeholder: "Golden Spice Co.",
          blockchainHash: "0x789012345678901a",
          verified: true,
          description: "Sealed in tamper-proof packaging"
        },
        {
          id: "distribution",
          name: "Distribution",
          status: "in_progress",
          timestamp: "2024-08-28T07:00:00Z",
          location: "En route to Chennai",
          stakeholder: "Express Logistics",
          blockchainHash: "0x89012345678901ab",
          verified: true,
          description: "Temperature-controlled transport"
        },
        {
          id: "retail",
          name: "Retail",
          status: "pending",
          timestamp: null,
          location: "Chennai Retail Network",
          stakeholder: "Ayurvedic Stores",
          blockchainHash: null,
          verified: false,
          description: "Scheduled for retail distribution"
        }
      ]
    }
  ];

  const getStageIcon = (stageId) => {
    const icons = {
      collection: 'Leaf',
      testing: 'FlaskConical',
      processing: 'Settings',
      packaging: 'Package',
      distribution: 'Truck',
      retail: 'Store'
    };
    return icons?.[stageId] || 'Circle';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in_progress': return 'text-warning';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'in_progress': return 'bg-warning';
      case 'pending': return 'bg-muted-foreground';
      default: return 'bg-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Pending';
    return new Date(timestamp)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const currentBatch = selectedBatch ? mockTimelineData?.find(b => b?.batchNumber === selectedBatch) : mockTimelineData?.[0];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Supply Chain Timeline</h2>
          <p className="text-sm text-muted-foreground">
            Track product journey from collection to retail
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={timelineView === 'journey' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimelineView('journey')}
          >
            Journey View
          </Button>
          <Button
            variant={timelineView === 'blockchain' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimelineView('blockchain')}
          >
            Blockchain View
          </Button>
        </div>
      </div>
      {/* Batch Selector */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          {mockTimelineData?.map((batch) => (
            <Button
              key={batch?.id}
              variant={currentBatch?.batchNumber === batch?.batchNumber ? 'default' : 'outline'}
              size="sm"
              onClick={() => onBatchSelect(batch?.batchNumber)}
              className="whitespace-nowrap"
            >
              {batch?.batchNumber} - {batch?.herbType}
            </Button>
          ))}
        </div>
      </div>
      {/* Timeline Visualization */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-8 left-8 right-8 h-0.5 bg-border" />
        <div 
          className="absolute top-8 left-8 h-0.5 bg-primary transition-all duration-500"
          style={{ 
            width: `${(currentBatch?.stages?.filter(s => s?.status === 'completed')?.length / currentBatch?.stages?.length) * 100}%` 
          }}
        />

        {/* Timeline Stages */}
        <div className="grid grid-cols-6 gap-4">
          {currentBatch?.stages?.map((stage, index) => (
            <div key={stage?.id} className="relative">
              {/* Stage Icon */}
              <div className={`
                w-16 h-16 rounded-full border-4 flex items-center justify-center mx-auto mb-4
                ${stage?.status === 'completed' ? 'bg-success border-success' : 
                  stage?.status === 'in_progress'? 'bg-warning border-warning' : 'bg-background border-border'}
              `}>
                <Icon 
                  name={getStageIcon(stage?.id)} 
                  size={24} 
                  color={stage?.status === 'pending' ? 'var(--color-muted-foreground)' : 'white'} 
                />
              </div>

              {/* Stage Details */}
              <div className="text-center space-y-2">
                <h3 className="font-medium text-foreground text-sm">{stage?.name}</h3>
                <p className="text-xs text-muted-foreground">{formatTimestamp(stage?.timestamp)}</p>
                
                {timelineView === 'blockchain' && stage?.blockchainHash && (
                  <div className="flex items-center justify-center space-x-1">
                    <Icon name="Link" size={12} className="text-primary" />
                    <span className="text-xs font-mono text-primary">
                      {stage?.blockchainHash?.slice(0, 8)}...
                    </span>
                  </div>
                )}

                {/* Verification Badge */}
                {stage?.verified && (
                  <div className="flex items-center justify-center">
                    <div className="verification-badge verified">
                      <Icon name="ShieldCheck" size={12} />
                      <span className="ml-1">Verified</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Stage Details Card (on hover/click) */}
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-64 bg-popover border border-border rounded-lg shadow-clinical p-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-10">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{stage?.name}</span>
                    <div className={`w-2 h-2 rounded-full ${getStatusBgColor(stage?.status)}`} />
                  </div>
                  <p className="text-xs text-muted-foreground">{stage?.description}</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="text-foreground">{stage?.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stakeholder:</span>
                      <span className="text-foreground">{stage?.stakeholder}</span>
                    </div>
                    {stage?.blockchainHash && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tx Hash:</span>
                        <span className="text-primary font-mono">{stage?.blockchainHash?.slice(0, 12)}...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Current Stage Details */}
      <div className="mt-8 p-4 bg-surface rounded-lg border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-foreground">Current Stage: {currentBatch?.stages?.find(s => s?.status === 'in_progress')?.name || 'Completed'}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {currentBatch?.stages?.find(s => s?.status === 'in_progress')?.description || 'All stages completed successfully'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {currentBatch?.stages?.filter(s => s?.status === 'completed')?.length} of {currentBatch?.stages?.length} Complete
              </p>
              <p className="text-xs text-muted-foreground">
                {Math.round((currentBatch?.stages?.filter(s => s?.status === 'completed')?.length / currentBatch?.stages?.length) * 100)}% Progress
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">
                {Math.round((currentBatch?.stages?.filter(s => s?.status === 'completed')?.length / currentBatch?.stages?.length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTimeline;