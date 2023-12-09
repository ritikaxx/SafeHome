const axios = require("axios");
require("dotenv").config();

const Auth = Buffer.from(
  `2IPPVuke31XAPCzPFXPdspGtmWn` + ":" + `5d02036e41019a5f2a8417f03a34e3dd`,
).toString("base64");

// The chain ID of the supported network
const chainId = 1;

(async () => {
  try {
    const { data } = await axios.get(
      `https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`,
      {
        headers: {
          Authorization: `Basic ${Auth}`,
        },
      },
    );
    console.log("Suggested gas fees:", data);
  } catch (error) {
    console.log("Server responded with:", error);
  }
})();