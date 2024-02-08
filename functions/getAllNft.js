exports = async function(arg) {
try {
const mongodb = context.services.get("mongodb-atlas");
const collection = mongodb.db("1155").collection("nft");

// Execute a Find in MongoDB to retrieve the first 100 documents
const findResult = await collection.find({}).limit(100).toArray();

return { result: findResult };
} catch (err) {
console.log("Error occurred while executing find:", err.message);
return { error: err.message };
}
};
