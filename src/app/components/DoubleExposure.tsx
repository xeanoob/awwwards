'use client';

import { useEffect, useRef, useState } from 'react';

export default function DoubleExposure() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        console.warn("Webcam access denied for Double Exposure effect:", err);
      }
    };
    
    // We request it slightly after load to not block interaction
    setTimeout(startWebcam, 2000);

    return () => {
      const currentVideo = videoRef.current;
      if (currentVideo && currentVideo.srcObject) {
         const tracks = (currentVideo.srcObject as MediaStream).getTracks();
         tracks.forEach(track => track.stop());
      }
    };
  }, []);

  if (!hasPermission) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover scale-x-[-1] contrast-[2.5] brightness-75 grayscale sepia-[0.2]"
      />
    </div>
  );
}
