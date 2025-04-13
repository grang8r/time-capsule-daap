// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract TimeCapsule {
    struct Message {
        address sender;
        string content;
        uint256 unlockTime;
    }

    Message[] public messages;

    event MessageCreated(address indexed sender, uint256 unlockTime);

    function createMessage(string memory _encryptedContent) public {
        uint256 unlockTime = block.timestamp + 10;
        messages.push(Message(msg.sender, _encryptedContent, unlockTime));
        emit MessageCreated(msg.sender, unlockTime);
    }

    function getMessage(uint256 _index) public view returns (string memory content, uint256 unlockTime) {
        require(_index < messages.length, "Index out of bounds");
        return (messages[_index].content, messages[_index].unlockTime);
    }

    function getMessagesCount() public view returns (uint256) {
        return messages.length;
    }
}

