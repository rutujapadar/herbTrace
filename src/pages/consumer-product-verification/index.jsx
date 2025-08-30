import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import QRScannerInterface from './components/QRScannerInterface';
import ProductVerificationResult from './components/ProductVerificationResult';
import VerificationHistory from './components/VerificationHistory';
import HelpGuide from './components/HelpGuide';

const ConsumerProductVerification = () => {
  const [currentView, setCurrentView] = useState('scanner'); // scanner, result, history, help
  const [scannedProduct, setScannedProduct] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  // Handle QR scan success
  const handleScanSuccess = (qrData) => {
    setScannedProduct(qrData);
    setCurrentView('result');
    setIsScanning(false);
    
    // Save to history (in real app, this would be localStorage or API)
    const historyItem = {
      ...qrData,
      verificationDate: new Date()?.toISOString(),
      status: 'verified'
    };
    console.log('Saving to history:', historyItem);
  };

  // Handle QR scan error
  const handleScanError = (error) => {
    console.error('QR Scan Error:', error);
    setIsScanning(false);
    // Show error toast or modal in real implementation
  };

  // Handle product sharing
  const handleShareProduct = () => {
    if (navigator.share && scannedProduct) {
      navigator.share({
        title: `Verified: ${scannedProduct?.productName}`,
        text: `This Ayurvedic product has been verified as authentic through blockchain technology.`,
        url: window.location?.href
      })?.catch(console.error);
    } else {
      // Fallback for browsers without Web Share API
      const shareText = `Verified: ${scannedProduct?.productName} - Authentic Ayurvedic product verified through blockchain`;
      navigator.clipboard?.writeText(shareText);
      // Show success message
    }
  };

  // Handle product reporting
  const handleReportProduct = () => {
    // In real implementation, this would open a reporting form
    alert('Thank you for reporting. Our team will investigate this product.');
  };

  // Handle history selection
  const handleSelectFromHistory = (product) => {
    setScannedProduct(product);
    setCurrentView('result');
  };

  // Clear verification history
  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all verification history?')) {
      // Clear localStorage or call API
      console.log('History cleared');
    }
  };

  // Navigation items for mobile menu
  const navigationItems = [
    { path: '/collector-dashboard', label: 'Collector Dashboard', icon: 'Leaf' },
    { path: '/laboratory-testing-interface', label: 'Laboratory Interface', icon: 'FlaskConical' },
    { path: '/supply-chain-tracking-dashboard', label: 'Supply Chain', icon: 'Truck' },
    { path: '/regulatory-compliance-dashboard', label: 'Regulatory', icon: 'Shield' },
    { path: '/user-registration-login', label: 'Login', icon: 'User' }
  ];

  // Render main navigation
  const renderNavigation = () => (
    <div className="sticky top-0 bg-background border-b border-border z-50">
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Leaf" size={20} color="white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground">HerbTrace</span>
            <span className="text-xs text-muted-foreground hidden sm:block">Product Verification</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant={currentView === 'scanner' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('scanner')}
            iconName="QrCode"
            iconPosition="left"
          >
            Scanner
          </Button>
          <Button
            variant={currentView === 'history' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('history')}
            iconName="History"
            iconPosition="left"
          >
            History
          </Button>
          <Button
            variant={currentView === 'help' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('help')}
            iconName="HelpCircle"
            iconPosition="left"
          >
            Help
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden"
        >
          <Icon name={showMobileMenu ? "X" : "Menu"} size={20} />
        </Button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="p-4 space-y-2">
            {/* View Navigation */}
            <div className="space-y-1">
              <Button
                variant={currentView === 'scanner' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => {
                  setCurrentView('scanner');
                  setShowMobileMenu(false);
                }}
                iconName="QrCode"
                iconPosition="left"
                className="w-full justify-start"
              >
                QR Scanner
              </Button>
              <Button
                variant={currentView === 'history' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => {
                  setCurrentView('history');
                  setShowMobileMenu(false);
                }}
                iconName="History"
                iconPosition="left"
                className="w-full justify-start"
              >
                Verification History
              </Button>
              <Button
                variant={currentView === 'help' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => {
                  setCurrentView('help');
                  setShowMobileMenu(false);
                }}
                iconName="HelpCircle"
                iconPosition="left"
                className="w-full justify-start"
              >
                Help & Guide
              </Button>
            </div>

            {/* Divider */}
            <div className="border-t border-border my-2" />

            {/* Other Pages Navigation */}
            <div className="space-y-1">
              {navigationItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigate(item?.path);
                    setShowMobileMenu(false);
                  }}
                  iconName={item?.icon}
                  iconPosition="left"
                  className="w-full justify-start text-muted-foreground"
                >
                  {item?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Render floating action buttons for mobile
  const renderFloatingActions = () => {
    if (currentView !== 'scanner' || isScanning) return null;

    return (
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentView('history')}
          className="w-12 h-12 rounded-full bg-background shadow-clinical"
        >
          <Icon name="History" size={20} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentView('help')}
          className="w-12 h-12 rounded-full bg-background shadow-clinical"
        >
          <Icon name="HelpCircle" size={20} />
        </Button>
      </div>
    );
  };

  // Render scanner view
  const renderScannerView = () => (
    <div className="flex-1 flex flex-col">
      {/* Quick Actions Bar */}
      <div className="p-4 bg-surface border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Scan" size={18} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Ready to scan</span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentView('history')}
              iconName="History"
              iconPosition="left"
              className="hidden sm:flex"
            >
              History
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView('help')}
              iconName="HelpCircle"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Help
            </Button>
          </div>
        </div>
      </div>

      {/* Scanner Interface */}
      <div className="flex-1 relative">
        {!isScanning ? (
          <div className="flex flex-col items-center justify-center h-full p-6 bg-gradient-to-b from-background to-surface">
            <div className="text-center space-y-6 max-w-md">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="QrCode" size={48} className="text-primary" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Verify Product Authenticity</h2>
                <p className="text-muted-foreground">
                  Scan the QR code on your Ayurvedic product to verify its authenticity and view complete supply chain information.
                </p>
              </div>

              <Button
                variant="default"
                size="lg"
                onClick={() => setIsScanning(true)}
                iconName="Camera"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Start QR Scanner
              </Button>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="text-center space-y-2">
                  <Icon name="ShieldCheck" size={24} className="text-success mx-auto" />
                  <h3 className="font-medium text-foreground">Blockchain Verified</h3>
                  <p className="text-xs text-muted-foreground">Immutable authenticity records</p>
                </div>
                <div className="text-center space-y-2">
                  <Icon name="FlaskConical" size={24} className="text-primary mx-auto" />
                  <h3 className="font-medium text-foreground">Lab Tested</h3>
                  <p className="text-xs text-muted-foreground">Quality and purity certified</p>
                </div>
                <div className="text-center space-y-2">
                  <Icon name="MapPin" size={24} className="text-secondary mx-auto" />
                  <h3 className="font-medium text-foreground">Origin Tracked</h3>
                  <p className="text-xs text-muted-foreground">Complete supply chain visibility</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <QRScannerInterface
            isActive={isScanning}
            onScanSuccess={handleScanSuccess}
            onScanError={handleScanError}
          />
        )}
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {renderNavigation()}
      
      <div className="flex-1">
        {currentView === 'scanner' && renderScannerView()}
        
        {currentView === 'result' && (
          <ProductVerificationResult
            productData={scannedProduct}
            onBack={() => setCurrentView('scanner')}
            onShare={handleShareProduct}
            onReport={handleReportProduct}
          />
        )}
        
        {currentView === 'history' && (
          <VerificationHistory
            onSelectProduct={handleSelectFromHistory}
            onClearHistory={handleClearHistory}
          />
        )}
        
        {currentView === 'help' && (
          <HelpGuide onClose={() => setCurrentView('scanner')} />
        )}
      </div>

      {renderFloatingActions()}

      {/* Overlay for mobile menu */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}
    </div>
  );
};

export default ConsumerProductVerification;