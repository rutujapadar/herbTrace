import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ComplianceFilters = ({ onFiltersChange, totalResults }) => {
  const [filters, setFilters] = useState({
    search: '',
    entityType: '',
    location: '',
    complianceStatus: '',
    certificationStatus: '',
    scoreRange: '',
    dateRange: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const entityTypeOptions = [
    { value: '', label: 'All Entity Types' },
    { value: 'collector', label: 'Collectors' },
    { value: 'laboratory', label: 'Laboratories' },
    { value: 'supply_chain', label: 'Supply Chain' },
    { value: 'manufacturer', label: 'Manufacturers' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'tamil_nadu', label: 'Tamil Nadu' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'rajasthan', label: 'Rajasthan' }
  ];

  const complianceStatusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'compliant', label: 'Compliant' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'violation', label: 'Violation' },
    { value: 'expired', label: 'Expired' }
  ];

  const certificationStatusOptions = [
    { value: '', label: 'All Certifications' },
    { value: 'valid', label: 'Valid' },
    { value: 'expiring', label: 'Expiring Soon' },
    { value: 'expired', label: 'Expired' },
    { value: 'pending', label: 'Pending' }
  ];

  const scoreRangeOptions = [
    { value: '', label: 'All Scores' },
    { value: '90-100', label: '90-100% (Excellent)' },
    { value: '70-89', label: '70-89% (Good)' },
    { value: '50-69', label: '50-69% (Fair)' },
    { value: '0-49', label: '0-49% (Poor)' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      entityType: '',
      location: '',
      complianceStatus: '',
      certificationStatus: '',
      scoreRange: '',
      dateRange: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Compliance Filters</h3>
          <span className="text-sm text-muted-foreground">
            {totalResults} entities found
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="left"
            iconSize={16}
          >
            {isExpanded ? 'Less Filters' : 'More Filters'}
          </Button>
        </div>
      </div>
      {/* Always visible filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          type="search"
          placeholder="Search entities, IDs, or locations..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />
        
        <Select
          options={entityTypeOptions}
          value={filters?.entityType}
          onChange={(value) => handleFilterChange('entityType', value)}
          placeholder="Entity Type"
        />
        
        <Select
          options={complianceStatusOptions}
          value={filters?.complianceStatus}
          onChange={(value) => handleFilterChange('complianceStatus', value)}
          placeholder="Compliance Status"
        />
        
        <Select
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
          placeholder="Date Range"
        />
      </div>
      {/* Expandable filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border">
          <Select
            options={locationOptions}
            value={filters?.location}
            onChange={(value) => handleFilterChange('location', value)}
            placeholder="Location"
          />
          
          <Select
            options={certificationStatusOptions}
            value={filters?.certificationStatus}
            onChange={(value) => handleFilterChange('certificationStatus', value)}
            placeholder="Certification Status"
          />
          
          <Select
            options={scoreRangeOptions}
            value={filters?.scoreRange}
            onChange={(value) => handleFilterChange('scoreRange', value)}
            placeholder="Compliance Score"
          />
        </div>
      )}
      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-xs font-medium text-muted-foreground">Active Filters:</span>
          {Object.entries(filters)?.map(([key, value]) => {
            if (!value) return null;
            
            const getFilterLabel = (key, value) => {
              switch (key) {
                case 'search':
                  return `Search: "${value}"`;
                case 'entityType':
                  return `Type: ${entityTypeOptions?.find(o => o?.value === value)?.label}`;
                case 'location':
                  return `Location: ${locationOptions?.find(o => o?.value === value)?.label}`;
                case 'complianceStatus':
                  return `Status: ${complianceStatusOptions?.find(o => o?.value === value)?.label}`;
                case 'certificationStatus':
                  return `Cert: ${certificationStatusOptions?.find(o => o?.value === value)?.label}`;
                case 'scoreRange':
                  return `Score: ${scoreRangeOptions?.find(o => o?.value === value)?.label}`;
                case 'dateRange':
                  return `Date: ${dateRangeOptions?.find(o => o?.value === value)?.label}`;
                default:
                  return `${key}: ${value}`;
              }
            };

            return (
              <span
                key={key}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
              >
                <span>{getFilterLabel(key, value)}</span>
                <button
                  onClick={() => handleFilterChange(key, '')}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ComplianceFilters;