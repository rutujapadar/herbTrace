import React, { useState } from 'react';
import BrandedBackground from './components/BrandedBackground';
import AuthenticationForm from './components/AuthenticationForm';
import Web3WalletConnection from './components/Web3WalletConnection';
import TrustSignals from './components/TrustSignals';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserRegistrationLogin = () => {
  const [showWalletConnection, setShowWalletConnection] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [authStep, setAuthStep] = useState('form'); // 'form', 'wallet', 'success'

  const handleAuthSuccess = (userRole) => {
    console.log('Authentication successful for role:', userRole);
    setAuthStep('success');
  };

  const handleWalletConnect = (walletData) => {
    setConnectedWallet(walletData);
    if (walletData) {
      setAuthStep('form');
    }
  };

  const toggleWalletConnection = () => {
    setShowWalletConnection(!showWalletConnection);
    setAuthStep(showWalletConnection ? 'form' : 'wallet');
  };

  return (
    <BrandedBackground>
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Column - Information */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6 shadow-clinical">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Secure Supply Chain Access
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Join the blockchain-powered Ayurvedic herb supply chain network. 
              Authenticate securely and access role-based features for transparent, 
              traceable herb authentication.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-0.5">
                  <Icon name="Leaf" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Herb Collectors</p>
                  <p className="text-xs text-muted-foreground">
                    Record harvest data, GPS locations, and quality parameters
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mt-0.5">
                  <Icon name="FlaskConical" size={16} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Laboratory Testing</p>
                  <p className="text-xs text-muted-foreground">
                    Input test results, generate certificates, quality assurance
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center mt-0.5">
                  <Icon name="Truck" size={16} className="text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Supply Chain</p>
                  <p className="text-xs text-muted-foreground">
                    Track shipments, manage inventory, logistics coordination
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center mt-0.5">
                  <Icon name="ShieldCheck" size={16} className="text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Consumers & Regulators</p>
                  <p className="text-xs text-muted-foreground">
                    Verify authenticity, access compliance data, audit trails
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6 shadow-clinical">
            <TrustSignals />
          </div>
        </div>

        {/* Center Column - Authentication */}
        <div className="lg:col-span-1 space-y-6">
          {authStep === 'form' && (
            <>
              <AuthenticationForm onAuthSuccess={handleAuthSuccess} />
              
              {/* Web3 Integration Toggle */}
              <div className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleWalletConnection}
                  iconName="Wallet"
                  iconPosition="left"
                  className="text-sm"
                >
                  {connectedWallet ? 'Wallet Connected' : 'Connect Web3 Wallet'}
                </Button>
              </div>

              {connectedWallet && (
                <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <p className="text-sm text-success font-medium">
                      Wallet connected: {connectedWallet?.address?.slice(0, 6)}...{connectedWallet?.address?.slice(-4)}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {authStep === 'wallet' && (
            <>
              <Web3WalletConnection onWalletConnect={handleWalletConnect} />
              
              <div className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAuthStep('form')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                  className="text-sm"
                >
                  Back to Login
                </Button>
              </div>
            </>
          )}

          {authStep === 'success' && (
            <div className="bg-card border border-border rounded-lg p-8 text-center shadow-clinical">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-success" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Authentication Successful
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Redirecting to your dashboard...
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100" />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Additional Information */}
        <div className="lg:col-span-1 space-y-6">
          {/* Mock Credentials Info */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6 shadow-clinical">
            <h3 className="text-lg font-semibold text-foreground mb-4">Demo Credentials</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use these credentials to explore different user roles:
            </p>
            
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-surface rounded-lg">
                <p className="font-medium text-foreground">Herb Collector</p>
                <p className="text-muted-foreground">collector@herbtrace.com / collector123</p>
              </div>
              
              <div className="p-3 bg-surface rounded-lg">
                <p className="font-medium text-foreground">Laboratory</p>
                <p className="text-muted-foreground">lab@herbtrace.com / lab123</p>
              </div>
              
              <div className="p-3 bg-surface rounded-lg">
                <p className="font-medium text-foreground">Supply Chain</p>
                <p className="text-muted-foreground">supply@herbtrace.com / supply123</p>
              </div>
              
              <div className="p-3 bg-surface rounded-lg">
                <p className="font-medium text-foreground">Consumer</p>
                <p className="text-muted-foreground">consumer@herbtrace.com / consumer123</p>
              </div>
              
              <div className="p-3 bg-surface rounded-lg">
                <p className="font-medium text-foreground">Regulatory</p>
                <p className="text-muted-foreground">regulatory@herbtrace.com / regulatory123</p>
              </div>
            </div>
          </div>

          {/* Features Overview */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6 shadow-clinical">
            <h3 className="text-lg font-semibold text-foreground mb-4">Platform Features</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="QrCode" size={16} className="text-primary" />
                <span className="text-sm text-foreground">QR Code Generation & Scanning</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Link" size={16} className="text-primary" />
                <span className="text-sm text-foreground">Blockchain Integration</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="text-sm text-foreground">GPS Location Tracking</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="FileText" size={16} className="text-primary" />
                <span className="text-sm text-foreground">Digital Certificates</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Activity" size={16} className="text-primary" />
                <span className="text-sm text-foreground">Real-time Tracking</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Shield" size={16} className="text-primary" />
                <span className="text-sm text-foreground">Compliance Monitoring</span>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-primary mb-2">Need Assistance?</h4>
            <p className="text-xs text-muted-foreground mb-4">
              Our support team is available 24/7 to help with onboarding and technical issues.
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Mail"
                iconPosition="left"
                className="flex-1 text-xs"
              >
                Email Support
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                className="flex-1 text-xs"
              >
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BrandedBackground>
  );
};

export default UserRegistrationLogin;