import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentCollectionsTable = ({ collections, onRetrySubmission, onViewDetails }) => {
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { color: 'text-success bg-success/10 border-success/20', icon: 'CheckCircle', label: 'Confirmed' },
      pending: { color: 'text-warning bg-warning/10 border-warning/20', icon: 'Clock', label: 'Pending' },
      failed: { color: 'text-error bg-error/10 border-error/20', icon: 'XCircle', label: 'Failed' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;

    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </div>
    );
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCollections = [...collections]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (sortField === 'timestamp') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Collections</h2>
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={16}
          >
            Refresh
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-accent" onClick={() => handleSort('herbType')}>
                <div className="flex items-center space-x-1">
                  <span>Herb Type</span>
                  <Icon name="ArrowUpDown" size={12} />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-accent" onClick={() => handleSort('quantity')}>
                <div className="flex items-center space-x-1">
                  <span>Quantity</span>
                  <Icon name="ArrowUpDown" size={12} />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-accent" onClick={() => handleSort('timestamp')}>
                <div className="flex items-center space-x-1">
                  <span>Collected</span>
                  <Icon name="ArrowUpDown" size={12} />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Blockchain Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedCollections?.map((collection) => (
              <tr key={collection?.id} className="hover:bg-surface transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                      <Icon name="Leaf" size={16} className="text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{collection?.herbType}</p>
                      <p className="text-xs text-muted-foreground">{collection?.scientificName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{collection?.quantity} kg</div>
                  <div className="text-xs text-muted-foreground">Grade {collection?.qualityGrade}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{collection?.location}</div>
                  <div className="text-xs text-muted-foreground">{collection?.coordinates}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{formatTimestamp(collection?.timestamp)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    {getStatusBadge(collection?.blockchainStatus)}
                    {collection?.transactionHash && (
                      <div className="text-xs text-muted-foreground font-mono">
                        {collection?.transactionHash?.substring(0, 10)}...
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconSize={16}
                      onClick={() => onViewDetails(collection?.id)}
                    />
                    {collection?.blockchainStatus === 'failed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="RefreshCw"
                        iconSize={16}
                        onClick={() => onRetrySubmission(collection?.id)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {collections?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Collections Yet</h3>
          <p className="text-muted-foreground mb-4">Start by recording your first herb collection</p>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Record Collection
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentCollectionsTable;