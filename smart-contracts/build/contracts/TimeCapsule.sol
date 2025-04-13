// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract TimeCapsule {
    struct Message {
        string content;
        uint256 unlockTime;
    }

    mapping(address => Message) private messages;

    // Crear mensaje con tiempo de desbloqueo
    function createMessage(string memory _content, uint256 _unlockTime) public {
        require(_unlockTime > block.timestamp, "El tiempo debe ser futuro");
        messages[msg.sender] = Message(_content, _unlockTime);
    }

    // Leer mensaje (si el tiempo ya pasó)
    function getMessage() public view returns (string memory) {
        Message memory m = messages[msg.sender];
        require(block.timestamp >= m.unlockTime, "Aun no puedes ver este mensaje");
        return m.content;
    }

    // Obtener el tiempo de desbloqueo por separado (opcional para frontend)
    function getUnlockTime() public view returns (uint256) {
        return messages[msg.sender].unlockTime;
    }
}

