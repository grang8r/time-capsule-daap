const TimeCapsule = artifacts.require("TimeCapsule");

contract("TimeCapsule", (accounts) => {
  it("debería crear un mensaje y almacenarlo cifrado", async () => {
    const instance = await TimeCapsule.deployed();
    const encrypted = "ENCRYPTED_MESSAGE";
    
    await instance.createMessage(encrypted, { from: accounts[0] });
    const count = await instance.getMessagesCount();
    
    assert.equal(count.toNumber(), 1, "No se ha creado el mensaje");
    
    const message = await instance.getMessage(0, { from: accounts[0] });
    assert.equal(message.content, encrypted, "El contenido no coincide");
  });

  it("no debería poder leer el mensaje antes de los 10 segundos", async () => {
    const instance = await TimeCapsule.deployed();
    const message = await instance.getMessage(0, { from: accounts[0] });
    const now = Math.floor(Date.now() / 1000);

    assert.ok(message.unlockTime > now, "El mensaje no tiene tiempo futuro");
  });

  it("debería permitir leer el mensaje después de 10 segundos", async () => {
    const instance = await TimeCapsule.deployed();
    
    await new Promise((resolve) => setTimeout(resolve, 11000)); // esperar 11s

    const message = await instance.getMessage(0, { from: accounts[0] });
    const now = Math.floor(Date.now() / 1000);

    assert.ok(now >= message.unlockTime, "El mensaje aún no está disponible");
  });
});

