import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import TestingQueue from './components/TestingQueue';
import ActiveTestSummary from './components/ActiveTestSummary';
import EquipmentStatus from './components/EquipmentStatus';
import TestingForm from './components/TestingForm';
import CertificationTemplates from './components/CertificationTemplates';
import BlockchainStatus from './components/BlockchainStatus';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const LaboratoryTestingInterface = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showTestingForm, setShowTestingForm] = useState(false);
  const [currentUser] = useState({
    name: 'Dr. Sarah Johnson',
    role: 'Laboratory Technician',
    id: 'LAB-001',
    department: 'Quality Control'
  });

  // Mock laboratory statistics
  const labStats = {
    pendingTests: 12,
    activeTests: 3,
    completedToday: 8,
    equipmentActive: 4,
    equipmentIdle: 2,
    equipmentMaintenance: 1,
    certificatesIssued: 15,
    blockchainTransactions: 18
  };

  useEffect(() => {
    document.title = 'Laboratory Testing Interface - HerbTrace';
  }, []);

  const handleLogout = () => {
    navigate('/user-registration-login');
  };

  const handleBatchSelect = (batch) => {
    setSelectedBatch(batch);
    setShowTestingForm(true);
  };

  const handleTestSubmit = (testData) => {
    console.log('Test data submitted:', testData);
    setShowTestingForm(false);
    setSelectedBatch(null);
    // Here you would typically submit to blockchain and update the UI
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'start-test':
        // Open testing form with first pending batch
        break;
      case 'scan-sample':
        // Open camera for QR scanning
        break;
      case 'enter-results':
        // Open results entry form
        break;
      case 'generate-certificate':
        // Open certificate generation
        break;
      default:
        console.log('Quick action:', actionId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        user={currentUser}
        onLogout={handleLogout}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* Sidebar */}
      <RoleBasedSidebar
        isCollapsed={sidebarCollapsed}
        userRole="laboratory"
        className={`${sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'}`}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Laboratory Testing Interface</h1>
                <p className="text-muted-foreground mt-2">
                  Manage herb testing, quality analysis, and blockchain-verified certifications
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  iconName="QrCode"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => handleQuickAction('scan-sample')}
                >
                  Scan Sample
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => handleQuickAction('start-test')}
                >
                  Start New Test
                </Button>
              </div>
            </div>
          </div>

          {/* Statistics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} className="text-warning" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{labStats?.pendingTests}</p>
                  <p className="text-xs text-muted-foreground">Pending Tests</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Play" size={20} className="text-success" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{labStats?.activeTests}</p>
                  <p className="text-xs text-muted-foreground">Active Tests</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{labStats?.completedToday}</p>
                  <p className="text-xs text-muted-foreground">Completed Today</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={20} className="text-secondary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{labStats?.certificatesIssued}</p>
                  <p className="text-xs text-muted-foreground">Certificates Issued</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Activity" size={20} className="text-success" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{labStats?.equipmentActive}</p>
                  <p className="text-xs text-muted-foreground">Equipment Active</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Pause" size={20} className="text-warning" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{labStats?.equipmentIdle}</p>
                  <p className="text-xs text-muted-foreground">Equipment Idle</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Wrench" size={20} className="text-error" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{labStats?.equipmentMaintenance}</p>
                  <p className="text-xs text-muted-foreground">Maintenance</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Link" size={20} className="text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{labStats?.blockchainTransactions}</p>
                  <p className="text-xs text-muted-foreground">Blockchain Txns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Testing Queue (8 cols) */}
            <div className="lg:col-span-8">
              <TestingQueue
                onSelectBatch={handleBatchSelect}
                selectedBatchId={selectedBatch?.id}
              />
            </div>

            {/* Right Column - Panels (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Active Test Summary */}
              <ActiveTestSummary />

              {/* Equipment Status */}
              <EquipmentStatus />

              {/* Blockchain Status */}
              <BlockchainStatus />
            </div>
          </div>

          {/* Bottom Section - Certification Templates */}
          <div className="mt-8">
            <CertificationTemplates />
          </div>
        </div>
      </main>
      {/* Testing Form Modal */}
      {showTestingForm && selectedBatch && (
        <TestingForm
          batch={selectedBatch}
          onClose={() => {
            setShowTestingForm(false);
            setSelectedBatch(null);
          }}
          onSubmit={handleTestSubmit}
        />
      )}
      {/* Mobile Sidebar Overlay */}
      {!sidebarCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-30" 
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
};

export default LaboratoryTestingInterface;