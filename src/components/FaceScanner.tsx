import React, { useRef, useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

interface FaceScannerProps {
  onCapture: (imageSrc: string) => void;
  autoCapture?: boolean;
  buttonText?: string;
}

const FaceScanner: React.FC<FaceScannerProps> = ({ 
  onCapture, 
  autoCapture = false, 
  buttonText = "Capture Photo" 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  // Start video stream
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreamActive(true);
        setCameraError('');
        
        // Simulate face detection
        setTimeout(() => {
          setFaceDetected(true);
          setAnimationClass('animate-pulse');
          
          if (autoCapture) {
            startCountdown();
          }
        }, 1500);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setCameraError('Could not access camera. Please ensure you have granted permission.');
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreamActive(false);
      setFaceDetected(false);
      setAnimationClass('');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !isStreamActive) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL and pass to parent component
      const imageSrc = canvas.toDataURL('image/png');
      onCapture(imageSrc);
      
      // Add a flash effect
      setAnimationClass('flash-effect');
      setTimeout(() => setAnimationClass(''), 500);
    }
  };

  const startCountdown = () => {
    setCountdown(3);
  };

  // Handle countdown
  useEffect(() => {
    let timer: number;
    
    if (countdown !== null && countdown > 0) {
      timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      capturePhoto();
      setCountdown(null);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  // Initialize camera when component mounts
  useEffect(() => {
    startVideo();
    
    // Cleanup on unmount
    return () => {
      stopVideo();
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className={`relative rounded-xl overflow-hidden border-4 ${faceDetected ? 'border-green-500' : 'border-gray-300'} ${animationClass}`}>
        {/* Overlay for face detection */}
        {faceDetected && (
          <div className="absolute inset-0 border-2 border-green-500 rounded-lg z-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-56 border-2 border-dashed border-green-500 rounded-full"></div>
          </div>
        )}
        
        {/* Countdown display */}
        {countdown !== null && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <span className="text-white text-6xl font-bold">{countdown}</span>
          </div>
        )}
        
        <video 
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          playsInline
          muted
        />
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
      
      {cameraError && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {cameraError}
        </div>
      )}
      
      <div className="mt-4 flex gap-3">
        {!autoCapture && (
          <button
            onClick={capturePhoto}
            disabled={!isStreamActive || !faceDetected}
            className={`
              px-4 py-2 rounded-md flex items-center
              ${faceDetected 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
              transition-colors duration-200
            `}
          >
            <Camera size={18} className="mr-2" />
            {buttonText}
          </button>
        )}
        
        <button
          onClick={isStreamActive ? stopVideo : startVideo}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
        >
          {isStreamActive ? "Stop Camera" : "Start Camera"}
        </button>
      </div>
      
      {faceDetected && (
        <div className="mt-2 text-sm text-green-600 font-medium">
          Face detected
        </div>
      )}
      
      <style jsx>{`
        .flash-effect {
          animation: flash 0.5s;
        }
        
        @keyframes flash {
          0% { box-shadow: 0 0 0 rgba(59, 130, 246, 0); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
          100% { box-shadow: 0 0 0 rgba(59, 130, 246, 0); }
        }
      `}</style>
    </div>
  );
};

export default FaceScanner;