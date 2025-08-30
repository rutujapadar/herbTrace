import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const NewCollectionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    herbType: '',
    scientificName: '',
    quantity: '',
    qualityGrade: '',
    location: '',
    coordinates: '',
    collectionMethod: '',
    weatherConditions: '',
    soilType: '',
    notes: ''
  });

  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef(null);

  const herbOptions = [
    { value: 'ashwagandha', label: 'Ashwagandha', description: 'Withania somnifera' },
    { value: 'brahmi', label: 'Brahmi', description: 'Bacopa monnieri' },
    { value: 'tulsi', label: 'Tulsi', description: 'Ocimum sanctum' },
    { value: 'giloy', label: 'Giloy', description: 'Tinospora cordifolia' },
    { value: 'neem', label: 'Neem', description: 'Azadirachta indica' },
    { value: 'turmeric', label: 'Turmeric', description: 'Curcuma longa' }
  ];

  const qualityGradeOptions = [
    { value: 'A+', label: 'Grade A+ (Premium)', description: 'Highest quality, perfect specimens' },
    { value: 'A', label: 'Grade A (Excellent)', description: 'High quality, minor imperfections' },
    { value: 'B+', label: 'Grade B+ (Good)', description: 'Good quality, some variations' },
    { value: 'B', label: 'Grade B (Standard)', description: 'Standard quality, acceptable for processing' },
    { value: 'C', label: 'Grade C (Basic)', description: 'Basic quality, suitable for extraction' }
  ];

  const collectionMethodOptions = [
    { value: 'hand-picking', label: 'Hand Picking', description: 'Manual selection of best specimens' },
    { value: 'cutting', label: 'Cutting', description: 'Using clean cutting tools' },
    { value: 'digging', label: 'Root Digging', description: 'Careful root extraction' },
    { value: 'stripping', label: 'Bark Stripping', description: 'Sustainable bark collection' }
  ];

  const soilTypeOptions = [
    { value: 'clay', label: 'Clay Soil' },
    { value: 'sandy', label: 'Sandy Soil' },
    { value: 'loamy', label: 'Loamy Soil' },
    { value: 'rocky', label: 'Rocky Soil' },
    { value: 'alluvial', label: 'Alluvial Soil' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-populate scientific name when herb type is selected
    if (field === 'herbType') {
      const selectedHerb = herbOptions?.find(herb => herb?.value === value);
      if (selectedHerb) {
        setFormData(prev => ({
          ...prev,
          scientificName: selectedHerb?.description
        }));
      }
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          setFormData(prev => ({
            ...prev,
            coordinates: `${latitude?.toFixed(6)}, ${longitude?.toFixed(6)}`
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event?.target?.files);
    const newPhotos = files?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file?.name
    }));
    
    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const removePhoto = (photoId) => {
    setPhotos(prev => {
      const photo = prev?.find(p => p?.id === photoId);
      if (photo) {
        URL.revokeObjectURL(photo?.url);
      }
      return prev?.filter(p => p?.id !== photoId);
    });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const collectionData = {
        ...formData,
        photos: photos?.map(photo => photo?.file),
        timestamp: new Date()?.toISOString(),
        collectorId: 'collector-001'
      };

      onSubmit(collectionData);
      onClose();
      
      // Reset form
      setFormData({
        herbType: '',
        scientificName: '',
        quantity: '',
        qualityGrade: '',
        location: '',
        coordinates: '',
        collectionMethod: '',
        weatherConditions: '',
        soilType: '',
        notes: ''
      });
      setPhotos([]);
      setCurrentStep(1);
    } catch (error) {
      console.error('Error submitting collection:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData?.herbType && formData?.quantity && formData?.qualityGrade;
      case 2:
        return formData?.location && formData?.collectionMethod;
      case 3:
        return true; // Photos and notes are optional
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Record New Collection</h2>
            <p className="text-sm text-muted-foreground">Step {currentStep} of 3</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center space-x-4">
            {[1, 2, 3]?.map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step < currentStep ? <Icon name="Check" size={16} /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
                
                <Select
                  label="Herb Type"
                  placeholder="Select herb type"
                  options={herbOptions}
                  value={formData?.herbType}
                  onChange={(value) => handleInputChange('herbType', value)}
                  required
                  searchable
                />

                <Input
                  label="Scientific Name"
                  type="text"
                  value={formData?.scientificName}
                  onChange={(e) => handleInputChange('scientificName', e?.target?.value)}
                  placeholder="Auto-populated based on herb type"
                  disabled
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Quantity (kg)"
                    type="number"
                    value={formData?.quantity}
                    onChange={(e) => handleInputChange('quantity', e?.target?.value)}
                    placeholder="0.0"
                    min="0"
                    step="0.1"
                    required
                  />

                  <Select
                    label="Quality Grade"
                    placeholder="Select quality grade"
                    options={qualityGradeOptions}
                    value={formData?.qualityGrade}
                    onChange={(value) => handleInputChange('qualityGrade', value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Location & Collection Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Location & Collection Details</h3>
                
                <Input
                  label="Collection Location"
                  type="text"
                  value={formData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                  placeholder="e.g., Himalayan foothills, Uttarakhand"
                  required
                />

                <div className="flex space-x-2">
                  <Input
                    label="GPS Coordinates"
                    type="text"
                    value={formData?.coordinates}
                    onChange={(e) => handleInputChange('coordinates', e?.target?.value)}
                    placeholder="Latitude, Longitude"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={getCurrentLocation}
                    iconName="MapPin"
                    iconSize={16}
                    className="mt-6"
                  />
                </div>

                <Select
                  label="Collection Method"
                  placeholder="Select collection method"
                  options={collectionMethodOptions}
                  value={formData?.collectionMethod}
                  onChange={(value) => handleInputChange('collectionMethod', value)}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Weather Conditions"
                    type="text"
                    value={formData?.weatherConditions}
                    onChange={(e) => handleInputChange('weatherConditions', e?.target?.value)}
                    placeholder="e.g., Sunny, 24°C, Low humidity"
                  />

                  <Select
                    label="Soil Type"
                    placeholder="Select soil type"
                    options={soilTypeOptions}
                    value={formData?.soilType}
                    onChange={(value) => handleInputChange('soilType', value)}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Photos & Notes */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Photos & Additional Notes</h3>
                
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Collection Photos
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <Icon name="Camera" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload photos of the collected herbs and collection site
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef?.current?.click()}
                      iconName="Upload"
                      iconPosition="left"
                    >
                      Choose Photos
                    </Button>
                  </div>
                </div>

                {/* Photo Preview */}
                {photos?.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {photos?.map((photo) => (
                      <div key={photo?.id} className="relative">
                        <img
                          src={photo?.url}
                          alt={photo?.name}
                          className="w-full h-24 object-cover rounded-lg border border-border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removePhoto(photo?.id)}
                          className="absolute -top-2 -right-2 w-6 h-6"
                        >
                          <Icon name="X" size={12} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <Input
                  label="Additional Notes"
                  type="text"
                  value={formData?.notes}
                  onChange={(e) => handleInputChange('notes', e?.target?.value)}
                  placeholder="Any additional observations or notes about the collection"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            <div className="flex space-x-2">
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  iconName="Save"
                  iconPosition="left"
                >
                  {isSubmitting ? 'Recording...' : 'Record Collection'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCollectionModal;