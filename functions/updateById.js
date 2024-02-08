exports = async function({ body}, response) {
  try {
    const mongodb = context.services.get("mongodb-atlas");
    const collection = mongodb.db("1155").collection("nft");

    // Parse the JSON data from the request body
    const data = JSON.parse(body.text() || '{}');

    // Check if the token_id already exists in the collection
    const existingDocument = await collection.findOne({ token_id: data.token_id });
    if (!existingDocument) {
      // If the document does not exist, return an error
      response.setStatusCode(400);
      response.setBody(JSON.stringify({ error: "Token ID does not exist" }));
      return;
    }

    // Validate if required fields are present in the data
    if (!data.token_id || !data.name || !data.image || !data.description || !data.amount) {
      response.setStatusCode(400);
      response.setBody(JSON.stringify({ error: "Fields do not match" }));
      return;
    }

    // Update the existing document based on token_id
    const updateResult = await collection.updateOne(
      { token_id: data.token_id },
      { $set: data }
    );

    if (updateResult.modifiedCount === 1) {
      // Document was successfully updated
      console.log("Document updated successfully");
      response.setStatusCode(200);
      response.setBody(JSON.stringify({ success: true , message: 'Record Updated' }));
    } else {
      // Update did not modify any documents
      response.setStatusCode(500);
      response.setBody(JSON.stringify({ error: "Failed to update document" }));
    }

  } catch (err) {
    console.error("Error occurred while executing update:", err.message);
    response.setStatusCode(500);
    response.setBody(JSON.stringify({ error: err.message }));
  }
};
