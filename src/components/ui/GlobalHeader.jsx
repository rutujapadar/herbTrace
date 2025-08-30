import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const GlobalHeader = ({ user, onLogout, sidebarCollapsed, onToggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [blockchainStatus, setBlockchainStatus] = useState('connected');
  const location = useLocation();
  const navigate = useNavigate();

  const getBlockchainStatusColor = () => {
    switch (blockchainStatus) {
      case 'connected': return 'text-success';
      case 'pending': return 'text-warning';
      case 'disconnected': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getBlockchainStatusText = () => {
    switch (blockchainStatus) {
      case 'connected': return 'Network Connected';
      case 'pending': return 'Syncing...';
      case 'disconnected': return 'Network Error';
      default: return 'Unknown';
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const primaryNavItems = [
    { path: '/collector-dashboard', label: 'Collections', icon: 'Leaf' },
    { path: '/laboratory-testing-interface', label: 'Testing', icon: 'FlaskConical' },
    { path: '/supply-chain-tracking-dashboard', label: 'Tracking', icon: 'Truck' },
    { path: '/consumer-product-verification', label: 'Verification', icon: 'ShieldCheck' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Leaf" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">HerbTrace</span>
              <span className="text-xs text-muted-foreground hidden sm:block">Blockchain Supply Chain</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems?.map((item) => (
              <Button
                key={item?.path}
                variant={location?.pathname === item?.path ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                className="text-sm"
              >
                {item?.label}
              </Button>
            ))}
          </nav>
        </div>

        {/* Right Section - Status and User */}
        <div className="flex items-center space-x-4">
          {/* Blockchain Status */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-surface rounded-lg border">
            <div className={`w-2 h-2 rounded-full ${getBlockchainStatusColor()?.replace('text-', 'bg-')} ${blockchainStatus === 'connected' ? 'blockchain-status-pulse' : ''}`} />
            <span className={`text-xs font-medium ${getBlockchainStatusColor()}`}>
              {getBlockchainStatusText()}
            </span>
          </div>

          {/* Mobile Blockchain Status - Icon Only */}
          <div className="md:hidden">
            <div className={`w-3 h-3 rounded-full ${getBlockchainStatusColor()?.replace('text-', 'bg-')} ${blockchainStatus === 'connected' ? 'blockchain-status-pulse' : ''}`} />
          </div>

          {/* Regulatory Dashboard Access */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNavigation('/regulatory-compliance-dashboard')}
            iconName="Shield"
            iconPosition="left"
            iconSize={16}
            className="hidden sm:flex"
          >
            Compliance
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden sm:block text-sm font-medium">
                {user?.name || 'User'}
              </span>
              <Icon name="ChevronDown" size={16} className="hidden sm:block" />
            </Button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-clinical z-60">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">{user?.name || 'User'}</p>
                  <p className="text-xs text-muted-foreground">{user?.role || 'Collector'}</p>
                </div>
                <div className="p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowUserMenu(false);
                      // Handle profile navigation
                    }}
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full justify-start"
                  >
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowUserMenu(false);
                      // Handle help navigation
                    }}
                    iconName="HelpCircle"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full justify-start"
                  >
                    Help
                  </Button>
                  <div className="border-t border-border my-1" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    iconName="LogOut"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full justify-start text-error hover:text-error"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation Overlay */}
      {!sidebarCollapsed && (
        <div className="lg:hidden fixed inset-0 top-16 bg-black/20 z-40" onClick={onToggleSidebar} />
      )}
    </header>
  );
};

export default GlobalHeader;