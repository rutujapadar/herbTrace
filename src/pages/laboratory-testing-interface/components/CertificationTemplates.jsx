import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CertificationTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const templates = [
    {
      id: 'ayurvedic-standard',
      name: 'Ayurvedic Quality Certificate',
      description: 'Standard certificate for Ayurvedic herbs with purity and safety parameters',
      category: 'Standard',
      parameters: ['Purity Analysis', 'Heavy Metal Screening', 'Microbial Testing', 'Moisture Content'],
      validityPeriod: '2 years',
      blockchainEnabled: true,
      qrCodeEnabled: true
    },
    {
      id: 'organic-certification',
      name: 'Organic Herb Certificate',
      description: 'Certification for organically grown herbs with pesticide residue testing',
      category: 'Organic',
      parameters: ['Pesticide Residue', 'Heavy Metal Screening', 'Organic Compound Analysis'],
      validityPeriod: '1 year',
      blockchainEnabled: true,
      qrCodeEnabled: true
    },
    {
      id: 'potency-certificate',
      name: 'Potency Verification Certificate',
      description: 'Certificate focusing on bioactive compound concentration and potency',
      category: 'Potency',
      parameters: ['Bioactive Compounds', 'Standardized Extract', 'Potency Rating'],
      validityPeriod: '18 months',
      blockchainEnabled: true,
      qrCodeEnabled: true
    },
    {
      id: 'safety-compliance',
      name: 'Safety Compliance Certificate',
      description: 'Comprehensive safety certificate with all contamination screening',
      category: 'Safety',
      parameters: ['Heavy Metal Screening', 'Microbial Testing', 'Aflatoxin Testing', 'Pesticide Residue'],
      validityPeriod: '2 years',
      blockchainEnabled: true,
      qrCodeEnabled: true
    },
    {
      id: 'export-quality',
      name: 'Export Quality Certificate',
      description: 'International standard certificate for export requirements',
      category: 'Export',
      parameters: ['All Standard Tests', 'International Compliance', 'Traceability Verification'],
      validityPeriod: '6 months',
      blockchainEnabled: true,
      qrCodeEnabled: true
    }
  ];

  const recentCertificates = [
    {
      id: 'CERT-2024-001',
      batchId: 'HT-2024-003',
      herbType: 'Brahmi',
      template: 'Ayurvedic Quality Certificate',
      issuedDate: '2024-08-29',
      status: 'active',
      blockchainTx: '0x1a2b3c4d5e6f...',
      qrCode: 'QR-CERT-2024-001'
    },
    {
      id: 'CERT-2024-002',
      batchId: 'HT-2024-005',
      herbType: 'Triphala Mix',
      template: 'Organic Herb Certificate',
      issuedDate: '2024-08-28',
      status: 'active',
      blockchainTx: '0x2b3c4d5e6f7a...',
      qrCode: 'QR-CERT-2024-002'
    },
    {
      id: 'CERT-2024-003',
      batchId: 'HT-2024-001',
      herbType: 'Ashwagandha',
      template: 'Potency Verification Certificate',
      issuedDate: '2024-08-27',
      status: 'pending',
      blockchainTx: null,
      qrCode: 'QR-CERT-2024-003'
    }
  ];

  const templateOptions = templates?.map(template => ({
    value: template?.id,
    label: template?.name,
    description: template?.description
  }));

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Standard': return 'bg-primary text-primary-foreground';
      case 'Organic': return 'bg-success text-success-foreground';
      case 'Potency': return 'bg-warning text-warning-foreground';
      case 'Safety': return 'bg-error text-error-foreground';
      case 'Export': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'expired': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const handleGenerateCertificate = () => {
    if (!selectedTemplate) return;
    
    // Simulate certificate generation
    console.log('Generating certificate with template:', selectedTemplate);
    // This would typically trigger the certificate generation process
  };

  const renderTemplatePreview = () => {
    const template = templates?.find(t => t?.id === selectedTemplate);
    if (!template) return null;

    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Award" size={32} color="white" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{template?.name}</h3>
          <p className="text-sm text-muted-foreground">{template?.description}</p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Category:</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template?.category)}`}>
                {template?.category}
              </span>
            </div>
            <div>
              <p className="text-muted-foreground">Validity:</p>
              <p className="text-foreground font-medium">{template?.validityPeriod}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Included Parameters:</p>
            <div className="flex flex-wrap gap-2">
              {template?.parameters?.map((param, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-background text-xs rounded border"
                >
                  {param}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon 
                  name="Link" 
                  size={16} 
                  className={template?.blockchainEnabled ? 'text-success' : 'text-muted-foreground'} 
                />
                <span className="text-xs text-muted-foreground">Blockchain</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon 
                  name="QrCode" 
                  size={16} 
                  className={template?.qrCodeEnabled ? 'text-success' : 'text-muted-foreground'} 
                />
                <span className="text-xs text-muted-foreground">QR Code</span>
              </div>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={handleGenerateCertificate}
              iconName="FileCheck"
              iconPosition="left"
              iconSize={14}
            >
              Generate
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Certification Templates</h3>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
          >
            New Template
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-6">
        {/* Template Selection */}
        <div>
          <Select
            label="Select Certificate Template"
            options={templateOptions}
            value={selectedTemplate}
            onChange={setSelectedTemplate}
            placeholder="Choose a certificate template..."
            searchable
          />
        </div>

        {/* Template Preview */}
        {selectedTemplate && renderTemplatePreview()}

        {/* Recent Certificates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-foreground">Recent Certificates</h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              iconSize={14}
            >
              View All
            </Button>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentCertificates?.map((cert) => (
              <div
                key={cert?.id}
                className="p-3 bg-surface rounded-lg border border-border"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h5 className="font-medium text-foreground">{cert?.id}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(cert?.status)}`}>
                        {cert?.status?.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="text-sm space-y-1">
                      <p className="text-muted-foreground">
                        Batch: {cert?.batchId} - {cert?.herbType}
                      </p>
                      <p className="text-muted-foreground">
                        Template: {cert?.template}
                      </p>
                      <p className="text-muted-foreground">
                        Issued: {cert?.issuedDate}
                      </p>
                      {cert?.blockchainTx && (
                        <p className="text-muted-foreground font-mono text-xs">
                          Tx: {cert?.blockchainTx}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                      iconSize={14}
                    >
                      Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="QrCode"
                      iconSize={14}
                    >
                      QR
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            iconSize={14}
          >
            Bulk Generate
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            iconSize={14}
          >
            Template Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificationTemplates;