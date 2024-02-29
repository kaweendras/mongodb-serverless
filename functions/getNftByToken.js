exports = async function ({ query }) {
  try {
    const mongodb = context.services.get("mongodb-atlas");
    const collection = mongodb.db("1155").collection("nft");

    // Extract the token_id from the request parameters
    const token_id = query.tokenid || context.request.pathParams.token;

    // Check if token_id is provided
    if (!token_id) {
      return { error: "Token ID is missing in the request parameters." };
    }

    // Execute a Find in MongoDB based on the provided token_id
    const findResult = await collection
      .find({ token_id: token_id })
      .limit(100)
      .toArray();

    return { result: findResult };
  } catch (err) {
    console.log("Error occurred while executing find:", err.message);
    return { error: err.message };
  }
};
