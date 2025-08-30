import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import BlockchainStatusIndicator from '../../components/ui/BlockchainStatusIndicator';
import ComplianceMetricsCard from './components/ComplianceMetricsCard';
import ComplianceTable from './components/ComplianceTable';
import AlertsPanel from './components/AlertsPanel';
import ComplianceFilters from './components/ComplianceFilters';
import ExportPanel from './components/ExportPanel';

const RegulatoryComplianceDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [user] = useState({
    name: 'Dr. Rajesh Kumar',
    role: 'Regulatory Authority',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  // Mock compliance data
  const complianceData = [
    {
      id: 'ENT001',
      entityName: 'Kerala Herbs Collective',
      entityId: 'KHC-2024-001',
      entityType: 'collector',
      location: 'Wayanad, Kerala',
      registrationStatus: 'compliant',
      certificationStatus: 'compliant',
      certificationExpiry: '03/15/2025',
      complianceScore: 94,
      lastActivity: '2 hours ago',
      recentTransactions: [
        { hash: '0xa1b2c3d4...', type: 'Collection Record', timestamp: '2 hours ago' },
        { hash: '0xe5f6g7h8...', type: 'Quality Update', timestamp: '1 day ago' }
      ],
      complianceHistory: [
        { type: 'audit', description: 'Quarterly compliance audit passed', date: '12/01/2024', status: 'compliant' },
        { type: 'certification', description: 'Organic certification renewed', date: '11/15/2024', status: 'compliant' }
      ]
    },
    {
      id: 'ENT002',
      entityName: 'Ayurveda Labs Pvt Ltd',
      entityId: 'ALP-2024-002',
      entityType: 'laboratory',
      location: 'Bangalore, Karnataka',
      registrationStatus: 'compliant',
      certificationStatus: 'pending',
      certificationExpiry: '01/20/2025',
      complianceScore: 87,
      lastActivity: '4 hours ago',
      recentTransactions: [
        { hash: '0xi9j0k1l2...', type: 'Test Results', timestamp: '4 hours ago' },
        { hash: '0xm3n4o5p6...', type: 'Certificate Issue', timestamp: '2 days ago' }
      ],
      complianceHistory: [
        { type: 'audit', description: 'Equipment calibration verified', date: '11/28/2024', status: 'compliant' },
        { type: 'violation', description: 'Minor documentation delay', date: '11/10/2024', status: 'resolved' }
      ]
    },
    {
      id: 'ENT003',
      entityName: 'GreenChain Logistics',
      entityId: 'GCL-2024-003',
      entityType: 'supply_chain',
      location: 'Mumbai, Maharashtra',
      registrationStatus: 'compliant',
      certificationStatus: 'compliant',
      certificationExpiry: '06/30/2025',
      complianceScore: 91,
      lastActivity: '1 day ago',
      recentTransactions: [
        { hash: '0xq7r8s9t0...', type: 'Shipment Update', timestamp: '1 day ago' },
        { hash: '0xu1v2w3x4...', type: 'Delivery Confirmation', timestamp: '3 days ago' }
      ],
      complianceHistory: [
        { type: 'audit', description: 'Cold chain compliance verified', date: '11/25/2024', status: 'compliant' },
        { type: 'certification', description: 'ISO certification maintained', date: '10/15/2024', status: 'compliant' }
      ]
    },
    {
      id: 'ENT004',
      entityName: 'Traditional Herbs Co',
      entityId: 'THC-2024-004',
      entityType: 'collector',
      location: 'Udaipur, Rajasthan',
      registrationStatus: 'violation',
      certificationStatus: 'expired',
      certificationExpiry: '11/30/2024',
      complianceScore: 62,
      lastActivity: '5 days ago',
      recentTransactions: [
        { hash: '0xy5z6a7b8...', type: 'Collection Record', timestamp: '5 days ago' }
      ],
      complianceHistory: [
        { type: 'violation', description: 'Expired organic certification', date: '12/01/2024', status: 'pending' },
        { type: 'violation', description: 'Missing GPS coordinates', date: '11/20/2024', status: 'pending' }
      ]
    },
    {
      id: 'ENT005',
      entityName: 'BioTest Research Lab',
      entityId: 'BTR-2024-005',
      entityType: 'laboratory',
      location: 'Chennai, Tamil Nadu',
      registrationStatus: 'pending',
      certificationStatus: 'compliant',
      certificationExpiry: '08/15/2025',
      complianceScore: 78,
      lastActivity: '3 hours ago',
      recentTransactions: [
        { hash: '0xc9d0e1f2...', type: 'Test Results', timestamp: '3 hours ago' },
        { hash: '0xg3h4i5j6...', type: 'Quality Check', timestamp: '1 day ago' }
      ],
      complianceHistory: [
        { type: 'audit', description: 'Registration renewal in progress', date: '11/30/2024', status: 'pending' },
        { type: 'certification', description: 'NABL accreditation valid', date: '08/15/2024', status: 'compliant' }
      ]
    }
  ];

  // Mock alerts data
  const alertsData = [
    {
      id: 'ALT001',
      type: 'violation',
      severity: 'critical',
      title: 'Certification Expired',
      description: 'Traditional Herbs Co organic certification has expired',
      entityName: 'Traditional Herbs Co',
      timestamp: '2 hours ago',
      read: false,
      actionRequired: true,
      suggestedAction: 'Suspend Operations',
      details: {
        blockchainTx: '0xy5z6a7b8...',
        affectedBatches: ['THC-B001', 'THC-B002', 'THC-B003']
      }
    },
    {
      id: 'ALT002',
      type: 'audit',
      severity: 'high',
      title: 'Scheduled Audit Due',
      description: 'Quarterly compliance audit scheduled for Kerala Herbs Collective',
      entityName: 'Kerala Herbs Collective',
      timestamp: '4 hours ago',
      read: false,
      actionRequired: true,
      suggestedAction: 'Schedule Audit'
    },
    {
      id: 'ALT003',
      type: 'blockchain',
      severity: 'medium',
      title: 'Transaction Anomaly Detected',
      description: 'Unusual blockchain activity pattern detected in supply chain',
      entityName: 'GreenChain Logistics',
      timestamp: '6 hours ago',
      read: true,
      actionRequired: false,
      details: {
        blockchainTx: '0xq7r8s9t0...'
      }
    },
    {
      id: 'ALT004',
      type: 'certification',
      severity: 'medium',
      title: 'Certification Expiring Soon',
      description: 'Ayurveda Labs certification expires in 30 days',
      entityName: 'Ayurveda Labs Pvt Ltd',
      timestamp: '1 day ago',
      read: true,
      actionRequired: true,
      suggestedAction: 'Renewal Notice'
    },
    {
      id: 'ALT005',
      type: 'violation',
      severity: 'high',
      title: 'Missing Documentation',
      description: 'Required compliance documents not submitted',
      entityName: 'BioTest Research Lab',
      timestamp: '2 days ago',
      read: false,
      actionRequired: true,
      suggestedAction: 'Request Documents'
    }
  ];

  useEffect(() => {
    setFilteredData(complianceData);
  }, []);

  const handleLogout = () => {
    navigate('/user-registration-login');
  };

  const handleRowExpand = (entityId) => {
    setExpandedRows(prev => 
      prev?.includes(entityId) 
        ? prev?.filter(id => id !== entityId)
        : [...prev, entityId]
    );
  };

  const handleFiltersChange = (filters) => {
    let filtered = [...complianceData];

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(entity => 
        entity?.entityName?.toLowerCase()?.includes(searchTerm) ||
        entity?.entityId?.toLowerCase()?.includes(searchTerm) ||
        entity?.location?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply entity type filter
    if (filters?.entityType) {
      filtered = filtered?.filter(entity => entity?.entityType === filters?.entityType);
    }

    // Apply location filter
    if (filters?.location) {
      filtered = filtered?.filter(entity => 
        entity?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())
      );
    }

    // Apply compliance status filter
    if (filters?.complianceStatus) {
      filtered = filtered?.filter(entity => entity?.registrationStatus === filters?.complianceStatus);
    }

    // Apply certification status filter
    if (filters?.certificationStatus) {
      filtered = filtered?.filter(entity => entity?.certificationStatus === filters?.certificationStatus);
    }

    // Apply score range filter
    if (filters?.scoreRange) {
      const [min, max] = filters?.scoreRange?.split('-')?.map(Number);
      filtered = filtered?.filter(entity => 
        entity?.complianceScore >= min && entity?.complianceScore <= max
      );
    }

    setFilteredData(filtered);
  };

  const handleAlertAction = (alertId, action) => {
    console.log(`Performing action: ${action} for alert: ${alertId}`);
    // Implement alert action logic
  };

  const handleMarkAsRead = (alertId) => {
    console.log(`Marking alert as read: ${alertId}`);
    // Implement mark as read logic
  };

  const handleExport = (exportConfig) => {
    setIsExporting(true);
    console.log('Exporting with config:', exportConfig);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // Simulate download
      const blob = new Blob(['Mock compliance report data'], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compliance-report-${Date.now()}.${exportConfig?.format}`;
      document.body?.appendChild(a);
      a?.click();
      document.body?.removeChild(a);
      URL.revokeObjectURL(url);
    }, 3000);
  };

  // Calculate metrics
  const totalEntities = complianceData?.length;
  const compliantEntities = complianceData?.filter(e => e?.registrationStatus === 'compliant')?.length;
  const complianceRate = Math.round((compliantEntities / totalEntities) * 100);
  const pendingInvestigations = complianceData?.filter(e => e?.registrationStatus === 'pending' || e?.registrationStatus === 'violation')?.length;
  const blockchainTransactions = 2847392;

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader 
        user={user}
        onLogout={handleLogout}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <RoleBasedSidebar 
        isCollapsed={sidebarCollapsed}
        userRole="regulatory"
        className={sidebarCollapsed ? 'lg:-translate-x-full' : ''}
      />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-64'}`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Regulatory Compliance Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive oversight of supply chain compliance and audit trail access
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <BlockchainStatusIndicator 
                status="connected"
                blockHeight={blockchainTransactions}
                pendingTransactions={3}
              />
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={16}
              >
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Compliance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ComplianceMetricsCard
              title="Total Registered Entities"
              value={totalEntities?.toLocaleString()}
              change="+12%"
              changeType="positive"
              icon="Building"
              color="primary"
            />
            <ComplianceMetricsCard
              title="Compliance Rate"
              value={`${complianceRate}%`}
              change="+5%"
              changeType="positive"
              icon="ShieldCheck"
              color="success"
            />
            <ComplianceMetricsCard
              title="Pending Investigations"
              value={pendingInvestigations?.toString()}
              change="-2"
              changeType="positive"
              icon="AlertTriangle"
              color="warning"
            />
            <ComplianceMetricsCard
              title="Blockchain Transactions"
              value={blockchainTransactions?.toLocaleString()}
              change="+1,247"
              changeType="positive"
              icon="Link"
              color="primary"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="xl:col-span-2 space-y-6">
              {/* Filters */}
              <ComplianceFilters
                onFiltersChange={handleFiltersChange}
                totalResults={filteredData?.length}
              />

              {/* Compliance Table */}
              <ComplianceTable
                data={filteredData}
                onRowExpand={handleRowExpand}
                expandedRows={expandedRows}
              />
            </div>

            {/* Right Panel */}
            <div className="space-y-6">
              {/* Alerts Panel */}
              <AlertsPanel
                alerts={alertsData}
                onAlertAction={handleAlertAction}
                onMarkAsRead={handleMarkAsRead}
              />

              {/* Export Panel */}
              <ExportPanel
                onExport={handleExport}
                isExporting={isExporting}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegulatoryComplianceDashboard;