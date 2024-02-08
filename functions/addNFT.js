exports = async function({ body,headers }, response) {
  try {
    const mongodb = context.services.get("mongodb-atlas");
    const collection = mongodb.db("1155").collection("nft");
    
  

    // Parse the JSON data from the request body
    const data = JSON.parse(body.text() || '{}');

    // Check if the token_id already exists in the collection
    const existingDocument = await collection.findOne({ token_id: data.token_id });
    if (existingDocument) {
      response.setStatusCode(400);
      response.setBody(JSON.stringify({ error: "Token ID already exists" }));
      return;
    }

    // Validate if required fields are present in the data
    if (!data.token_id || !data.name || !data.image || !data.description || !data.amount) {
      response.setStatusCode(400);
      response.setBody(JSON.stringify({ error: "Fields do not match" }));
      return;
    }

    // Execute an Insert in MongoDB with the provided data
    const insertResult = await collection.insertOne(data);

    console.log("Document inserted successfully");
    response.setStatusCode(201);
    response.setBody(JSON.stringify({ success: true }));
  } catch (err) {
    console.error("Error occurred while executing insert:", err.message);
    response.setStatusCode(500);
    response.setBody(JSON.stringify({ error: err.message }));
  }
};
