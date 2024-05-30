exports = async function(arg) {
  const axios = require('axios').default;

  const url = `https://api.telegram.org/bot7237347207:AAGwmBSyDu8Qnmce1taWa2X5jBzoTbNQjrE/sendMessage?chat_id=-1002214009750&text=${encodeURIComponent('MongoDB URL Triggered')}&parse_mode=HTML`;

  const response = await axios.get(url, {
    responseType: 'json',
    headers: {
      "Accept": "application/json",
      "Accept-Encoding": "deflate"
    }
  });
  
  return response.data;
};