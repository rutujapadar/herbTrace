import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportPanel = ({ onExport, isExporting = false }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    reportType: 'compliance_summary',
    dateRange: 'month',
    includeDetails: true,
    includeCharts: true,
    includeAuditTrail: false
  });

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report', description: 'Formatted document for printing' },
    { value: 'excel', label: 'Excel Spreadsheet', description: 'Data analysis and manipulation' },
    { value: 'csv', label: 'CSV Data', description: 'Raw data for external systems' },
    { value: 'json', label: 'JSON Export', description: 'API-compatible format' }
  ];

  const reportTypeOptions = [
    { value: 'compliance_summary', label: 'Compliance Summary', description: 'Overview of all entities' },
    { value: 'violation_report', label: 'Violation Report', description: 'Detailed violation analysis' },
    { value: 'audit_trail', label: 'Audit Trail', description: 'Complete transaction history' },
    { value: 'certification_status', label: 'Certification Status', description: 'Certification overview' },
    { value: 'blockchain_integrity', label: 'Blockchain Integrity', description: 'Technical verification report' }
  ];

  const dateRangeOptions = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'Last 12 Months' },
    { value: 'all', label: 'All Time' }
  ];

  const handleConfigChange = (key, value) => {
    setExportConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExport = () => {
    onExport(exportConfig);
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'pdf': return 'FileText';
      case 'excel': return 'FileSpreadsheet';
      case 'csv': return 'Database';
      case 'json': return 'Code';
      default: return 'Download';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Download" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Export Compliance Data</h3>
      </div>
      <div className="space-y-6">
        {/* Export Format */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Export Format</label>
          <div className="grid grid-cols-1 gap-3">
            {formatOptions?.map((format) => (
              <div
                key={format?.value}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  exportConfig?.format === format?.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => handleConfigChange('format', format?.value)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center ${
                    exportConfig?.format === format?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-surface text-muted-foreground'
                  }`}>
                    <Icon name={getFormatIcon(format?.value)} size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{format?.label}</p>
                    <p className="text-xs text-muted-foreground">{format?.description}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    exportConfig?.format === format?.value
                      ? 'border-primary bg-primary' :'border-muted-foreground'
                  }`}>
                    {exportConfig?.format === format?.value && (
                      <div className="w-full h-full rounded-full bg-primary-foreground scale-50" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Type */}
        <div>
          <Select
            label="Report Type"
            options={reportTypeOptions}
            value={exportConfig?.reportType}
            onChange={(value) => handleConfigChange('reportType', value)}
            description="Choose the type of compliance report to generate"
          />
        </div>

        {/* Date Range */}
        <div>
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={exportConfig?.dateRange}
            onChange={(value) => handleConfigChange('dateRange', value)}
            description="Select the time period for the report"
          />
        </div>

        {/* Export Options */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Include in Export</label>
          <div className="space-y-3">
            <Checkbox
              label="Detailed Entity Information"
              description="Include comprehensive entity profiles and metadata"
              checked={exportConfig?.includeDetails}
              onChange={(e) => handleConfigChange('includeDetails', e?.target?.checked)}
            />
            
            <Checkbox
              label="Charts and Visualizations"
              description="Include compliance charts and trend graphs (PDF only)"
              checked={exportConfig?.includeCharts}
              onChange={(e) => handleConfigChange('includeCharts', e?.target?.checked)}
              disabled={exportConfig?.format === 'csv' || exportConfig?.format === 'json'}
            />
            
            <Checkbox
              label="Complete Audit Trail"
              description="Include blockchain transaction history and audit logs"
              checked={exportConfig?.includeAuditTrail}
              onChange={(e) => handleConfigChange('includeAuditTrail', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Export Preview */}
        <div className="p-4 bg-surface rounded-lg border">
          <h4 className="text-sm font-medium text-foreground mb-2">Export Preview</h4>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Format:</span>
              <span className="font-medium">{formatOptions?.find(f => f?.value === exportConfig?.format)?.label}</span>
            </div>
            <div className="flex justify-between">
              <span>Report Type:</span>
              <span className="font-medium">{reportTypeOptions?.find(r => r?.value === exportConfig?.reportType)?.label}</span>
            </div>
            <div className="flex justify-between">
              <span>Date Range:</span>
              <span className="font-medium">{dateRangeOptions?.find(d => d?.value === exportConfig?.dateRange)?.label}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Size:</span>
              <span className="font-medium">
                {exportConfig?.includeAuditTrail ? '15-25 MB' : 
                 exportConfig?.includeDetails ? '5-10 MB' : '1-3 MB'}
              </span>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <Button
          variant="default"
          size="lg"
          onClick={handleExport}
          loading={isExporting}
          iconName="Download"
          iconPosition="left"
          iconSize={20}
          className="w-full"
          disabled={isExporting}
        >
          {isExporting ? 'Generating Report...' : 'Generate & Download Report'}
        </Button>

        {/* Recent Exports */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Exports</h4>
          <div className="space-y-2">
            {[
              { name: 'Compliance Summary - December 2024.pdf', date: '2 hours ago', size: '8.2 MB' },
              { name: 'Violation Report - Q4 2024.xlsx', date: '1 day ago', size: '12.5 MB' },
              { name: 'Audit Trail - November 2024.csv', date: '3 days ago', size: '24.1 MB' }
            ]?.map((export_, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-accent rounded">
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium text-foreground">{export_?.name}</p>
                    <p className="text-xs text-muted-foreground">{export_?.date} • {export_?.size}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  iconSize={14}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;