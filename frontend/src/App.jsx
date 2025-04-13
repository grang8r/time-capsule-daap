import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { getContract, getAccounts } from "./contract";

import './App.css';

function App() {
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isMessageDecrypted, setIsMessageDecrypted] = useState(false);
  const [balls, setBalls] = useState([]);

  // Cuando se guarda el mensaje, se activa la cuenta atrás
  useEffect(() => {
    if (isMessageSent) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsMessageDecrypted(true); // Al acabar la cuenta atrás, desbloquear el mensaje
            handleDecryptMessage(); // Desencriptar el mensaje
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isMessageSent]);

  // Generar bolas aleatorias en la pantalla
  const generateBall = () => {
    const newBall = {
      id: Math.random(),
      left: Math.floor(Math.random() * 100),
      top: Math.floor(Math.random() * 100),
      size: Math.floor(Math.random() * 30 + 20) // Random size between 20 and 50
    };
    setBalls((prevBalls) => [...prevBalls, newBall]);
  };

  // Guardar mensaje y encriptarlo
  const handleSaveMessage = async () => {
    const encrypted = btoa(message); // Simple encoding for illustration
    setEncryptedMessage(encrypted);
    setIsMessageSent(true);

    // Generar bolas dinámicamente
    for (let i = 0; i < 10; i++) {
      setTimeout(generateBall, i * 500); // Delay between balls
    }

    // Aquí iría tu código para enviar el mensaje al contrato
  };

  // Desencriptar el mensaje (simple decodificación)
  const handleDecryptMessage = () => {
    if (encryptedMessage) {
      const decrypted = atob(encryptedMessage); // Simple decoding
      setDecryptedMessage(decrypted);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Cápsula del Tiempo</h1>
        {!isMessageSent ? (
          <div>
            <input
              type="text"
              className="input-message"
              placeholder="Escribe tu mensaje"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="btn-save" onClick={handleSaveMessage}>
              Guardar Mensaje
            </button>
          </div>
        ) : (
          <div>
            {!isMessageDecrypted ? (
              <div>
                <div className="encrypted-msg">
                  <p>Mensaje Cifrado: {encryptedMessage}</p>
                </div>
                <div className="countdown">
                  <p>Tiempo Restante: <span className="timer">{countdown}</span> segundos</p>
                </div>
              </div>
            ) : (
              <div className="decrypted-msg">
                <p>¡Tu mensaje se ha desbloqueado!</p>
                <p>{decryptedMessage}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {balls.map((ball) => (
        <div
          key={ball.id}
          className="ball"
          style={{
            left: `${ball.left}%`,
            top: `${ball.top}%`,
            width: `${ball.size}px`,
            height: `${ball.size}px`,
          }}
        />
      ))}
    </div>
  );
}

export default App;

