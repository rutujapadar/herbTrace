import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CertificationStatus = () => {
  const certifications = [
    {
      id: 1,
      name: 'Organic Certification',
      issuer: 'NPOP India',
      status: 'active',
      expiryDate: '2024-12-15',
      certificateNumber: 'ORG/2023/001234',
      icon: 'Leaf'
    },
    {
      id: 2,
      name: 'Good Collection Practices',
      issuer: 'AYUSH Ministry',
      status: 'active',
      expiryDate: '2024-10-30',
      certificateNumber: 'GCP/2023/005678',
      icon: 'Award'
    },
    {
      id: 3,
      name: 'Sustainable Harvesting',
      issuer: 'Forest Department',
      status: 'expiring',
      expiryDate: '2024-09-15',
      certificateNumber: 'SH/2023/009876',
      icon: 'TreePine'
    },
    {
      id: 4,
      name: 'Quality Assurance',
      issuer: 'Herbal Board',
      status: 'expired',
      expiryDate: '2024-08-01',
      certificateNumber: 'QA/2023/001122',
      icon: 'ShieldCheck'
    }
  ];

  const getStatusConfig = (status, expiryDate) => {
    const daysUntilExpiry = Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    
    if (status === 'expired' || daysUntilExpiry < 0) {
      return { 
        color: 'text-error bg-error/10 border-error/20', 
        label: 'Expired', 
        icon: 'XCircle',
        urgency: 'high'
      };
    } else if (status === 'expiring' || daysUntilExpiry <= 30) {
      return { 
        color: 'text-warning bg-warning/10 border-warning/20', 
        label: `Expires in ${daysUntilExpiry} days`, 
        icon: 'AlertTriangle',
        urgency: 'medium'
      };
    } else {
      return { 
        color: 'text-success bg-success/10 border-success/20', 
        label: 'Active', 
        icon: 'CheckCircle',
        urgency: 'low'
      };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const activeCertifications = certifications?.filter(cert => {
    const config = getStatusConfig(cert?.status, cert?.expiryDate);
    return config?.urgency !== 'high';
  })?.length;

  const expiringCertifications = certifications?.filter(cert => {
    const config = getStatusConfig(cert?.status, cert?.expiryDate);
    return config?.urgency === 'medium';
  })?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Certification Status</h3>
        <Button variant="ghost" size="sm" iconName="ExternalLink" iconSize={16} />
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <div>
              <p className="text-lg font-bold text-success">{activeCertifications}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <div>
              <p className="text-lg font-bold text-warning">{expiringCertifications}</p>
              <p className="text-xs text-muted-foreground">Expiring</p>
            </div>
          </div>
        </div>
      </div>
      {/* Certifications List */}
      <div className="space-y-3">
        {certifications?.map((cert) => {
          const statusConfig = getStatusConfig(cert?.status, cert?.expiryDate);
          
          return (
            <div 
              key={cert?.id} 
              className={`p-4 rounded-lg border transition-all duration-200 ${
                statusConfig?.urgency === 'high' ?'bg-error/5 border-error/20' 
                  : statusConfig?.urgency === 'medium' ?'bg-warning/5 border-warning/20' :'bg-surface border-border hover:bg-accent'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    statusConfig?.urgency === 'high' ?'bg-error/20' 
                      : statusConfig?.urgency === 'medium' ?'bg-warning/20' :'bg-success/20'
                  }`}>
                    <Icon 
                      name={cert?.icon} 
                      size={20} 
                      className={
                        statusConfig?.urgency === 'high' ?'text-error' 
                          : statusConfig?.urgency === 'medium' ?'text-warning' :'text-success'
                      } 
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{cert?.name}</h4>
                    <p className="text-xs text-muted-foreground">{cert?.issuer}</p>
                  </div>
                </div>
                
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig?.color}`}>
                  <Icon name={statusConfig?.icon} size={12} />
                  <span>{statusConfig?.label}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Certificate No:</span>
                  <span className="font-mono text-foreground">{cert?.certificateNumber}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Expires:</span>
                  <span className="text-foreground">{formatDate(cert?.expiryDate)}</span>
                </div>
              </div>
              {statusConfig?.urgency !== 'low' && (
                <div className="mt-3 flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RefreshCw"
                    iconPosition="left"
                    iconSize={14}
                    className="text-xs h-7 flex-1"
                  >
                    Renew
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    iconSize={14}
                    className="h-7"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Action Footer */}
      <div className="mt-6 p-4 bg-surface rounded-lg border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Need Help with Certifications?</p>
            <p className="text-xs text-muted-foreground">Get guidance on renewal process</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="HelpCircle"
            iconPosition="left"
            iconSize={16}
          >
            Get Help
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificationStatus;