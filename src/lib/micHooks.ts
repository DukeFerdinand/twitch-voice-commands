import { useEffect, useState } from "react";

export const useMediatream = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  async function initMicrophone() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        // video: true,
      });

      setMediaStream(stream);
    } catch (error) {
      //this is when user don't allow media devices
      console.log(error);
    }
  }

  useEffect(() => {
    if (mediaStream) {
      setMediaRecorder(new MediaRecorder(mediaStream));
    }
  }, [mediaStream]);

  return {
    initMicrophone,
    mediaStream,
    mediaRecorder,
  };
};
