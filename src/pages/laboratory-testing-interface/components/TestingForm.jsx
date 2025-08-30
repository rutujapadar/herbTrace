import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const TestingForm = ({ batch, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    testType: '',
    equipment: '',
    technician: 'Dr. Sarah Johnson',
    startTime: new Date()?.toISOString()?.slice(0, 16),
    purityAnalysis: {
      activeCompounds: '',
      purityPercentage: '',
      impurities: '',
      moistureContent: ''
    },
    contaminationScreening: {
      heavyMetals: {
        lead: '',
        mercury: '',
        cadmium: '',
        arsenic: ''
      },
      pesticides: '',
      microbial: {
        totalPlateCount: '',
        yeastMold: '',
        ecoli: '',
        salmonella: false
      },
      aflatoxins: ''
    },
    potencyMeasurements: {
      bioactiveCompounds: '',
      standardizedExtract: '',
      potencyRating: ''
    },
    qualityParameters: {
      appearance: '',
      odor: '',
      taste: '',
      texture: '',
      color: ''
    },
    digitalSignature: '',
    notes: '',
    attachments: []
  });

  const [currentSection, setCurrentSection] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const testTypeOptions = [
    { value: 'purity-analysis', label: 'Purity Analysis' },
    { value: 'heavy-metal-screening', label: 'Heavy Metal Screening' },
    { value: 'microbial-testing', label: 'Microbial Testing' },
    { value: 'pesticide-residue', label: 'Pesticide Residue' },
    { value: 'potency-testing', label: 'Potency Testing' },
    { value: 'moisture-analysis', label: 'Moisture Analysis' },
    { value: 'aflatoxin-testing', label: 'Aflatoxin Testing' }
  ];

  const equipmentOptions = [
    { value: 'HPLC-001', label: 'HPLC-001 (Available)' },
    { value: 'HPLC-002', label: 'HPLC-002 (In Use)' },
    { value: 'ICP-MS-001', label: 'ICP-MS-001 (Available)' },
    { value: 'GC-MS-001', label: 'GC-MS-001 (Available)' },
    { value: 'UV-VIS-001', label: 'UV-VIS-001 (Maintenance)' },
    { value: 'FTIR-001', label: 'FTIR-001 (Available)' }
  ];

  const potencyRatingOptions = [
    { value: 'excellent', label: 'Excellent (>95%)' },
    { value: 'good', label: 'Good (85-95%)' },
    { value: 'acceptable', label: 'Acceptable (75-85%)' },
    { value: 'poor', label: 'Poor (<75%)' }
  ];

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: 'FileText' },
    { id: 'purity', label: 'Purity Analysis', icon: 'Beaker' },
    { id: 'contamination', label: 'Contamination', icon: 'Shield' },
    { id: 'potency', label: 'Potency', icon: 'Zap' },
    { id: 'quality', label: 'Quality', icon: 'Eye' },
    { id: 'documentation', label: 'Documentation', icon: 'FileCheck' }
  ];

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (section, subsection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [subsection]: {
          ...prev?.[section]?.[subsection],
          [field]: value
        }
      }
    }));
  };

  const handleFileUpload = (files) => {
    setFormData(prev => ({
      ...prev,
      attachments: [...prev?.attachments, ...Array.from(files)]
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting test results:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Test Type"
          options={testTypeOptions}
          value={formData?.testType}
          onChange={(value) => setFormData(prev => ({ ...prev, testType: value }))}
          required
        />
        <Select
          label="Equipment"
          options={equipmentOptions}
          value={formData?.equipment}
          onChange={(value) => setFormData(prev => ({ ...prev, equipment: value }))}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Technician"
          value={formData?.technician}
          onChange={(e) => setFormData(prev => ({ ...prev, technician: e?.target?.value }))}
          required
        />
        <Input
          label="Start Time"
          type="datetime-local"
          value={formData?.startTime}
          onChange={(e) => setFormData(prev => ({ ...prev, startTime: e?.target?.value }))}
          required
        />
      </div>
    </div>
  );

  const renderPurityAnalysis = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Active Compounds (%)"
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={formData?.purityAnalysis?.activeCompounds}
          onChange={(e) => handleInputChange('purityAnalysis', 'activeCompounds', e?.target?.value)}
        />
        <Input
          label="Purity Percentage (%)"
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={formData?.purityAnalysis?.purityPercentage}
          onChange={(e) => handleInputChange('purityAnalysis', 'purityPercentage', e?.target?.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Impurities (ppm)"
          type="number"
          step="0.01"
          min="0"
          value={formData?.purityAnalysis?.impurities}
          onChange={(e) => handleInputChange('purityAnalysis', 'impurities', e?.target?.value)}
        />
        <Input
          label="Moisture Content (%)"
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={formData?.purityAnalysis?.moistureContent}
          onChange={(e) => handleInputChange('purityAnalysis', 'moistureContent', e?.target?.value)}
        />
      </div>
    </div>
  );

  const renderContaminationScreening = () => (
    <div className="space-y-6">
      {/* Heavy Metals */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Heavy Metals (ppm)</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Input
            label="Lead (Pb)"
            type="number"
            step="0.001"
            min="0"
            value={formData?.contaminationScreening?.heavyMetals?.lead}
            onChange={(e) => handleNestedInputChange('contaminationScreening', 'heavyMetals', 'lead', e?.target?.value)}
          />
          <Input
            label="Mercury (Hg)"
            type="number"
            step="0.001"
            min="0"
            value={formData?.contaminationScreening?.heavyMetals?.mercury}
            onChange={(e) => handleNestedInputChange('contaminationScreening', 'heavyMetals', 'mercury', e?.target?.value)}
          />
          <Input
            label="Cadmium (Cd)"
            type="number"
            step="0.001"
            min="0"
            value={formData?.contaminationScreening?.heavyMetals?.cadmium}
            onChange={(e) => handleNestedInputChange('contaminationScreening', 'heavyMetals', 'cadmium', e?.target?.value)}
          />
          <Input
            label="Arsenic (As)"
            type="number"
            step="0.001"
            min="0"
            value={formData?.contaminationScreening?.heavyMetals?.arsenic}
            onChange={(e) => handleNestedInputChange('contaminationScreening', 'heavyMetals', 'arsenic', e?.target?.value)}
          />
        </div>
      </div>

      {/* Microbial Testing */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Microbial Testing</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Total Plate Count (CFU/g)"
            type="number"
            min="0"
            value={formData?.contaminationScreening?.microbial?.totalPlateCount}
            onChange={(e) => handleNestedInputChange('contaminationScreening', 'microbial', 'totalPlateCount', e?.target?.value)}
          />
          <Input
            label="Yeast & Mold (CFU/g)"
            type="number"
            min="0"
            value={formData?.contaminationScreening?.microbial?.yeastMold}
            onChange={(e) => handleNestedInputChange('contaminationScreening', 'microbial', 'yeastMold', e?.target?.value)}
          />
          <Input
            label="E. coli (CFU/g)"
            type="number"
            min="0"
            value={formData?.contaminationScreening?.microbial?.ecoli}
            onChange={(e) => handleNestedInputChange('contaminationScreening', 'microbial', 'ecoli', e?.target?.value)}
          />
        </div>
        
        <div className="mt-4">
          <Checkbox
            label="Salmonella Detected"
            checked={formData?.contaminationScreening?.microbial?.salmonella}
            onChange={(e) => handleNestedInputChange('contaminationScreening', 'microbial', 'salmonella', e?.target?.checked)}
          />
        </div>
      </div>

      {/* Other Contaminants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Pesticides (ppm)"
          type="number"
          step="0.001"
          min="0"
          value={formData?.contaminationScreening?.pesticides}
          onChange={(e) => handleInputChange('contaminationScreening', 'pesticides', e?.target?.value)}
        />
        <Input
          label="Aflatoxins (ppb)"
          type="number"
          step="0.001"
          min="0"
          value={formData?.contaminationScreening?.aflatoxins}
          onChange={(e) => handleInputChange('contaminationScreening', 'aflatoxins', e?.target?.value)}
        />
      </div>
    </div>
  );

  const renderPotencyMeasurements = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Bioactive Compounds (%)"
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={formData?.potencyMeasurements?.bioactiveCompounds}
          onChange={(e) => handleInputChange('potencyMeasurements', 'bioactiveCompounds', e?.target?.value)}
        />
        <Input
          label="Standardized Extract (%)"
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={formData?.potencyMeasurements?.standardizedExtract}
          onChange={(e) => handleInputChange('potencyMeasurements', 'standardizedExtract', e?.target?.value)}
        />
      </div>
      
      <Select
        label="Potency Rating"
        options={potencyRatingOptions}
        value={formData?.potencyMeasurements?.potencyRating}
        onChange={(value) => handleInputChange('potencyMeasurements', 'potencyRating', value)}
      />
    </div>
  );

  const renderQualityParameters = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Appearance"
          value={formData?.qualityParameters?.appearance}
          onChange={(e) => handleInputChange('qualityParameters', 'appearance', e?.target?.value)}
          placeholder="e.g., Fine powder, brownish color"
        />
        <Input
          label="Odor"
          value={formData?.qualityParameters?.odor}
          onChange={(e) => handleInputChange('qualityParameters', 'odor', e?.target?.value)}
          placeholder="e.g., Characteristic, aromatic"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Taste"
          value={formData?.qualityParameters?.taste}
          onChange={(e) => handleInputChange('qualityParameters', 'taste', e?.target?.value)}
          placeholder="e.g., Bitter, astringent"
        />
        <Input
          label="Texture"
          value={formData?.qualityParameters?.texture}
          onChange={(e) => handleInputChange('qualityParameters', 'texture', e?.target?.value)}
          placeholder="e.g., Fine, coarse"
        />
        <Input
          label="Color"
          value={formData?.qualityParameters?.color}
          onChange={(e) => handleInputChange('qualityParameters', 'color', e?.target?.value)}
          placeholder="e.g., Light brown"
        />
      </div>
    </div>
  );

  const renderDocumentation = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Test Notes
        </label>
        <textarea
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground resize-none"
          rows={4}
          value={formData?.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e?.target?.value }))}
          placeholder="Enter any additional observations, anomalies, or notes about the testing process..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Digital Signature
        </label>
        <Input
          type="password"
          value={formData?.digitalSignature}
          onChange={(e) => setFormData(prev => ({ ...prev, digitalSignature: e?.target?.value }))}
          placeholder="Enter your digital signature PIN"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Attachments
        </label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Upload lab reports, photos, or additional documentation
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={(e) => handleFileUpload(e?.target?.files)}
            className="hidden"
            id="file-upload"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            Choose Files
          </Button>
        </div>
        
        {formData?.attachments?.length > 0 && (
          <div className="mt-2 space-y-1">
            {formData?.attachments?.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-surface rounded border">
                <span className="text-sm text-foreground">{file?.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  iconSize={14}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      attachments: prev?.attachments?.filter((_, i) => i !== index)
                    }));
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'basic': return renderBasicInfo();
      case 'purity': return renderPurityAnalysis();
      case 'contamination': return renderContaminationScreening();
      case 'potency': return renderPotencyMeasurements();
      case 'quality': return renderQualityParameters();
      case 'documentation': return renderDocumentation();
      default: return renderBasicInfo();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Testing Form</h2>
              <p className="text-sm text-muted-foreground">
                Batch: {batch?.id} - {batch?.herbType}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-8rem)]">
          {/* Section Navigation */}
          <div className="w-64 border-r border-border p-4 overflow-y-auto">
            <nav className="space-y-2">
              {sections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => setCurrentSection(section?.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    currentSection === section?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent text-foreground'
                  }`}
                >
                  <Icon name={section?.icon} size={16} />
                  <span className="text-sm font-medium">{section?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-foreground mb-4">
                  {sections?.find(s => s?.id === currentSection)?.label}
                </h3>
                {renderCurrentSection()}
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div className="flex space-x-2">
                  {sections?.map((section, index) => (
                    <button
                      key={section?.id}
                      type="button"
                      onClick={() => setCurrentSection(section?.id)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentSection === section?.id
                          ? 'bg-primary' :'bg-muted hover:bg-muted-foreground'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    iconName="Save"
                    iconPosition="left"
                    iconSize={16}
                  >
                    {isSubmitting ? 'Submitting to Blockchain...' : 'Submit Results'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingForm;