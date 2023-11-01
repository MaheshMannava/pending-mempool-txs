var ethers = require("ethers");
var url = "YOUR_WEBSOCKET_RPC_URL";

var init = function () {
  var customWsProvider = new ethers.providers.WebSocketProvider(url); //  Instantiating an ethers WebSocketProvider instance
  
  customWsProvider.on("pending", (tx) => { // Creating an event listener for pending transactions that will run each time a new transaction hash is sent from the node
    customWsProvider.getTransaction(tx).then(function (transaction) { //Getting the whole transaction using the transaction hash obtained from the previous step and printing the transaction in the console
      console.log(transaction);
    });
  });


  // A function to restart the WebSocket connection if the connection encounters an error
  customWsProvider._websocket.on("error", async () => {
    console.log(`Unable to connect to ${ep.subdomain} retrying in 2s...`);
    setTimeout(init, 2000);
  });

  // A function to restart the WebSocket connection if the connection ever dies
  customWsProvider._websocket.on("close", async (code) => { 
    console.log(
      `Connection lost with code ${code}! Attempting reconnect in 2s...`
    );
    customWsProvider._websocket.terminate();
    setTimeout(init, 2000);
  });
};

init();