exports = async function({ query, headers }, response) {
  try {
    const mongodb = context.services.get("mongodb-atlas");
    const collection = mongodb.db("1155").collection("nft");

    // Extract the token_id from the request parameters
    const token_id = query.tokenid;

   

    if (!token_id) {
      response.setStatusCode(405);
      response.setBody(JSON.stringify("Token ID is Missing"));
      return;
    }

    // Execute a Delete in MongoDB based on the provided token_id
    const deleteResult = await collection.deleteOne({ token_id: token_id });

    // Check if a document was deleted
    if (deleteResult.deletedCount === 1) {
      response.setStatusCode(200);
      response.setBody(JSON.stringify("Document deleted successfully."));
    } else {
      response.setStatusCode(400);
      response.setBody(JSON.stringify("Document not found or could not be deleted."));
    }

  } catch (err) {
    console.log("Error occurred while executing delete:", err.message);
    response.setStatusCode(500);
    response.setBody(JSON.stringify(err.message));
  }
};
