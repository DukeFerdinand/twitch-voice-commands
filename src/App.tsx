import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { useMediatream } from "./lib/micHooks";
import { btoa } from "buffer";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const { mediaStream, initMicrophone, mediaRecorder } = useMediatream();

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  /**
   *
   * @param data A base64 encoded uint8array
   */
  async function processMic(data: number[]) {
    console.log(await invoke("process_mic", { data }));
  }

  useEffect(() => {
    mediaRecorder?.addEventListener("dataavailable", async (e) => {
      const bytes = new Uint8Array(await e.data.arrayBuffer());
      await processMic(Array.from(bytes));
    });
  });

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <div className="row">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>
        <button onClick={initMicrophone}>Init Microphone</button>

        {mediaRecorder && (
          <>
            <button onClick={() => mediaRecorder.start(250)}>
              Start Listening
            </button>
            <button onClick={() => mediaRecorder.stop()}>Stop Listening</button>
          </>
        )}
      </div>
      <p>Mic active: {JSON.stringify(!!mediaStream?.active)}</p>
      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
