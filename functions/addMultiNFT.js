exports = async function ({ body, headers }, response) {
  try {
    const mongodb = context.services.get("mongodb-atlas");
    const collection = mongodb.db("1155").collection("nft");

    // Parse the JSON data from the request body
    const dataArray = JSON.parse(body.text() || "[]");

    // Initialize an array to hold the results
    const results = [];

    for (const data of dataArray) {
      // Check if the token_id already exists in the collection
      const existingDocument = await collection.findOne({
        token_id: data.token_id,
      });
      if (existingDocument) {
        results.push({
          token_id: data.token_id,
          error: "Token ID already exists",
        });
        continue;
      }

      // Validate if required fields are present in the data
      if (
        !data.token_id ||
        !data.name ||
        !data.image ||
        !data.description ||
        !data.amount
      ) {
        results.push({ token_id: data.token_id, error: "Fields do not match" });
        continue;
      }

      // Execute an Insert in MongoDB with the provided data
      const insertResult = await collection.insertOne(data);

      console.log("Document inserted successfully");
      results.push({ token_id: data.token_id, success: true });
    }

    response.setStatusCode(201);
    response.setBody(JSON.stringify(results));
  } catch (err) {
    console.error("Error occurred while executing insert:", err.message);
    response.setStatusCode(500);
    response.setBody(JSON.stringify({ error: err.message }));
  }
};
