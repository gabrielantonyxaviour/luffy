const { networks } = require("../networks");
task(
  "verify-world",
  "Mints an edition of the Zora NFT to the minter"
).setAction(async (taskArgs, hre) => {
  try {
    const functionHash = ethers.utils
      .id("verifyAndExecute(address,uint256,uint256,uint256[8])")
      .slice(0, 10);
    console.log(functionHash);

    const encodedData = ethers.utils.defaultAbiCoder
      .encode(
        ["address", "uint256", "uint256", "uint256[8]"],
        [
          "0xfc2Ebe599d02B24F47Ff0aad0167E362c3B3F575",
          "0x1e28120c18d4a1025fbcbc2401462cfce8406fc87b7c8a0468c474649687df70",
          "0x001a13ab80c7b748521121f65a740fe1bb8e1628155a7f4a918df05dbee5de78",
          [
            "0x1e864107e6ed4d13ee86db47020c208e0a3b81dbc283ab725312fd63a8997662",
            "0x28e394ff1a3c5ee825c7d67750980317f5453fd01d0747d9e1533ab122ae3b01",
            "0x2f9462db088c3f88f1663b6b8c95adffb27c2315100c9a71a2d524daa6c7b3cc",
            "0x7a03653b334055b933e26015cff64bbfde525a91a97b6f2dadc3bf93eed41a8",
            "0x236ee9374965237a392dd8ca91cc1bee28650256af6154d847bbfa7726a2b55e",
            "0x1f1c5357cef7f7e1ffe79ba101099458ebb63399c0a00890edc885740515eee7",
            "0x34fe5bc238140608842b455ff20d9579fe5b2925ebab2e5af510cb5fc15ca0e",
            "0x16e39995dccec42de5abaaa87f50a1678802158822b889d0a336429fb3f265d6",
          ],
        ]
      )
      .slice(2);

    const data = functionHash + encodedData;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
