import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TestingQueue = ({ onSelectBatch, selectedBatchId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('pending');

  const mockBatches = [
    {
      id: 'HT-2024-001',
      herbType: 'Ashwagandha',
      scientificName: 'Withania somnifera',
      collectionDate: '2024-08-25',
      collectorName: 'Rajesh Kumar',
      location: 'Kerala, India',
      quantity: '25.5 kg',
      requiredTests: ['Purity Analysis', 'Heavy Metal Screening', 'Microbial Testing'],
      priority: 'high',
      status: 'pending',
      estimatedTime: '4-6 hours',
      receivedDate: '2024-08-28',
      qrCode: 'QR-HT-2024-001'
    },
    {
      id: 'HT-2024-002',
      herbType: 'Turmeric',
      scientificName: 'Curcuma longa',
      collectionDate: '2024-08-24',
      collectorName: 'Priya Sharma',
      location: 'Tamil Nadu, India',
      quantity: '18.2 kg',
      requiredTests: ['Curcumin Content', 'Pesticide Residue', 'Moisture Analysis'],
      priority: 'medium',
      status: 'pending',
      estimatedTime: '3-4 hours',
      receivedDate: '2024-08-29',
      qrCode: 'QR-HT-2024-002'
    },
    {
      id: 'HT-2024-003',
      herbType: 'Brahmi',
      scientificName: 'Bacopa monnieri',
      collectionDate: '2024-08-26',
      collectorName: 'Amit Patel',
      location: 'Gujarat, India',
      quantity: '12.8 kg',
      requiredTests: ['Bacosides Analysis', 'Heavy Metal Screening', 'Aflatoxin Testing'],
      priority: 'urgent',
      status: 'in-progress',
      estimatedTime: '2-3 hours',
      receivedDate: '2024-08-27',
      qrCode: 'QR-HT-2024-003'
    },
    {
      id: 'HT-2024-004',
      herbType: 'Neem',
      scientificName: 'Azadirachta indica',
      collectionDate: '2024-08-23',
      collectorName: 'Sunita Devi',
      location: 'Rajasthan, India',
      quantity: '30.1 kg',
      requiredTests: ['Azadirachtin Content', 'Microbial Testing', 'Moisture Analysis'],
      priority: 'low',
      status: 'pending',
      estimatedTime: '5-7 hours',
      receivedDate: '2024-08-30',
      qrCode: 'QR-HT-2024-004'
    },
    {
      id: 'HT-2024-005',
      herbType: 'Triphala Mix',
      scientificName: 'Terminalia chebula, T. bellirica, Emblica officinalis',
      collectionDate: '2024-08-22',
      collectorName: 'Vikram Singh',
      location: 'Uttarakhand, India',
      quantity: '22.7 kg',
      requiredTests: ['Tannin Content', 'Heavy Metal Screening', 'Pesticide Residue'],
      priority: 'medium',
      status: 'completed',
      estimatedTime: '4-5 hours',
      receivedDate: '2024-08-26',
      qrCode: 'QR-HT-2024-005'
    }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const filteredBatches = useMemo(() => {
    return mockBatches?.filter(batch => {
      const matchesSearch = batch?.herbType?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           batch?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           batch?.collectorName?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesPriority = priorityFilter === 'all' || batch?.priority === priorityFilter;
      const matchesStatus = statusFilter === 'all' || batch?.status === statusFilter;
      
      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [searchTerm, priorityFilter, statusFilter]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-error text-error-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      case 'low': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'in-progress': return 'bg-primary/10 text-primary border-primary/20';
      case 'completed': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Testing Queue</h2>
            <p className="text-sm text-muted-foreground">
              {filteredBatches?.length} batches in queue
            </p>
          </div>
          <Button
            variant="outline"
            iconName="QrCode"
            iconPosition="left"
            iconSize={16}
          >
            Scan Batch
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search by batch ID, herb type, or collector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          <Select
            options={priorityOptions}
            value={priorityFilter}
            onChange={setPriorityFilter}
            placeholder="Filter by priority"
          />
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
        </div>
      </div>
      {/* Queue List */}
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {filteredBatches?.map((batch) => (
          <div
            key={batch?.id}
            className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
              selectedBatchId === batch?.id ? 'bg-accent border-l-4 border-l-primary' : ''
            }`}
            onClick={() => onSelectBatch(batch)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium text-foreground">{batch?.id}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(batch?.priority)}`}>
                    {batch?.priority?.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(batch?.status)}`}>
                    {batch?.status?.replace('-', ' ')?.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-foreground font-medium">{batch?.herbType}</p>
                    <p className="text-muted-foreground italic">{batch?.scientificName}</p>
                    <p className="text-muted-foreground">Collector: {batch?.collectorName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Collection: {batch?.collectionDate}</p>
                    <p className="text-muted-foreground">Received: {batch?.receivedDate}</p>
                    <p className="text-muted-foreground">Quantity: {batch?.quantity}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-1">Required Tests:</p>
                  <div className="flex flex-wrap gap-1">
                    {batch?.requiredTests?.map((test, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-surface text-xs rounded border"
                      >
                        {test}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">
                    Est. Time: {batch?.estimatedTime}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{batch?.location}</span>
                  </div>
                </div>
              </div>

              <div className="ml-4 flex flex-col items-end space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Play"
                  iconPosition="left"
                  iconSize={14}
                  disabled={batch?.status === 'completed'}
                >
                  {batch?.status === 'pending' ? 'Start Test' : 
                   batch?.status === 'in-progress' ? 'Continue' : 'View Results'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  iconSize={14}
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredBatches?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="FlaskConical" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No batches found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default TestingQueue;