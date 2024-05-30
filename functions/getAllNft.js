exports = async function(arg) {
try {
const mongodb = context.services.get("mongodb-atlas");
const collection = mongodb.db("1155").collection("nft");
  


// Execute a Find in MongoDB to retrieve the first 100 documents
const findResult = await collection.find({}).limit(100).toArray();

   const resultString = JSON.stringify(findResult).slice(0, 200);
  const msg = `All NFTs Were fetched - ${resultString}`;
  
const url = `https://api.telegram.org/bot7237347207:AAGwmBSyDu8Qnmce1taWa2X5jBzoTbNQjrE/sendMessage?chat_id=-1002214009750&text=${message}&parse_mode=HTML`;
const response = await fetch(url);

return { result: findResult };
} catch (err) {
console.log("Error occurred while executing find:", err.message);
return { error: err.message };
}
};
