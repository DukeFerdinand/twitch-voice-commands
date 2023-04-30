"use client";

import { useEffect, useState } from "react";
import { usePorcupine } from "@picovoice/porcupine-react";

export default function VoiceWidget() {
  console.log("voice widget here");
  const [keywordDetections, setKeywordDetections] = useState<string[]>([]);
  const [accessKey, setAccessKey] = useState(
    "rxzhFhwO8NccGkvT66ivBH7X2sp6f76XS3FaAM0a1dZPIAlM7473Qw=="
  );

  const [keywords] = useState<Array<any>>([
    {
      label: "Hey Botsuro",
      publicPath: "public/models/hey-bot-suero_en_wasm_v2_2_0.ppn",
      sensitivity: 0.999,
    },
  ]);

  const {
    keywordDetection,
    isLoaded,
    isListening,
    error,
    init,
    start,
    stop,
    release,
  } = usePorcupine();

  const initEngine = async () => {
    await init(accessKey, keywords, {
      publicPath: "public/models/hey-bot-suero_en_wasm_v2_2_0.ppn",
    });
  };

  useEffect(() => {
    if (keywordDetection !== null) {
      setKeywordDetections((oldVal) => [...oldVal, keywordDetection.label]);
    }
  }, [keywordDetection]);

  return (
    <div className="voice-widget">
      <h2>VoiceWidget</h2>
      <h3>
        <label>
          AccessKey obtained from{" "}
          <a href="https://console.picovoice.ai/">Picovoice Console</a>
          :
          <input
            type="password"
            name="accessKey"
            onChange={(value) => setAccessKey(value.target.value)}
          />
          <button className="init-button" onClick={() => initEngine()}>
            Init Porcupine
          </button>
        </label>
      </h3>
      <h3>Loaded: {JSON.stringify(isLoaded)}</h3>
      <h3>Listening: {JSON.stringify(isListening)}</h3>
      <h3>Error: {JSON.stringify(error !== null)}</h3>
      {error && <p className="error-message">{JSON.stringify(error)}</p>}
      <h3>Keywords: {JSON.stringify(keywords)}</h3>
      <br />
      <button
        onClick={() => start()}
        disabled={error !== null || !isLoaded || isListening}
      >
        Start
      </button>
      <button
        onClick={() => stop()}
        disabled={error !== null || !isLoaded || !isListening}
      >
        Stop
      </button>
      <button onClick={() => release()} disabled={error !== null || !isLoaded}>
        Release
      </button>
      <h3>Keyword Detections (listening for `Hey Botsuro`):</h3>
      {keywordDetections.length > 0 && (
        <ul>
          {keywordDetections.map((label: string, index: number) => (
            <li key={index}>{label}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
