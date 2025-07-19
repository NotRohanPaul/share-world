/* 
  This script is used to run to download mongodb binary before running the tests that requries monogdb-memory-server
*/

import { MongoMemoryServer } from "mongodb-memory-server";

MongoMemoryServer.create({ binary: { version: "8.0.4" } })
  .then(server => {
    console.log("MongoDB downloaded to: ", server.instanceInfo);
    process.exit(0);
  })
  .catch(err => {
    console.error("Failed: ", err);
    process.exit(1);
  });
