const { networks } = require("../../networks");

task("deploy-world", "Deploys the WorldcoinVerifierTesting contract")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs) => {
    console.log(
      `Deploying WorldcoinVerifierTesting contract to ${network.name}`
    );

    console.log("\n__Compiling Contracts__");
    await run("compile");

    const args = [
      "0x469449f251692e0779667583026b5a1e99512157",
      "app_staging_869452b514c58770aaa9dcb5dacfafac",
      "luffy",
    ];

    const worldContractFactory = await ethers.getContractFactory(
      "WorldcoinVerifierTesting"
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
      "\nDeployed WorldcoinVerifierTesting contract to:",
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
      `\n WorldcoinVerifierTesting contract deployed to ${worldContract.address} on ${network.name}`
    );
  });
