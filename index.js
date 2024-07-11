let axios = require("axios");
let express = require("express");
let app = express();
let port = 3000;

let BASE_URL = "https://api.geckoterminal.com/api/v2";

// Fetch supported networks
let getSupportedNetworks = async () => {
  let response = await axios.get(`${BASE_URL}/networks?page=1`);
  return response.data.data.map((network) => network.id);
};

// Endpoint to get trading data
app.get("/trades", async (req, res) => {
  let { inputToken, outputToken, network } = req.query;
  if (!inputToken || !outputToken || !network) {
    return res.status(400).json({
      error: "Please provide inputToken, outputToken, and network parameters",
    });
  }

  let supportedNetworks = await getSupportedNetworks();
  if (!supportedNetworks.includes(network)) {
    return res.status(400).json({
      error: `Network '${network}' is not supported. Supported networks are: ${supportedNetworks.join(
        ", "
      )}`,
    });
  }

  try {
    let poolAddresses = await findPoolAddress(
      network,
      inputToken,
      outputToken
    );
     if (poolAddresses.length === 0) {
      poolAddresses = await findPoolAddress(network,outputToken, inputToken);

     }

    if (poolAddresses.length === 0) {
      return res.status(404).json({ error: "Pool not found" });
    }

    let trades = await Promise.all(
      poolAddresses.map((poolAddress) =>
        getTradingData(network, poolAddress.replace(`${network}_`, ""))
      )
    );



  

    let combinedTrades = trades.reduce((acc, curr) => acc.concat(curr), []);

    let sortedTrades = combinedTrades.sort((a, b) => {
      let aTimestamp = new Date(a.attributes.block_timestamp).getTime();
      let bTimestamp = new Date(b.attributes.block_timestamp).getTime();
      return bTimestamp - aTimestamp;
    });
    

    let topThousandTrades = sortedTrades.splice(0, 1000);
    res.json(topThousandTrades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`DEX Scraping Agent listening at http://localhost:${port}`);
});

let getTradingData = async (network, poolAddress) => {
  if (!poolAddress) {
    throw new Error("Pool address not found");
  }

  // Retrieve trades
  let trades = [];
  let page = 1;
  let pageSize = 100;
  let hasMore = true;

  while (hasMore) {
    let url = `${BASE_URL}/networks/${network}/pools/${poolAddress}/trades?page=${page}&limit=${pageSize}`;
    try {
      let response = await axios.get(url, {
        headers: {
          Accept: "application/json",
        },
      });

      trades.push(...response.data.data);

      if (response.data.data.length < pageSize) {
        hasMore = false;
      }

      page++;
    } catch (error) {
      console.error(
        `Error fetching trades for pool ${poolAddress}: ${error.message}`
      );
      hasMore = false;
    }
  }


  return trades;
};

//get pool address
// let findPoolAddress = async (network, inputToken, outputToken) => {
//   let poolAddresses = [];
//   let page = 1;

//   while (page <= 10) {
//     let url = `${BASE_URL}/search/pools?query=${inputToken}&network=${network}&page=${page}`;
//     let response = await axios.get(url, {
//       headers: {
//         Accept: "application/json",
//       },
//     });

//     poolAddresses.push(...response.data.data);

//     page++;
//   }


//   return poolAddresses
//     .filter((pool) => {
//      let baseTokenId = `${network}_${inputToken.toLowerCase()}`;
//      let quoteTokenId = `${network}_${outputToken.toLowerCase()}`;

//       return (
//         pool.relationships.base_token.data.id == baseTokenId &&
//         pool.relationships.quote_token.data.id == quoteTokenId
//       );
//     })
//     .map((pool) => pool.id);
// };

let findPoolAddress = async (network, inputToken, outputToken) => {
  let poolAddresses = [];
  let page = 1;

  while (page <= 10) {
    let url = `${BASE_URL}/search/pools?query=${inputToken}&network=${network}&page=${page}`;
    let response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });

    for (let pool of response.data.data) {
      poolAddresses.push({
        id: pool.id,
        baseTokenId: pool.relationships.base_token.data.id,
        quoteTokenId: pool.relationships.quote_token.data.id,
      });
    }

    page++;
  }

  console.log("all pool addresses", JSON.stringify(poolAddresses));

    return poolAddresses
      .filter((pool) => {
        let baseTokenId = `${network}_${inputToken.toLowerCase()}`;
        let quoteTokenId = `${network}_${outputToken.toLowerCase()}`;

        return (
          pool.baseTokenId === baseTokenId && pool.quoteTokenId === quoteTokenId
        );
      })
      .map((pool) => pool.id);
};
