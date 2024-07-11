# DEX Scraping Agent

The DEX Scraping Agent is a Node.js application that retrieves trading data from the GeckoTerminal API for a given token pair and network..

## How it Works

- **Fetch Supported Networks:** The application first fetches the list of supported networks from the GeckoTerminal API. This is done to ensure that the user-provided network is supported before proceeding with the data retrieval.
- **Express.js Endpoint:** The application sets up an Express.js server with a /trades endpoint. This endpoint accepts three query parameters: inputToken, outputToken, and network. These parameters are used to retrieve the trading data for the specified token pair and network.

- **Validate Input:** The application first checks if the required parameters (inputToken, outputToken, and network) are provided. If any of them are missing, it returns a 400 Bad Request response with an error message.

- **Check Supported Networks:** The application then checks if the provided network is supported by calling the getSupportedNetworks function. If the network is not supported, it returns a 400 Bad Request response with a list of supported networks.

- **Fetch Pool Address:** The findPoolAddress function is called to retrieve the pool address for the given input token, output token, and network. This function makes a request to the GeckoTerminal API to find the matching pool.

- **Retrieve Trading Data:** The getTradingData function is responsible for fetching the trading data for the specified pool address and network. It makes multiple requests to the GeckoTerminal API, paginating the results and accumulating the trades. The function returns up to 1000 trades.

- **Handle Errors:** The application wraps the entire process in a try-catch block to handle any errors that may occur during the data retrieval. If an error occurs, it logs the error and returns a 500 Internal Server Error response with the error message.

- **Start the Server:** Finally, the application starts the Express.js server and listens for requests on the specified port (3000 in this case).


## Getting Started

To run the DEX Scraping Agent, follow these steps:

Clone the repository:

```sh
git clone ... or download from drive

```

Install the dependencies:

```sh
cd dex-scraping-agent
npm install 
```

Run the server:

```sh
npm start 
```



The server will start listening on http://localhost:3000. You can then make requests to the /trades endpoint with the required parameters:
For example: 
- polygon: http://localhost:3000/trades?inputToken=0xeb51d9a39ad5eef215dc0bf39a8821ff804a0f01&outputToken=0x8f3cf7ad23cd3cadbd9735aff958023239c6a063&network=polygon_pos
- eth: http://localhost:3000/trades?inputToken=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&outputToken=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&network=eth

**Netowrk list:**
- Ethereum : eth
- BNB Chain : bsc
- Polygon POS : polygon_pos
- Avalanche : avax
- Moonriver : movr
- Cronos : cro
- Harmony : one
- Boba Network : boba
- Fantom : ftm
- SmartBCH : bch
- Aurora : aurora
- Metis : metis
- Arbitrum : arbitrum
- Fuse : fuse
- OKExChain : okexchain
- Kucoin Community Chain : kcc
- IOTEX : iotx
- CELO : celo
- Gnosis XDAI : xdai
- Huobi ECO Chain : heco
- Moonbeam : glmr
- Optimism : optimism
- Energi : nrg
- Wanchain : wan
- Ronin : ronin
- Kardiachain : kai
- Meter : mtr
- Velas : velas
- Shiden : sdn
- Telos : tlos
- Syscoin : sys
- Oasis Emerald : oasis
- Astar : astr
- Elastos : ela
- Milkomeda Cardano : milkada
- DFK Chain : dfk
- Evmos : evmos
- Solana : solana
- Conflux : cfx
- BitTorrent : bttc
- SX Network : sxn
- XDC : xdc
- Klaytn : klaytn
- Kava : kava
- Bitgert : bitgert
- Tombchain : tombchain
- Dogechain : dogechain
- Findora : findora
- ThunderCore : thundercore
- Arbitrum Nova : arbitrum_nova
- Canto : canto
- Ethereum Classic : ethereum_classic
- Step Network : step-network
- EthereumPOW : ethw
- Godwoken : godwoken
- Songbird : songbird
- Redlight Chain : redlight_chain
- Viction : tomochain
- Function X : fx
- PlatON Network : platon_network
- Exosama : exosama
- Oasys : oasys
- Bitkub Chain : bitkub_chain
- WEMIX : wemix
- Flare : flare
- ONUS : onus
- Aptos : aptos
- Core : core
- Filecoin : filecoin
- ZkSync : zksync
- Loop Network : loop-network
- MultiVAC : multivac
- Polygon zkEVM : polygon-zkevm
- EOS EVM : eos-evm
- Callisto : callisto
- Ultron : ultron
- Sui Network : sui-network
- Pulsechain : pulsechain
- ENULS : enuls
- Tenet : tenet
- Rollux : rollux
- Starknet : starknet-alpha
- Mantle : mantle
- Neon EVM : neon-evm
- Linea : linea
- Base : base
- Bitrock : bitrock
- opBNB : opbnb
- MaxxChain : maxxchain
- Sei Network : sei-network
- Shibarium : shibarium
- Manta Pacific : manta-pacific
- Sepolia Testnet : sepolia-testnet
- Hedera Hashgraph : hedera-hashgraph
- ShimmerEVM : shimmerevm
- Beam : beam
- Scroll : scroll
- LightLink Phoenix : lightlink-phoenix
- Elysium : elysium
- TON : ton


