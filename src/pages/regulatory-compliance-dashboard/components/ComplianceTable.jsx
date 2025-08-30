import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceTable = ({ data, onRowExpand, expandedRows }) => {
  const [sortField, setSortField] = useState('complianceScore');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    
    if (typeof aValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue?.localeCompare(bValue)
        : bValue?.localeCompare(aValue);
    }
    
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'compliant': { color: 'bg-success/10 text-success border-success/20', label: 'Compliant' },
      'pending': { color: 'bg-warning/10 text-warning border-warning/20', label: 'Pending Review' },
      'violation': { color: 'bg-error/10 text-error border-error/20', label: 'Violation' },
      'expired': { color: 'bg-muted/10 text-muted-foreground border-muted/20', label: 'Expired' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getComplianceScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-accent"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <Icon 
          name={sortField === field ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
          size={14} 
        />
      </div>
    </th>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface">
            <tr>
              <SortableHeader field="entityName">Entity Name</SortableHeader>
              <SortableHeader field="entityType">Type</SortableHeader>
              <SortableHeader field="location">Location</SortableHeader>
              <SortableHeader field="registrationStatus">Registration</SortableHeader>
              <SortableHeader field="certificationStatus">Certification</SortableHeader>
              <SortableHeader field="complianceScore">Score</SortableHeader>
              <SortableHeader field="lastActivity">Last Activity</SortableHeader>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedData?.map((entity) => (
              <React.Fragment key={entity?.id}>
                <tr className="hover:bg-accent/50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        entity?.entityType === 'collector' ? 'bg-success/10 text-success' :
                        entity?.entityType === 'laboratory' ? 'bg-primary/10 text-primary' :
                        entity?.entityType === 'supply_chain'? 'bg-warning/10 text-warning' : 'bg-secondary/10 text-secondary'
                      }`}>
                        <Icon 
                          name={
                            entity?.entityType === 'collector' ? 'Leaf' :
                            entity?.entityType === 'laboratory' ? 'FlaskConical' :
                            entity?.entityType === 'supply_chain'? 'Truck' : 'Building'
                          } 
                          size={16} 
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{entity?.entityName}</p>
                        <p className="text-xs text-muted-foreground">ID: {entity?.entityId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-foreground capitalize">{entity?.entityType?.replace('_', ' ')}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{entity?.location}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(entity?.registrationStatus)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(entity?.certificationStatus)}
                      {entity?.certificationExpiry && (
                        <span className="text-xs text-muted-foreground">
                          Exp: {entity?.certificationExpiry}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getComplianceScoreColor(entity?.complianceScore)}`}>
                        {entity?.complianceScore}%
                      </span>
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${
                            entity?.complianceScore >= 90 ? 'bg-success' :
                            entity?.complianceScore >= 70 ? 'bg-warning': 'bg-error'
                          }`}
                          style={{ width: `${entity?.complianceScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-foreground">{entity?.lastActivity}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRowExpand(entity?.id)}
                        iconName={expandedRows?.includes(entity?.id) ? "ChevronUp" : "ChevronDown"}
                        iconSize={16}
                      >
                        Details
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ExternalLink"
                        iconSize={16}
                      >
                        Audit
                      </Button>
                    </div>
                  </td>
                </tr>
                
                {expandedRows?.includes(entity?.id) && (
                  <tr>
                    <td colSpan="8" className="px-4 py-4 bg-surface">
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Audit Trail & Details</h4>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <h5 className="text-xs font-medium text-muted-foreground uppercase">Recent Transactions</h5>
                            {entity?.recentTransactions?.map((tx, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-card rounded border">
                                <div className="flex items-center space-x-2">
                                  <Icon name="Link" size={14} className="text-primary" />
                                  <div>
                                    <p className="text-xs font-mono text-foreground">{tx?.hash}</p>
                                    <p className="text-xs text-muted-foreground">{tx?.type}</p>
                                  </div>
                                </div>
                                <span className="text-xs text-muted-foreground">{tx?.timestamp}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="space-y-3">
                            <h5 className="text-xs font-medium text-muted-foreground uppercase">Compliance History</h5>
                            {entity?.complianceHistory?.map((event, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-card rounded border">
                                <div className="flex items-center space-x-2">
                                  <Icon 
                                    name={event?.type === 'violation' ? 'AlertTriangle' : 'CheckCircle'} 
                                    size={14} 
                                    className={event?.type === 'violation' ? 'text-error' : 'text-success'} 
                                  />
                                  <div>
                                    <p className="text-xs text-foreground">{event?.description}</p>
                                    <p className="text-xs text-muted-foreground">{event?.date}</p>
                                  </div>
                                </div>
                                {getStatusBadge(event?.status)}
                              </div>
                            ))}
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
    </div>
  );
};

export default ComplianceTable;