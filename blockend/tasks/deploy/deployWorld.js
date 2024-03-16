const { networks } = require("../../networks");

task("deploy-world", "Deploys the WorldcoinVerifier contract")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs) => {
    console.log(`Deploying WorldcoinVerifier contract to ${network.name}`);

    console.log("\n__Compiling Contracts__");
    await run("compile");

    const args = [
      "0x42FF98C4E85212a5D31358ACbFe76a621b50fC02",
      "app_staging_869452b514c58770aaa9dcb5dacfafac",
      "luffy",
    ];

    const worldContractFactory = await ethers.getContractFactory(
      "WorldcoinVerifier"
    );
    const worldContract = await worldContractFactory.deploy(...args);

    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        worldContract.deployTransaction.hash
      } to be confirmed...`
    );

    await worldContract.deployTransaction.wait(
      networks[network.name].confirmations
    );

    console.log(
      "\nDeployed WorldcoinVerifier contract to:",
      worldContract.address
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
          address: worldContract.address,
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
      `\n WorldcoinVerifier contract deployed to ${worldContract.address} on ${network.name}`
    );
  });
