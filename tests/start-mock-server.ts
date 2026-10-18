import { AwsMockServer } from "./aws-mock-server";

const mockServer = new AwsMockServer(3099);

async function main() {
  await mockServer.start();
  console.log("Mock AWS server running on http://localhost:3099");

  // Keep the process running
  process.on("SIGINT", async () => {
    await mockServer.stop();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await mockServer.stop();
    process.exit(0);
  });
}

main().catch(console.error);
