exports = async function(arg) {
try {
const mongodb = context.services.get("mongodb-atlas");
const collection = mongodb.db("1155").collection("nft");
  const axios = require('axios').default;
  

// Execute a Find in MongoDB to retrieve the first 100 documents
const findResult = await collection.find({}).limit(100).toArray();

const txt = `<b>MongoDB Serverless Function</b> 🚀\n
    <code>${JSON.stringify(findResult).slice(0, 200)}</code>\n▶️Project - <a href="https://github.com/kaweendras/mongodb-serverless">MongoDB - Serverless</a>◀️`;
const msg =encodeURIComponent(txt);
  const url = `https://api.telegram.org/bot7237347207:AAGwmBSyDu8Qnmce1taWa2X5jBzoTbNQjrE/sendMessage?chat_id=-1002214009750&text=${msg}&parse_mode=HTML`;

  const response = await axios.get(url, {
    responseType: 'json',
    headers: {
      "Accept": "application/json",
      "Accept-Encoding": "deflate"
    }
  });

return { result: findResult };
} catch (err) {
console.log("Error occurred while executing find:", err.message);
return { error: err.message };
}
};
