import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedSidebar = ({ isCollapsed = false, userRole = 'collector', className = '' }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  // Persist sidebar preferences
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-expanded-sections');
    if (saved) {
      setExpandedSections(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded-sections', JSON.stringify(expandedSections));
  }, [expandedSections]);

  const toggleSection = (sectionId) => {
    if (isCollapsed) return;
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Role-based navigation configuration
  const getNavigationItems = () => {
    const baseItems = {
      collector: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: 'LayoutDashboard',
          path: '/collector-dashboard',
          description: 'Collection overview and metrics'
        },
        {
          id: 'collections',
          label: 'Collections',
          icon: 'Leaf',
          children: [
            { label: 'New Collection', path: '/collector-dashboard', icon: 'Plus' },
            { label: 'Active Batches', path: '/collector-dashboard', icon: 'Package' },
            { label: 'Collection History', path: '/collector-dashboard', icon: 'History' }
          ]
        },
        {
          id: 'verification',
          label: 'Verification',
          icon: 'ShieldCheck',
          path: '/consumer-product-verification',
          description: 'Blockchain verification status'
        }
      ],
      laboratory: [
        {
          id: 'dashboard',
          label: 'Lab Dashboard',
          icon: 'LayoutDashboard',
          path: '/laboratory-testing-interface',
          description: 'Testing overview and queue'
        },
        {
          id: 'testing',
          label: 'Testing Interface',
          icon: 'FlaskConical',
          children: [
            { label: 'Sample Queue', path: '/laboratory-testing-interface', icon: 'Clock' },
            { label: 'Active Tests', path: '/laboratory-testing-interface', icon: 'TestTube' },
            { label: 'Results Entry', path: '/laboratory-testing-interface', icon: 'FileText' },
            { label: 'Quality Control', path: '/laboratory-testing-interface', icon: 'CheckCircle' }
          ]
        },
        {
          id: 'reports',
          label: 'Reports',
          icon: 'FileBarChart',
          children: [
            { label: 'Test Reports', path: '/laboratory-testing-interface', icon: 'FileText' },
            { label: 'Certificates', path: '/laboratory-testing-interface', icon: 'Award' }
          ]
        }
      ],
      supply_chain: [
        {
          id: 'dashboard',
          label: 'Supply Dashboard',
          icon: 'LayoutDashboard',
          path: '/supply-chain-tracking-dashboard',
          description: 'Supply chain overview'
        },
        {
          id: 'tracking',
          label: 'Tracking',
          icon: 'Truck',
          children: [
            { label: 'Active Shipments', path: '/supply-chain-tracking-dashboard', icon: 'Package' },
            { label: 'Route Planning', path: '/supply-chain-tracking-dashboard', icon: 'Map' },
            { label: 'Delivery Status', path: '/supply-chain-tracking-dashboard', icon: 'CheckCircle' }
          ]
        },
        {
          id: 'inventory',
          label: 'Inventory',
          icon: 'Warehouse',
          children: [
            { label: 'Stock Levels', path: '/supply-chain-tracking-dashboard', icon: 'BarChart3' },
            { label: 'Batch Management', path: '/supply-chain-tracking-dashboard', icon: 'Package' }
          ]
        }
      ],
      regulatory: [
        {
          id: 'dashboard',
          label: 'Compliance Dashboard',
          icon: 'LayoutDashboard',
          path: '/regulatory-compliance-dashboard',
          description: 'Regulatory oversight'
        },
        {
          id: 'compliance',
          label: 'Compliance',
          icon: 'Shield',
          children: [
            { label: 'Audit Trail', path: '/regulatory-compliance-dashboard', icon: 'FileSearch' },
            { label: 'Violations', path: '/regulatory-compliance-dashboard', icon: 'AlertTriangle' },
            { label: 'Reports', path: '/regulatory-compliance-dashboard', icon: 'FileText' }
          ]
        },
        {
          id: 'monitoring',
          label: 'Monitoring',
          icon: 'Eye',
          children: [
            { label: 'Real-time Tracking', path: '/regulatory-compliance-dashboard', icon: 'Activity' },
            { label: 'Alerts', path: '/regulatory-compliance-dashboard', icon: 'Bell' }
          ]
        }
      ]
    };

    return baseItems?.[userRole] || baseItems?.collector;
  };

  const navigationItems = getNavigationItems();

  const isActiveItem = (item) => {
    if (item?.path) {
      return location?.pathname === item?.path;
    }
    if (item?.children) {
      return item?.children?.some(child => location?.pathname === child?.path);
    }
    return false;
  };

  const renderNavItem = (item, level = 0) => {
    const isActive = isActiveItem(item);
    const hasChildren = item?.children && item?.children?.length > 0;
    const isExpanded = expandedSections?.[item?.id];

    return (
      <div key={item?.id || item?.label} className="mb-1">
        <Button
          variant={isActive ? "default" : "ghost"}
          size="sm"
          onClick={() => {
            if (hasChildren) {
              toggleSection(item?.id);
            } else if (item?.path) {
              handleNavigation(item?.path);
            }
          }}
          iconName={item?.icon}
          iconPosition="left"
          iconSize={18}
          className={`
            w-full justify-start h-10 px-3
            ${level > 0 ? 'ml-4 w-auto' : ''}
            ${isCollapsed ? 'px-2 justify-center' : ''}
            ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}
          `}
        >
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item?.label}</span>
              {hasChildren && (
                <Icon 
                  name={isExpanded ? "ChevronDown" : "ChevronRight"} 
                  size={16}
                  className="ml-auto"
                />
              )}
            </>
          )}
        </Button>
        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-16 bg-popover border border-border rounded-md px-2 py-1 text-xs opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
            {item?.label}
            {item?.description && (
              <div className="text-muted-foreground mt-1">{item?.description}</div>
            )}
          </div>
        )}
        {/* Children */}
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {item?.children?.map((child) => (
              <Button
                key={child?.label}
                variant={location?.pathname === child?.path ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(child?.path)}
                iconName={child?.icon}
                iconPosition="left"
                iconSize={16}
                className="w-full justify-start h-9 ml-6 px-3 text-sm"
              >
                {child?.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`
      fixed left-0 top-16 h-[calc(100vh-4rem)] bg-background border-r border-border z-40
      transition-all duration-300 ease-out
      ${isCollapsed ? 'w-16' : 'w-64'}
      lg:translate-x-0
      ${className}
    `}>
      <div className="flex flex-col h-full">
        {/* Quick Actions Panel */}
        <div className="p-4 border-b border-border">
          {!isCollapsed ? (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={14}
                  className="text-xs"
                  onClick={() => {
                    // Role-specific quick action
                    if (userRole === 'collector') handleNavigation('/collector-dashboard');
                    else if (userRole === 'laboratory') handleNavigation('/laboratory-testing-interface');
                    else if (userRole === 'supply_chain') handleNavigation('/supply-chain-tracking-dashboard');
                    else handleNavigation('/regulatory-compliance-dashboard');
                  }}
                >
                  New
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Search"
                  iconPosition="left"
                  iconSize={14}
                  className="text-xs"
                >
                  Search
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                size="icon"
                iconName="Plus"
                iconSize={16}
                className="w-8 h-8"
              />
              <Button
                variant="outline"
                size="icon"
                iconName="Search"
                iconSize={16}
                className="w-8 h-8"
              />
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Navigation
            </h3>
          )}
          
          <div className="space-y-1">
            {navigationItems?.map((item) => renderNavItem(item))}
          </div>
        </nav>

        {/* Blockchain Status Footer */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full blockchain-status-pulse" />
                <span className="text-xs text-muted-foreground">Blockchain Connected</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Block: #2,847,392
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-3 h-3 bg-success rounded-full blockchain-status-pulse" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default RoleBasedSidebar;