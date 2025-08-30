import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const VerificationHistory = ({ onSelectProduct, onClearHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockHistory = [
    {
      id: 1,
      batchId: "BTC-2024-08-001",
      productName: "Organic Ashwagandha Root Powder",
      scientificName: "Withania somnifera",
      verificationDate: "2024-08-30T10:30:00Z",
      status: "verified",
      thumbnail: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?w=100&h=100&fit=crop",
      origin: "Rajasthan, India",
      purityScore: 98.5
    },
    {
      id: 2,
      batchId: "BTC-2024-08-002",
      productName: "Organic Turmeric Powder",
      scientificName: "Curcuma longa",
      verificationDate: "2024-08-29T15:45:00Z",
      status: "verified",
      thumbnail: "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?w=100&h=100&fit=crop",
      origin: "Kerala, India",
      purityScore: 96.8
    },
    {
      id: 3,
      batchId: "BTC-2024-08-003",
      productName: "Organic Brahmi Leaves",
      scientificName: "Bacopa monnieri",
      verificationDate: "2024-08-28T09:15:00Z",
      status: "pending",
      thumbnail: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?w=100&h=100&fit=crop",
      origin: "Tamil Nadu, India",
      purityScore: null
    },
    {
      id: 4,
      batchId: "BTC-2024-08-004",
      productName: "Organic Neem Powder",
      scientificName: "Azadirachta indica",
      verificationDate: "2024-08-27T14:20:00Z",
      status: "verified",
      thumbnail: "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?w=100&h=100&fit=crop",
      origin: "Gujarat, India",
      purityScore: 97.2
    },
    {
      id: 5,
      batchId: "BTC-2024-08-005",
      productName: "Organic Triphala Powder",
      scientificName: "Terminalia chebula mix",
      verificationDate: "2024-08-26T11:30:00Z",
      status: "failed",
      thumbnail: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?w=100&h=100&fit=crop",
      origin: "Madhya Pradesh, India",
      purityScore: null
    }
  ];

  const filteredHistory = mockHistory?.filter(item =>
    item?.productName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    item?.batchId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    item?.scientificName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const getStatusConfig = (status) => {
    switch (status) {
      case 'verified':
        return {
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          icon: 'CheckCircle',
          label: 'Verified'
        };
      case 'pending':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          icon: 'Clock',
          label: 'Pending'
        };
      case 'failed':
        return {
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          icon: 'XCircle',
          label: 'Failed'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          borderColor: 'border-muted/20',
          icon: 'HelpCircle',
          label: 'Unknown'
        };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date?.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">Verification History</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearHistory}
            iconName="Trash2"
            iconPosition="left"
            className="text-error hover:text-error"
          >
            Clear All
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by product name, batch ID, or scientific name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      {/* History List */}
      <div className="p-4 space-y-4">
        {filteredHistory?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="History" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchTerm ? 'No matching results' : 'No verification history'}
            </h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? 'Try adjusting your search terms' :'Start scanning products to build your verification history'
              }
            </p>
          </div>
        ) : (
          filteredHistory?.map((item) => {
            const statusConfig = getStatusConfig(item?.status);
            
            return (
              <div
                key={item?.id}
                onClick={() => onSelectProduct(item)}
                className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:shadow-clinical transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <Image
                    src={item?.thumbnail}
                    alt={item?.productName}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground truncate">
                          {item?.productName}
                        </h3>
                        <p className="text-sm text-muted-foreground italic">
                          {item?.scientificName}
                        </p>
                      </div>
                      
                      {/* Status Badge */}
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig?.bgColor} ${statusConfig?.borderColor} border`}>
                        <Icon name={statusConfig?.icon} size={12} className={statusConfig?.color} />
                        <span className={statusConfig?.color}>{statusConfig?.label}</span>
                      </div>
                    </div>

                    {/* Batch and Origin Info */}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <Icon name="Package" size={14} />
                        <span className="font-mono">{item?.batchId}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} />
                        <span>{item?.origin}</span>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Purity Score */}
                        {item?.purityScore && (
                          <div className="flex items-center space-x-1">
                            <Icon name="Award" size={14} className="text-success" />
                            <span className="text-sm font-medium text-success">
                              {item?.purityScore}% Pure
                            </span>
                          </div>
                        )}
                        
                        {/* Verification Date */}
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Icon name="Clock" size={12} />
                          <span>{formatDate(item?.verificationDate)}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ChevronRight"
                        iconSize={16}
                        className="text-muted-foreground hover:text-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Statistics Footer */}
      {filteredHistory?.length > 0 && (
        <div className="p-4 bg-surface border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-foreground">
                {filteredHistory?.filter(item => item?.status === 'verified')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Verified</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">
                {filteredHistory?.filter(item => item?.status === 'pending')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">
                {filteredHistory?.filter(item => item?.status === 'failed')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Failed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationHistory;