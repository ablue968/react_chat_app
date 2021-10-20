const {connect} = require('getstream');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const streamChat = require('stream-chat');

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req,res) =>{
  try{
    const { fullName, username, password, phoneNumber } = req.body;
    const userID = crypto.randomBytes(16).toString('hex');
    const serverClient = connect(api_key, api_secret, app_id);

    const hashedPass = await bcrypt.hash(password, 10)
    const token = serverClient.createUserToken(userID);

    res.status(200).json({ token, fullName, username, userID, hashedPass, phoneNumber });

  }catch(err){
    console.log(err.message);
    res.status(500).json({ message: error });
  }  
};
const login = async (req,res) =>{
    try{
        const { username, password } = req.body;
        const serverClient = connect(api_key, api_secret, app_id);
        const client = streamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ name: username });

        if(!users.length) return res.status(400).json({ message: 'User not found' });

        const success = await bcrypt.compare(password, users[0].hashedPass);
        const token = serverClient.createUserToken(users[0].id);

        if(success) res.status(200).json({ token, fullName: users[0].fullName, username, userID: users[0].id });
        if(!success) res.status(500).json({ message: "Wrong credentials, check them again" });
    
    }catch(err){
      console.log(err.message);
      res.status(500).json({ message: error });
    }
};

module.exports = {signup, login}