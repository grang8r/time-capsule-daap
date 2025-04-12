// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TimeCapsule {
    struct Message {
        address sender;
        string content;
        uint unlockTime;
    }

    Message[] public messages;

    event MessageCreated(address indexed sender, uint unlockTime);

    function createMessage(string memory _content, uint _secondsFromNow) public {
        require(_secondsFromNow > 0, "El tiempo debe ser en el futuro");
        uint unlockTime = block.timestamp + _secondsFromNow;
        messages.push(Message(msg.sender, _content, unlockTime));
        emit MessageCreated(msg.sender, unlockTime);
    }

    function getMessage(uint _index) public view returns (string memory content, uint unlockTime) {
        require(_index < messages.length, "Mensaje no existe");
        Message memory m = messages[_index];
        require(block.timestamp >= m.unlockTime, "Todavia no puedes ver este mensaje");
        return (m.content, m.unlockTime);
    }

    function getMessagesCount() public view returns (uint) {
        return messages.length;
    }
}
