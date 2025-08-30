import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuthenticationForm = ({ onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    organizationName: '',
    certificationNumber: '',
    walletAddress: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const roleOptions = [
    { value: 'collector', label: 'Herb Collector/Farmer' },
    { value: 'laboratory', label: 'Laboratory Technician' },
    { value: 'supply_chain', label: 'Supply Chain Manager' },
    { value: 'consumer', label: 'Consumer' },
    { value: 'regulatory', label: 'Regulatory Authority' }
  ];

  const mockCredentials = {
    collector: { email: 'collector@herbtrace.com', password: 'collector123' },
    laboratory: { email: 'lab@herbtrace.com', password: 'lab123' },
    supply_chain: { email: 'supply@herbtrace.com', password: 'supply123' },
    consumer: { email: 'consumer@herbtrace.com', password: 'consumer123' },
    regulatory: { email: 'regulatory@herbtrace.com', password: 'regulatory123' }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    if (activeTab === 'register') {
      if (!formData?.organizationName) {
        newErrors.organizationName = 'Organization name is required';
      }
      
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (formData?.role !== 'consumer' && !formData?.certificationNumber) {
        newErrors.certificationNumber = 'Certification number is required for this role';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (activeTab === 'login') {
        // Check mock credentials
        const roleCredentials = mockCredentials?.[formData?.role];
        if (formData?.email === roleCredentials?.email && formData?.password === roleCredentials?.password) {
          onAuthSuccess(formData?.role);
          
          // Navigate to role-specific dashboard
          const dashboardRoutes = {
            collector: '/collector-dashboard',
            laboratory: '/laboratory-testing-interface',
            supply_chain: '/supply-chain-tracking-dashboard',
            consumer: '/consumer-product-verification',
            regulatory: '/regulatory-compliance-dashboard'
          };
          
          navigate(dashboardRoutes?.[formData?.role]);
        } else {
          setErrors({ 
            email: 'Invalid credentials. Please check email and password.',
            password: 'Invalid credentials. Please check email and password.'
          });
        }
      } else {
        // Registration success
        onAuthSuccess(formData?.role);
        const dashboardRoutes = {
          collector: '/collector-dashboard',
          laboratory: '/laboratory-testing-interface',
          supply_chain: '/supply-chain-tracking-dashboard',
          consumer: '/consumer-product-verification',
          regulatory: '/regulatory-compliance-dashboard'
        };
        
        navigate(dashboardRoutes?.[formData?.role]);
      }
    } catch (error) {
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card border border-border rounded-lg shadow-clinical">
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('login')}
          className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
            activeTab === 'login' ?'text-primary border-b-2 border-primary bg-accent/50' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="LogIn" size={16} className="inline mr-2" />
          Sign In
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
            activeTab === 'register' ?'text-primary border-b-2 border-primary bg-accent/50' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="UserPlus" size={16} className="inline mr-2" />
          Register
        </button>
      </div>
      {/* Form Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* General Error */}
          {errors?.general && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          )}

          {/* Email Field */}
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          {/* Password Field */}
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>

          {/* Confirm Password (Register only) */}
          {activeTab === 'register' && (
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
            />
          )}

          {/* Role Selection */}
          <Select
            label="Select Your Role"
            placeholder="Choose your role in the supply chain"
            options={roleOptions}
            value={formData?.role}
            onChange={(value) => handleInputChange('role', value)}
            error={errors?.role}
            required
          />

          {/* Organization Name (Register only) */}
          {activeTab === 'register' && (
            <Input
              label="Organization Name"
              type="text"
              placeholder="Enter your organization name"
              value={formData?.organizationName}
              onChange={(e) => handleInputChange('organizationName', e?.target?.value)}
              error={errors?.organizationName}
              required
            />
          )}

          {/* Certification Number (Register only, not for consumers) */}
          {activeTab === 'register' && formData?.role && formData?.role !== 'consumer' && (
            <Input
              label="Certification Number"
              type="text"
              placeholder="Enter your certification/license number"
              value={formData?.certificationNumber}
              onChange={(e) => handleInputChange('certificationNumber', e?.target?.value)}
              error={errors?.certificationNumber}
              required
            />
          )}

          {/* Wallet Address (Register only) */}
          {activeTab === 'register' && (
            <Input
              label="Wallet Address (Optional)"
              type="text"
              placeholder="0x... (for blockchain integration)"
              value={formData?.walletAddress}
              onChange={(e) => handleInputChange('walletAddress', e?.target?.value)}
              description="Connect your Web3 wallet for blockchain transactions"
            />
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName={activeTab === 'login' ? 'LogIn' : 'UserPlus'}
            iconPosition="left"
            className="mt-6"
          >
            {activeTab === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {/* Secondary Actions */}
        <div className="mt-6 space-y-3">
          {activeTab === 'login' && (
            <div className="text-center">
              <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                Forgot your password?
              </button>
            </div>
          )}

          <div className="text-center">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Need help? Contact support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationForm;