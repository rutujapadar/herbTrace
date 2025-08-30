import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ActiveShipmentsTable = ({ onShipmentSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedRow, setExpandedRow] = useState(null);

  const mockShipments = [
    {
      id: 1,
      batchNumber: "HT-2024-001",
      herbType: "Ashwagandha",
      origin: "Uttarakhand, India",
      currentLocation: "Mumbai Processing Unit",
      destination: "Delhi Distribution Center",
      status: "in_transit",
      estimatedArrival: "2024-08-30T14:00:00Z",
      actualDeparture: "2024-08-28T10:15:00Z",
      temperature: "22°C",
      humidity: "45%",
      gpsCoordinates: { lat: 19.0760, lng: 72.8777 },
      carrier: "HerbTrace Logistics",
      trackingNumber: "HT-TRK-001",
      blockchainTxs: 3,
      custodyChain: [
        {
          stakeholder: "Ramesh Kumar",
          role: "Collector",
          timestamp: "2024-08-25T08:30:00Z",
          signature: "0x1a2b3c4d",
          location: "Uttarakhand Farm"
        },
        {
          stakeholder: "Dr. Priya Sharma",
          role: "Lab Technician",
          timestamp: "2024-08-26T14:20:00Z",
          signature: "0x2b3c4d5e",
          location: "Delhi Testing Lab"
        },
        {
          stakeholder: "Ayurveda Industries Ltd",
          role: "Processor",
          timestamp: "2024-08-28T10:15:00Z",
          signature: "0x3c4d5e6f",
          location: "Mumbai Processing Unit"
        }
      ]
    },
    {
      id: 2,
      batchNumber: "HT-2024-002",
      herbType: "Turmeric",
      origin: "Kerala, India",
      currentLocation: "En route to Chennai",
      destination: "Chennai Retail Network",
      status: "in_transit",
      estimatedArrival: "2024-08-31T09:00:00Z",
      actualDeparture: "2024-08-28T07:00:00Z",
      temperature: "18°C",
      humidity: "40%",
      gpsCoordinates: { lat: 11.0168, lng: 76.9558 },
      carrier: "Express Logistics",
      trackingNumber: "EXP-TRK-002",
      blockchainTxs: 5,
      custodyChain: [
        {
          stakeholder: "Spice Farmers Collective",
          role: "Collector",
          timestamp: "2024-08-20T09:00:00Z",
          signature: "0x4d5e6f78",
          location: "Kerala Farm"
        },
        {
          stakeholder: "Quality Labs India",
          role: "Lab Technician",
          timestamp: "2024-08-22T11:30:00Z",
          signature: "0x5e6f7890",
          location: "Kochi Testing Facility"
        }
      ]
    },
    {
      id: 3,
      batchNumber: "HT-2024-003",
      herbType: "Brahmi",
      origin: "Tamil Nadu, India",
      currentLocation: "Bangalore Processing",
      destination: "Hyderabad Distribution",
      status: "processing",
      estimatedArrival: "2024-09-02T16:00:00Z",
      actualDeparture: null,
      temperature: "20°C",
      humidity: "50%",
      gpsCoordinates: { lat: 12.9716, lng: 77.5946 },
      carrier: "Regional Transport",
      trackingNumber: "RT-TRK-003",
      blockchainTxs: 2,
      custodyChain: [
        {
          stakeholder: "Tamil Herb Collective",
          role: "Collector",
          timestamp: "2024-08-27T07:30:00Z",
          signature: "0x6f789012",
          location: "Tamil Nadu Farm"
        }
      ]
    },
    {
      id: 4,
      batchNumber: "HT-2024-004",
      herbType: "Neem",
      origin: "Rajasthan, India",
      currentLocation: "Quality Control",
      destination: "Mumbai Retail",
      status: "quality_check",
      estimatedArrival: "2024-09-01T12:00:00Z",
      actualDeparture: null,
      temperature: "25°C",
      humidity: "35%",
      gpsCoordinates: { lat: 26.9124, lng: 75.7873 },
      carrier: "Desert Logistics",
      trackingNumber: "DL-TRK-004",
      blockchainTxs: 4,
      custodyChain: [
        {
          stakeholder: "Desert Herb Co.",
          role: "Collector",
          timestamp: "2024-08-26T06:00:00Z",
          signature: "0x78901234",
          location: "Rajasthan Farm"
        },
        {
          stakeholder: "Rajasthan Quality Labs",
          role: "Lab Technician",
          timestamp: "2024-08-28T15:45:00Z",
          signature: "0x89012345",
          location: "Jaipur Testing Center"
        }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_transit': return 'text-primary';
      case 'processing': return 'text-warning';
      case 'quality_check': return 'text-secondary';
      case 'delivered': return 'text-success';
      case 'delayed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      in_transit: 'bg-primary/10 text-primary border-primary/20',
      processing: 'bg-warning/10 text-warning border-warning/20',
      quality_check: 'bg-secondary/10 text-secondary border-secondary/20',
      delivered: 'bg-success/10 text-success border-success/20',
      delayed: 'bg-error/10 text-error border-error/20'
    };

    const labels = {
      in_transit: 'In Transit',
      processing: 'Processing',
      quality_check: 'Quality Check',
      delivered: 'Delivered',
      delayed: 'Delayed'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors?.[status] || 'bg-muted text-muted-foreground'}`}>
        {labels?.[status] || status}
      </span>
    );
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredShipments = mockShipments?.filter(shipment => {
    const matchesSearch = shipment?.batchNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         shipment?.herbType?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         shipment?.origin?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesFilter = filterStatus === 'all' || shipment?.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const toggleRowExpansion = (shipmentId) => {
    setExpandedRow(expandedRow === shipmentId ? null : shipmentId);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Active Shipments</h2>
            <p className="text-sm text-muted-foreground">
              Monitor real-time shipment status and locations
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              Export
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              New Shipment
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search by batch, herb type, or origin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'in_transit' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('in_transit')}
            >
              In Transit
            </Button>
            <Button
              variant={filterStatus === 'processing' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('processing')}
            >
              Processing
            </Button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-foreground">Batch Details</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Current Location</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">ETA</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Blockchain</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShipments?.map((shipment) => (
              <React.Fragment key={shipment?.id}>
                <tr className="border-b border-border hover:bg-surface/50 transition-colors">
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{shipment?.batchNumber}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleRowExpansion(shipment?.id)}
                          className="w-6 h-6"
                        >
                          <Icon 
                            name={expandedRow === shipment?.id ? "ChevronUp" : "ChevronDown"} 
                            size={16} 
                          />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{shipment?.herbType}</p>
                      <p className="text-xs text-muted-foreground">From: {shipment?.origin}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">{shipment?.currentLocation}</p>
                      <p className="text-xs text-muted-foreground">To: {shipment?.destination}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Icon name="Thermometer" size={12} />
                        <span>{shipment?.temperature}</span>
                        <Icon name="Droplets" size={12} />
                        <span>{shipment?.humidity}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(shipment?.status)}
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm text-foreground">{formatDateTime(shipment?.estimatedArrival)}</p>
                      {shipment?.actualDeparture && (
                        <p className="text-xs text-muted-foreground">
                          Departed: {formatDateTime(shipment?.actualDeparture)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full blockchain-status-pulse" />
                      <span className="text-sm text-foreground">{shipment?.blockchainTxs} Txns</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="MapPin"
                        iconSize={16}
                        onClick={() => {
                          // Handle GPS tracking
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Eye"
                        iconSize={16}
                        onClick={() => onShipmentSelect(shipment?.batchNumber)}
                      />
                    </div>
                  </td>
                </tr>

                {/* Expanded Row Details */}
                {expandedRow === shipment?.id && (
                  <tr className="bg-surface/30">
                    <td colSpan="6" className="p-6">
                      <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Custody Chain</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {shipment?.custodyChain?.map((custody, index) => (
                            <div key={index} className="p-4 bg-card border border-border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-foreground">{custody?.stakeholder}</span>
                                <span className="text-xs text-muted-foreground">{custody?.role}</span>
                              </div>
                              <div className="space-y-1 text-xs text-muted-foreground">
                                <p>Location: {custody?.location}</p>
                                <p>Time: {formatDateTime(custody?.timestamp)}</p>
                                <div className="flex items-center space-x-2">
                                  <Icon name="ShieldCheck" size={12} className="text-success" />
                                  <span className="font-mono">{custody?.signature}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Additional Details */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                          <div>
                            <p className="text-xs text-muted-foreground">Carrier</p>
                            <p className="text-sm font-medium text-foreground">{shipment?.carrier}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Tracking Number</p>
                            <p className="text-sm font-medium text-foreground font-mono">{shipment?.trackingNumber}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">GPS Coordinates</p>
                            <p className="text-sm font-medium text-foreground font-mono">
                              {shipment?.gpsCoordinates?.lat?.toFixed(4)}, {shipment?.gpsCoordinates?.lng?.toFixed(4)}
                            </p>
                          </div>
                          <div>
                            <Button
                              variant="outline"
                              size="sm"
                              iconName="ExternalLink"
                              iconPosition="left"
                              iconSize={14}
                              onClick={() => {
                                // Open GPS tracking in new window
                                window.open(`https://www.google.com/maps?q=${shipment?.gpsCoordinates?.lat},${shipment?.gpsCoordinates?.lng}&z=14&output=embed`, '_blank');
                              }}
                            >
                              View on Map
                            </Button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Empty State */}
      {filteredShipments?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No shipments found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search criteria' : 'No active shipments at the moment'}
          </p>
          <Button variant="outline" onClick={() => setSearchTerm('')}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActiveShipmentsTable;