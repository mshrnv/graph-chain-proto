// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract Graph {
    uint public userStartBalance = 11 ether;

    address[] public users;
    mapping(string => address) public graphOwner;
    mapping(string => uint) public graphPrice;
    mapping(address => string[]) public access;
    mapping(string => uint) public purchases;

    constructor() {}

    function login(address user) public returns (bool) {
        // Checks if user already has start payment
        uint usersCount = users.length;
        for (uint i = 0; i < usersCount; i++) {
            if (users[i] == user) {
                return false;
            }
        }

        // Sending start balance

        // Old method
        // bool sent = payable(user).send(userStartBalance * 1 ether);

        // New method
        (bool sent, bytes memory data) = payable(user).call{value: userStartBalance * 1 ether}("");
        require(sent, "Failed to send Ether");

        return true;
    }

    function hasAccess(address user, string memory graph) public view returns (bool) {
        // Graphs which user bought
        string[] memory userUnlockedGraphs = access[user];
        uint graphsLength = userUnlockedGraphs.length;

        // Check if needle graph unlocked
        for (uint  i = 0; i < graphsLength; i++) {
            if (keccak256(abi.encodePacked(userUnlockedGraphs[i])) == keccak256(abi.encodePacked(graph))) {
                return true;
            }
        }

        return false;
    }

    function buyAccess(string memory graph) public payable returns (bool) {
        // Checks for correct amount
        require(msg.value == graphPrice[graph] * 1 ether, "Incorrect");

        // Transferring ether to graph owner
        (bool sent, bytes memory data) = payable(graphOwner[graph]).call{value: msg.value}("");

        // Checks operation success
        require(sent, "Failed to send Ether");

        // Store access record
        access[msg.sender].push(graph);
        purchases[graph]++;

        return true;
    }

    function newGraph(string memory graph, uint price) public returns (bool) {
        graphOwner[graph] = msg.sender;
        access[msg.sender].push(graph);
        graphPrice[graph] = price;

        return true;
    }

    function purchasesCount(string memory graph) public view returns (uint256) {
        return purchases[graph];
    }

    function getPrice(string memory graph) public view returns (uint256) {
        return graphPrice[graph];
    }

    function setPrice(string memory graph, uint price) public returns (bool) {
        require(msg.sender == graphOwner[graph], "Not an owner");
        graphPrice[graph] = price;

        return true;
    }
}

