import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import BlockchainStatusIndicator from '../../components/ui/BlockchainStatusIndicator';
import QuickActionPanel from '../../components/ui/QuickActionPanel';

// Import page-specific components
import QuickStatsCard from './components/QuickStatsCard';
import RecentCollectionsTable from './components/RecentCollectionsTable';
import WeatherWidget from './components/WeatherWidget';
import SeasonalReminders from './components/SeasonalReminders';
import CertificationStatus from './components/CertificationStatus';
import NewCollectionModal from './components/NewCollectionModal';

const CollectorDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
  const [user] = useState({
    name: 'Rajesh Kumar',
    role: 'Herb Collector',
    id: 'collector-001',
    location: 'Dehradun, Uttarakhand'
  });

  // Mock data for collections
  const [collections, setCollections] = useState([
    {
      id: 'COL-001',
      herbType: 'Ashwagandha',
      scientificName: 'Withania somnifera',
      quantity: 2.5,
      qualityGrade: 'A+',
      location: 'Himalayan Foothills, Uttarakhand',
      coordinates: '30.3165° N, 78.0322° E',
      timestamp: new Date('2024-08-29T14:30:00'),
      blockchainStatus: 'confirmed',
      transactionHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12'
    },
    {
      id: 'COL-002',
      herbType: 'Brahmi',
      scientificName: 'Bacopa monnieri',
      quantity: 1.8,
      qualityGrade: 'A',
      location: 'Wetland Area, Haridwar',
      coordinates: '29.9457° N, 78.1642° E',
      timestamp: new Date('2024-08-29T10:15:00'),
      blockchainStatus: 'pending',
      transactionHash: null
    },
    {
      id: 'COL-003',
      herbType: 'Tulsi',
      scientificName: 'Ocimum sanctum',
      quantity: 3.2,
      qualityGrade: 'B+',
      location: 'Organic Farm, Rishikesh',
      coordinates: '30.0869° N, 78.2676° E',
      timestamp: new Date('2024-08-28T16:45:00'),
      blockchainStatus: 'failed',
      transactionHash: null
    },
    {
      id: 'COL-004',
      herbType: 'Giloy',
      scientificName: 'Tinospora cordifolia',
      quantity: 1.2,
      qualityGrade: 'A+',
      location: 'Forest Reserve, Mussoorie',
      coordinates: '30.4598° N, 78.0664° E',
      timestamp: new Date('2024-08-28T08:20:00'),
      blockchainStatus: 'confirmed',
      transactionHash: '0x9876543210fedcba0987654321fedcba09876543'
    }
  ]);

  // Calculate stats
  const todayCollections = collections?.filter(
    col => new Date(col.timestamp)?.toDateString() === new Date()?.toDateString()
  )?.length;

  const pendingSubmissions = collections?.filter(
    col => col?.blockchainStatus === 'pending' || col?.blockchainStatus === 'failed'
  )?.length;

  const totalEarnings = collections?.filter(col => col?.blockchainStatus === 'confirmed')?.reduce((sum, col) => sum + (col?.quantity * 150), 0); // ₹150 per kg average

  const handleLogout = () => {
    navigate('/user-registration-login');
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'new-collection':
        setShowNewCollectionModal(true);
        break;
      case 'scan-qr':
        // Handle QR scanning
        break;
      case 'record-harvest':
        setShowNewCollectionModal(true);
        break;
      case 'upload-photos':
        // Handle photo upload
        break;
      default:
        console.log('Action not implemented:', actionId);
    }
  };

  const handleRetrySubmission = (collectionId) => {
    setCollections(prev => prev?.map(col => 
      col?.id === collectionId 
        ? { ...col, blockchainStatus: 'pending' }
        : col
    ));

    // Simulate blockchain submission retry
    setTimeout(() => {
      setCollections(prev => prev?.map(col => 
        col?.id === collectionId 
          ? { 
              ...col, 
              blockchainStatus: 'confirmed',
              transactionHash: '0x' + Math.random()?.toString(16)?.substr(2, 40)
            }
          : col
      ));
    }, 3000);
  };

  const handleViewDetails = (collectionId) => {
    console.log('View details for collection:', collectionId);
    // Navigate to collection details or open modal
  };

  const handleNewCollection = (collectionData) => {
    const newCollection = {
      id: `COL-${String(collections?.length + 1)?.padStart(3, '0')}`,
      ...collectionData,
      blockchainStatus: 'pending',
      transactionHash: null,
      timestamp: new Date()
    };

    setCollections(prev => [newCollection, ...prev]);

    // Simulate blockchain submission
    setTimeout(() => {
      setCollections(prev => prev?.map(col => 
        col?.id === newCollection?.id 
          ? { 
              ...col, 
              blockchainStatus: 'confirmed',
              transactionHash: '0x' + Math.random()?.toString(16)?.substr(2, 40)
            }
          : col
      ));
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        user={user}
        onLogout={handleLogout}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* Sidebar */}
      <RoleBasedSidebar
        isCollapsed={sidebarCollapsed}
        userRole="collector"
        className={`${sidebarCollapsed ? 'lg:-translate-x-0' : 'lg:translate-x-0'}`}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Collector Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {user?.name}! Track your herb collections and blockchain submissions.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <BlockchainStatusIndicator
                status="connected"
                blockHeight={2847392}
                pendingTransactions={pendingSubmissions}
              />
              
              <Button
                variant="default"
                onClick={() => setShowNewCollectionModal(true)}
                iconName="Plus"
                iconPosition="left"
                iconSize={20}
                className="h-12 px-6"
              >
                Record New Collection
              </Button>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel - Quick Stats */}
            <div className="lg:col-span-3 space-y-6">
              <QuickStatsCard
                title="Today's Collections"
                value={todayCollections}
                subtitle="Batches recorded today"
                icon="Package"
                trend={{ type: 'up', value: '+12%' }}
                color="primary"
              />
              
              <QuickStatsCard
                title="Pending Submissions"
                value={pendingSubmissions}
                subtitle="Awaiting blockchain confirmation"
                icon="Clock"
                trend={{ type: 'neutral', value: '0%' }}
                color="warning"
              />
              
              <QuickStatsCard
                title="Total Earnings"
                value={`₹${totalEarnings?.toLocaleString()}`}
                subtitle="From confirmed collections"
                icon="IndianRupee"
                trend={{ type: 'up', value: '+8%' }}
                color="success"
              />

              {/* Quick Actions */}
              <div className="lg:hidden">
                <QuickActionPanel
                  userRole="collector"
                  onAction={handleQuickAction}
                  variant="inline"
                />
              </div>
            </div>

            {/* Center Panel - Collections Table */}
            <div className="lg:col-span-6">
              <RecentCollectionsTable
                collections={collections}
                onRetrySubmission={handleRetrySubmission}
                onViewDetails={handleViewDetails}
              />
            </div>

            {/* Right Panel - Weather & Reminders */}
            <div className="lg:col-span-3 space-y-6">
              <WeatherWidget />
              <SeasonalReminders />
              <CertificationStatus />
            </div>
          </div>

          {/* Mobile Quick Actions */}
          <div className="lg:hidden">
            <QuickActionPanel
              userRole="collector"
              onAction={handleQuickAction}
              variant="floating"
            />
          </div>
        </div>
      </main>
      {/* New Collection Modal */}
      <NewCollectionModal
        isOpen={showNewCollectionModal}
        onClose={() => setShowNewCollectionModal(false)}
        onSubmit={handleNewCollection}
      />
    </div>
  );
};

export default CollectorDashboard;