import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const HelpGuide = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('scanning');

  const helpSections = [
    {
      id: 'scanning',
      title: 'QR Code Scanning',
      icon: 'QrCode',
      content: [
        {
          title: 'How to Scan QR Codes',
          steps: [
            'Tap the "Scan QR Code" button on the main screen',
            'Allow camera permissions when prompted',
            'Point your camera at the QR code on the product packaging',
            'Keep the QR code within the scanning frame',
            'Wait for the automatic scan to complete'
          ],
          tips: [
            'Ensure good lighting for better scanning accuracy',
            'Hold your device steady and at arm\'s length',
            'Clean your camera lens if scanning fails',
            'Tap the screen to focus if the QR code appears blurry'
          ]
        },
        {
          title: 'Troubleshooting Scan Issues',
          steps: [
            'Check if the QR code is clearly visible and not damaged',
            'Try adjusting the distance between your device and the QR code',
            'Ensure the QR code is well-lit and not in shadow',
            'Clean the QR code surface if it appears dirty or scratched',
            'Use the flashlight feature in low-light conditions'
          ]
        }
      ]
    },
    {
      id: 'verification',
      title: 'Product Verification',
      icon: 'ShieldCheck',
      content: [
        {
          title: 'Understanding Verification Results',
          steps: [
            'Green checkmark indicates verified authentic product',
            'Yellow clock shows verification in progress',
            'Red X mark indicates failed verification or suspicious product',
            'View detailed information in Origin, Quality, and Journey tabs'
          ],
          tips: [
            'Verified products have complete blockchain records',
            'Check the purity score in the Quality tab',
            'Review the supply chain journey for transparency',
            'Look for laboratory certifications and test results'
          ]
        },
        {
          title: 'What Each Status Means',
          steps: [
            'Verified: Product authenticity confirmed through blockchain',
            'Pending: Verification process is still in progress',
            'Failed: Product could not be verified or shows irregularities',
            'Unknown: QR code format not recognized or corrupted'
          ]
        }
      ]
    },
    {
      id: 'blockchain',
      title: 'Blockchain Technology',
      icon: 'Link',
      content: [
        {
          title: 'How Blockchain Ensures Authenticity',
          steps: [
            'Each product gets a unique digital fingerprint',
            'All supply chain data is recorded immutably',
            'Multiple stakeholders verify information independently',
            'Tampering with records is virtually impossible',
            'Real-time verification provides instant results'
          ],
          tips: [
            'Blockchain records cannot be altered or deleted',
            'Multiple network confirmations ensure data integrity',
            'Each transaction has a unique hash for verification',
            'Decentralized storage prevents single points of failure'
          ]
        }
      ]
    },
    {
      id: 'safety',
      title: 'Product Safety',
      icon: 'Shield',
      content: [
        {
          title: 'Identifying Safe Products',
          steps: [
            'Look for high purity scores (above 95%)',
            'Check for "No contaminants detected" status',
            'Verify laboratory certification numbers',
            'Ensure recent testing dates',
            'Confirm organic and fair trade certifications'
          ],
          tips: [
            'Always verify products before consumption',
            'Report suspicious or failed verifications',
            'Check expiration dates on physical packaging',
            'Consult healthcare providers for medical advice'
          ]
        },
        {
          title: 'Red Flags to Watch For',
          steps: [
            'QR codes that don\'t scan or show errors',
            'Products with failed verification status',
            'Missing or incomplete supply chain information',
            'Unusually low purity scores',
            'Expired or missing laboratory certificates'
          ]
        }
      ]
    }
  ];

  const faqItems = [
    {
      question: 'What if the QR code won\'t scan?',
      answer: 'Try cleaning your camera lens, ensuring good lighting, and holding the device steady. If the QR code is damaged, contact the retailer for assistance.'
    },
    {
      question: 'How do I know if a product is authentic?',
      answer: 'Authentic products will show a green "Verified" status with complete blockchain records, laboratory test results, and supply chain information.'
    },
    {
      question: 'What should I do if verification fails?',
      answer: 'Do not consume the product. Report it using the "Report" button and contact the retailer or manufacturer immediately.'
    },
    {
      question: 'Can I verify products offline?',
      answer: 'Initial scanning requires internet connection, but recently verified products are cached for offline viewing.'
    },
    {
      question: 'How recent should test results be?',
      answer: 'Laboratory test results should typically be within 6 months for dried herbs and 3 months for processed products.'
    }
  ];

  const renderContent = () => {
    const section = helpSections?.find(s => s?.id === activeSection);
    
    return (
      <div className="space-y-6">
        {section?.content?.map((item, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">{item?.title}</h3>
            
            {/* Steps */}
            <div className="space-y-3 mb-6">
              {item?.steps?.map((step, stepIndex) => (
                <div key={stepIndex} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                    {stepIndex + 1}
                  </div>
                  <p className="text-foreground">{step}</p>
                </div>
              ))}
            </div>

            {/* Tips */}
            {item?.tips && (
              <div className="bg-surface rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Lightbulb" size={18} className="text-warning" />
                  <h4 className="font-medium text-foreground">Pro Tips</h4>
                </div>
                <ul className="space-y-2">
                  {item?.tips?.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-foreground">Help & Guide</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {helpSections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => setActiveSection(section?.id)}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
                activeSection === section?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={section?.icon} size={18} />
              <span className="font-medium">{section?.title}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        {renderContent()}

        {/* FAQ Section */}
        {activeSection === 'scanning' && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems?.map((faq, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-2 flex items-start space-x-2">
                    <Icon name="HelpCircle" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>{faq?.question}</span>
                  </h3>
                  <p className="text-muted-foreground ml-6">{faq?.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-8 bg-surface border border-border rounded-lg p-6">
          <div className="text-center space-y-4">
            <Icon name="MessageCircle" size={32} className="text-primary mx-auto" />
            <h3 className="text-lg font-semibold text-foreground">Need More Help?</h3>
            <p className="text-muted-foreground">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                iconName="Mail"
                iconPosition="left"
                onClick={() => window.location.href = 'mailto:support@herbtrace.com'}
              >
                Email Support
              </Button>
              <Button
                variant="outline"
                iconName="Phone"
                iconPosition="left"
                onClick={() => window.location.href = 'tel:+1-800-HERB-TRACE'}
              >
                Call Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpGuide;