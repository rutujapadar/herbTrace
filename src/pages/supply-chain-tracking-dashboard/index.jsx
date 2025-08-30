import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import BlockchainStatusIndicator from '../../components/ui/BlockchainStatusIndicator';
import ShipmentTimeline from './components/ShipmentTimeline';
import ActiveShipmentsTable from './components/ActiveShipmentsTable';
import SupplyChainMetrics from './components/SupplyChainMetrics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SupplyChainTrackingDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState('HT-2024-001');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser] = useState({
    name: 'Sarah Johnson',
    role: 'Supply Chain Manager',
    email: 'sarah.johnson@herbtrace.com'
  });

  // Mock authentication check
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('herbtrace_auth');
    if (!isAuthenticated) {
      navigate('/user-registration-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('herbtrace_auth');
    navigate('/user-registration-login');
  };

  const handleBatchSelect = (batchNumber) => {
    setSelectedBatch(batchNumber);
  };

  const handleShipmentSelect = (batchNumber) => {
    setSelectedBatch(batchNumber);
    // Scroll to timeline or show detailed view
    document.getElementById('timeline-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickSearch = (e) => {
    if (e?.key === 'Enter' && searchQuery?.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
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
        userRole="supply_chain"
        className={`${sidebarCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}
      />
      {/* Main Content */}
      <main className={`
        pt-16 transition-all duration-300
        ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
      `}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Supply Chain Tracking</h1>
              <p className="text-muted-foreground mt-1">
                Monitor herb journey from collection to retail with blockchain verification
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Quick Search */}
              <div className="hidden md:block w-80">
                <Input
                  type="search"
                  placeholder="Search by batch number, hash, or herb type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  onKeyPress={handleQuickSearch}
                />
              </div>
              
              {/* Blockchain Status */}
              <BlockchainStatusIndicator
                status="connected"
                blockHeight={2847392}
                pendingTransactions={3}
                networkName="HerbTrace Network"
                gasPrice={25}
              />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden">
            <Input
              type="search"
              placeholder="Search batches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              onKeyPress={handleQuickSearch}
            />
          </div>

          {/* Timeline Section */}
          <div id="timeline-section" className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <ShipmentTimeline
                selectedBatch={selectedBatch}
                onBatchSelect={handleBatchSelect}
              />
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-12 gap-6">
            {/* Active Shipments Table */}
            <div className="col-span-12 lg:col-span-8">
              <ActiveShipmentsTable
                onShipmentSelect={handleShipmentSelect}
              />
            </div>

            {/* Supply Chain Metrics & Alerts */}
            <div className="col-span-12 lg:col-span-4">
              <SupplyChainMetrics />
            </div>
          </div>

          {/* Additional Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* GPS Tracking Integration */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="MapPin" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">GPS Tracking</h3>
                  <p className="text-sm text-muted-foreground">Real-time location</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-muted-foreground">Active Shipments</p>
                  <p className="text-xl font-semibold text-foreground">23</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="left"
                  iconSize={14}
                  className="w-full"
                  onClick={() => {
                    // Open GPS tracking interface
                    window.open('https://www.google.com/maps?q=19.0760,72.8777&z=14&output=embed', '_blank');
                  }}
                >
                  View Map
                </Button>
              </div>
            </div>

            {/* Temperature Monitoring */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Thermometer" size={20} className="text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Temperature</h3>
                  <p className="text-sm text-muted-foreground">Cold chain monitoring</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-muted-foreground">Avg Temperature</p>
                  <p className="text-xl font-semibold text-foreground">22°C</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-sm text-success">Within Range</span>
                </div>
              </div>
            </div>

            {/* Blockchain Verification */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} className="text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Verification</h3>
                  <p className="text-sm text-muted-foreground">Blockchain status</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-muted-foreground">Verified Batches</p>
                  <p className="text-xl font-semibold text-foreground">312</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full blockchain-status-pulse" />
                  <span className="text-sm text-success">All Verified</span>
                </div>
              </div>
            </div>

            {/* Quality Compliance */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Award" size={20} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Quality Score</h3>
                  <p className="text-sm text-muted-foreground">Compliance rating</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-muted-foreground">Current Score</p>
                  <p className="text-xl font-semibold text-foreground">96.8%</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={12} className="text-success" />
                  <span className="text-sm text-success">+2.3% this week</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date()?.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Export Data
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={16}
                onClick={() => window.location?.reload()}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupplyChainTrackingDashboard;