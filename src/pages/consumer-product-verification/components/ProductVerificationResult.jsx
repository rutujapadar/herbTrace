import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ProductVerificationResult = ({ productData, onBack, onShare, onReport }) => {
  const [activeTab, setActiveTab] = useState('origin');

  const mockProductData = {
    batchId: "BTC-2024-08-001",
    productName: "Organic Ashwagandha Root Powder",
    scientificName: "Withania somnifera",
    verificationStatus: "verified",
    blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
    networkConfirmations: 847,
    origin: {
      collectorName: "Rajesh Kumar",
      farmName: "Green Valley Organic Farm",
      location: "Rajasthan, India",
      coordinates: { lat: 26.9124, lng: 75.7873 },
      harvestDate: "2024-08-15",
      collectionMethod: "Hand-picked at dawn",
      certifications: ["Organic", "Fair Trade"],
      collectorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    quality: {
      labName: "Ayurvedic Quality Labs Pvt Ltd",
      testDate: "2024-08-18",
      purityScore: 98.5,
      activeCompounds: {
        withanolides: "3.2%",
        alkaloids: "0.8%",
        saponins: "1.5%"
      },
      contaminants: {
        heavyMetals: "Below detection limit",
        pesticides: "Not detected",
        microbial: "Within safe limits"
      },
      certificationNumber: "AQL-2024-0815",
      labImage: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=150&h=150&fit=crop"
    },
    journey: [
      {
        stage: "Collection",
        stakeholder: "Rajesh Kumar",
        date: "2024-08-15",
        location: "Green Valley Farm",
        status: "verified",
        txHash: "0x1a2b3c4d...",
        description: "Herbs collected at optimal maturity"
      },
      {
        stage: "Quality Testing",
        stakeholder: "Ayurvedic Quality Labs",
        date: "2024-08-18",
        location: "Mumbai, India",
        status: "verified",
        txHash: "0x2b3c4d5e...",
        description: "Comprehensive quality analysis completed"
      },
      {
        stage: "Processing",
        stakeholder: "Herbal Processing Unit",
        date: "2024-08-20",
        location: "Gujarat, India",
        status: "verified",
        txHash: "0x3c4d5e6f...",
        description: "Traditional processing methods applied"
      },
      {
        stage: "Distribution",
        stakeholder: "Supply Chain Partner",
        date: "2024-08-25",
        location: "Delhi, India",
        status: "verified",
        txHash: "0x4d5e6f78...",
        description: "Product shipped to retail network"
      }
    ]
  };

  const data = productData || mockProductData;

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success';
      case 'pending': return 'text-warning';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  const renderOriginCard = () => (
    <div className="space-y-6">
      {/* Collector Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <Image
            src={data?.origin?.collectorImage}
            alt={data?.origin?.collectorName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">{data?.origin?.collectorName}</h3>
            <p className="text-muted-foreground">{data?.origin?.farmName}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{data?.origin?.location}</span>
            </div>
          </div>
          <div className="flex space-x-1">
            {data?.origin?.certifications?.map((cert) => (
              <span key={cert} className="verification-badge verified text-xs">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Harvest Details */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-4">Harvest Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={18} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Harvest Date</p>
                <p className="font-medium text-foreground">{new Date(data.origin.harvestDate)?.toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Leaf" size={18} className="text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Collection Method</p>
                <p className="font-medium text-foreground">{data?.origin?.collectionMethod}</p>
              </div>
            </div>
          </div>
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">GPS Location</span>
            </div>
            <iframe
              width="100%"
              height="120"
              loading="lazy"
              title="Farm Location"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${data?.origin?.coordinates?.lat},${data?.origin?.coordinates?.lng}&z=14&output=embed`}
              className="rounded border"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderQualityCard = () => (
    <div className="space-y-6">
      {/* Laboratory Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <Image
            src={data?.quality?.labImage}
            alt={data?.quality?.labName}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">{data?.quality?.labName}</h3>
            <p className="text-muted-foreground">Certified Testing Laboratory</p>
            <div className="flex items-center space-x-2 mt-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Tested on {new Date(data.quality.testDate)?.toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-success">{data?.quality?.purityScore}%</div>
            <p className="text-sm text-muted-foreground">Purity Score</p>
          </div>
        </div>
      </div>

      {/* Test Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Compounds */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center">
            <Icon name="FlaskConical" size={18} className="text-primary mr-2" />
            Active Compounds
          </h4>
          <div className="space-y-3">
            {Object.entries(data?.quality?.activeCompounds)?.map(([compound, value]) => (
              <div key={compound} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground capitalize">{compound}</span>
                <span className="font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contaminant Analysis */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center">
            <Icon name="ShieldCheck" size={18} className="text-success mr-2" />
            Safety Analysis
          </h4>
          <div className="space-y-3">
            {Object.entries(data?.quality?.contaminants)?.map(([test, result]) => (
              <div key={test} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground capitalize">{test?.replace(/([A-Z])/g, ' $1')}</span>
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">{result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Award" size={24} className="text-warning" />
            <div>
              <h4 className="font-semibold text-foreground">Quality Certificate</h4>
              <p className="text-sm text-muted-foreground">Certificate No: {data?.quality?.certificationNumber}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Download
          </Button>
        </div>
      </div>
    </div>
  );

  const renderJourneyCard = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-6 flex items-center">
          <Icon name="Route" size={18} className="text-primary mr-2" />
          Supply Chain Journey
        </h4>
        
        <div className="relative">
          {data?.journey?.map((step, index) => (
            <div key={index} className="flex items-start space-x-4 pb-8 last:pb-0">
              {/* Timeline Line */}
              {index < data?.journey?.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />
              )}
              
              {/* Status Icon */}
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                step?.status === 'verified' ? 'bg-success/10 border-success' : 
                step?.status === 'pending'? 'bg-warning/10 border-warning' : 'bg-error/10 border-error'
              }`}>
                <Icon 
                  name={getStatusIcon(step?.status)} 
                  size={20} 
                  className={getStatusColor(step?.status)} 
                />
              </div>
              
              {/* Step Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-foreground">{step?.stage}</h5>
                  <span className="text-xs text-muted-foreground">
                    {new Date(step.date)?.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{step?.stakeholder}</p>
                <p className="text-sm text-foreground mb-3">{step?.description}</p>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{step?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Link" size={12} />
                    <span className="font-mono">{step?.txHash}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Scanner
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onShare}
              iconName="Share"
              iconPosition="left"
            >
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onReport}
              iconName="Flag"
              iconPosition="left"
              className="text-error hover:text-error"
            >
              Report
            </Button>
          </div>
        </div>
      </div>
      {/* Verification Status */}
      <div className="p-4 bg-success/5 border-b border-success/20">
        <div className="flex items-center justify-center space-x-3">
          <Icon name="ShieldCheck" size={24} className="text-success" />
          <div className="text-center">
            <h2 className="text-lg font-semibold text-success">Product Verified</h2>
            <p className="text-sm text-muted-foreground">
              Blockchain confirmations: {data?.networkConfirmations}
            </p>
          </div>
        </div>
      </div>
      {/* Product Information */}
      <div className="p-4 border-b border-border">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold text-foreground">{data?.productName}</h1>
          <p className="text-muted-foreground italic">{data?.scientificName}</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <span>Batch ID:</span>
            <span className="font-mono bg-surface px-2 py-1 rounded">{data?.batchId}</span>
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex">
          {[
            { id: 'origin', label: 'Origin', icon: 'MapPin' },
            { id: 'quality', label: 'Quality', icon: 'FlaskConical' },
            { id: 'journey', label: 'Journey', icon: 'Route' }
          ]?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              <span className="font-medium">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'origin' && renderOriginCard()}
        {activeTab === 'quality' && renderQualityCard()}
        {activeTab === 'journey' && renderJourneyCard()}
      </div>
      {/* Blockchain Footer */}
      <div className="p-4 bg-surface border-t border-border">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Link" size={16} />
          <span>Verified on blockchain:</span>
          <span className="font-mono text-primary">{data?.blockchainHash?.substring(0, 20)}...</span>
        </div>
      </div>
    </div>
  );
};

export default ProductVerificationResult;