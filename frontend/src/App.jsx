import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { getContract, getAccounts } from "./contract";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [message, setMessage] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [phase, setPhase] = useState("input"); // input | waiting | revealed
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const init = async () => {
      const accs = await getAccounts();
      const c = await getContract();
      setAccount(accs[0]);
      setContract(c);
      console.log("Cuenta:", accs[0]);
    };
    init();
  }, []);

  const handleSave = async () => {
    const encryptedMsg = CryptoJS.AES.encrypt(message, "claveSecreta").toString();
    setEncrypted(encryptedMsg);
    setPhase("waiting");

    try {
      await contract.methods.createMessage(encryptedMsg).send({
        from: account,
        gas: 300000 // 💥 Aquí se fija el gas manualmente
      });

      let time = 10;
      const interval = setInterval(() => {
        time -= 1;
        setTimer(time);
        if (time <= 0) {
          clearInterval(interval);
          const decryptedBytes = CryptoJS.AES.decrypt(encryptedMsg, "claveSecreta");
          const decryptedMsg = decryptedBytes.toString(CryptoJS.enc.Utf8);
          setDecrypted(decryptedMsg);
          setPhase("revealed");
        }
      }, 1000);
    } catch (err) {
      console.error("❌ Error al guardar:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>📦 Time Capsule</h1>

      {phase === "input" && (
        <>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje secreto..."
            style={{ width: "300px", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <br />
          <button onClick={handleSave} style={{ padding: "0.5rem 1rem" }}>
            Guardar mensaje
          </button>
        </>
      )}

      {phase === "waiting" && (
        <>
          <p>🔐 Mensaje encriptado:</p>
          <p style={{ wordBreak: "break-all", fontSize: "0.85rem" }}>{encrypted}</p>
          <p>⏳ Esperando {timer} segundos para desbloquear...</p>
        </>
      )}

      {phase === "revealed" && (
        <>
          <h2>🔓 Tu mensaje:</h2>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{decrypted}</p>
          <p>✅ Se ha desbloqueado tu mensaje</p>
        </>
      )}
    </div>
  );
}

export default App;

