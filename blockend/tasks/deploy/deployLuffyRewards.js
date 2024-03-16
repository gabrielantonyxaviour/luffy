const { networks } = require("../../networks");

task("deploy-protocol", "Deploys the LuffyRewards contract")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs) => {
    console.log(`Deploying LuffyRewards contract to ${network.name}`);

    console.log("\n__Compiling Contracts__");
    await run("compile");

    const args = [
      "0x71Ef7f9Ac3a17852de46d8e34A686B055946E9D5",
      "CHILIZ",
      "0x0000000000000000000000000000000000000000",
    ];

    const protocolContractFactory = await ethers.getContractFactory(
      "LuffyRewards"
    );
    const protocolContract = await protocolContractFactory.deploy(...args);

    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        protocolContract.deployTransaction.hash
      } to be confirmed...`
    );

    await protocolContract.deployTransaction.wait(
      networks[network.name].confirmations
    );

    console.log(
      "\nDeployed LuffyRewards contract to:",
      protocolContract.address
    );

    if (network.name === "localFunctionsTestnet") {
      return;
    }

    const verifyContract = taskArgs.verify;
    if (
      network.name !== "localFunctionsTestnet" &&
      verifyContract &&
      !!networks[network.name].verifyApiKey &&
      networks[network.name].verifyApiKey !== "UNSET"
    ) {
      try {
        console.log("\nVerifying contract...");
        await run("verify:verify", {
          address: protocolContract.address,
          constructorArguments: args,
        });
        console.log("Contract verified");
      } catch (error) {
        if (!error.message.includes("Already Verified")) {
          console.log(
            "Error verifying contract.  Ensure you are waiting for enough confirmation blocks, delete the build folder and try again."
          );
          console.log(error);
        } else {
          console.log("Contract already verified");
        }
      }
    } else if (verifyContract && network.name !== "localFunctionsTestnet") {
      console.log(
        "\nPOLYGONSCAN_API_KEY, ETHERSCAN_API_KEY or FUJI_SNOWTRACE_API_KEY is missing. Skipping contract verification..."
      );
    }

    console.log(
      `\n LuffyRewards contract deployed to ${protocolContract.address} on ${network.name}`
    );
  });
