import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRScannerInterface = ({ onScanSuccess, onScanError, isActive = false }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      streamRef.current = stream;
      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermission(true);
      setIsScanning(true);
    } catch (error) {
      console.error('Camera access denied:', error);
      setHasPermission(false);
      onScanError?.('Camera access denied. Please enable camera permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef?.current) {
      streamRef?.current?.getTracks()?.forEach(track => track?.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const toggleTorch = async () => {
    if (streamRef?.current) {
      const track = streamRef?.current?.getVideoTracks()?.[0];
      if (track && track?.getCapabilities()?.torch) {
        try {
          await track?.applyConstraints({
            advanced: [{ torch: !torchEnabled }]
          });
          setTorchEnabled(!torchEnabled);
        } catch (error) {
          console.error('Torch control failed:', error);
        }
      }
    }
  };

  const simulateQRScan = () => {
    // Mock QR scan for demo purposes
    const mockQRData = {
      batchId: "BTC-2024-08-001",
      productId: "HERB-ASHWAGANDHA-001",
      blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
      timestamp: new Date()?.toISOString()
    };
    
    setTimeout(() => {
      onScanSuccess?.(mockQRData);
    }, 1500);
  };

  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white p-6">
        <Icon name="Camera" size={64} className="text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Camera Access Required</h3>
        <p className="text-gray-300 text-center mb-6">
          Please enable camera permissions to scan QR codes for product verification.
        </p>
        <Button variant="outline" onClick={startCamera} className="text-white border-white">
          Enable Camera
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Camera Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      {/* Scanning Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Viewfinder Frame */}
        <div className="relative w-64 h-64 border-2 border-white rounded-lg">
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
          
          {/* Scanning Line Animation */}
          {isScanning && (
            <div className="absolute inset-x-0 top-0 h-1 bg-primary animate-pulse">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent animate-bounce" />
            </div>
          )}
        </div>
      </div>
      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 bg-black/50 rounded-lg px-3 py-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-white text-sm">Scanning Active</span>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTorch}
          className="bg-black/50 text-white hover:bg-black/70"
        >
          <Icon name={torchEnabled ? "FlashlightOff" : "Flashlight"} size={20} />
        </Button>
      </div>
      {/* Bottom Instructions */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="text-center text-white space-y-4">
          <h3 className="text-lg font-semibold">Scan Product QR Code</h3>
          <p className="text-sm text-gray-300">
            Position the QR code within the frame to verify product authenticity
          </p>
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <Button
              variant="outline"
              onClick={simulateQRScan}
              iconName="QrCode"
              iconPosition="left"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              Demo Scan
            </Button>
            <Button
              variant="ghost"
              onClick={() => onScanError?.('Scan cancelled')}
              iconName="X"
              iconPosition="left"
              className="text-white hover:bg-white/20"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      {/* Focus Tap Area */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={(e) => {
          // Simulate tap to focus
          const rect = e?.currentTarget?.getBoundingClientRect();
          const x = e?.clientX - rect?.left;
          const y = e?.clientY - rect?.top;
          
          // Show focus indicator
          const focusIndicator = document.createElement('div');
          focusIndicator.className = 'absolute w-16 h-16 border-2 border-primary rounded-full animate-ping pointer-events-none';
          focusIndicator.style.left = `${x - 32}px`;
          focusIndicator.style.top = `${y - 32}px`;
          e?.currentTarget?.appendChild(focusIndicator);
          
          setTimeout(() => {
            if (focusIndicator?.parentNode) {
              focusIndicator?.parentNode?.removeChild(focusIndicator);
            }
          }, 1000);
        }}
      />
    </div>
  );
};

export default QRScannerInterface;