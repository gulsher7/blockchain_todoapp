// 


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require('express')
const bodyPraser = require('body-parser')
const { Web3 } = require('web3');
const ABI = require('./ABI.json');
const app = express()
const cors = require("cors");
app.use(bodyPraser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
const my_routes = require('./routes');


const web3 = new Web3("https://frequent-dimensional-liquid.ethereum-sepolia.discover.quiknode.pro/3e889b8b0002fb2363dfdb60b0acd504dfa41d33/")
const contractAddress = "0x6f1241eaeebe17069acbecc3c7d169dc2e0e8de5"
const contract = new web3.eth.Contract(ABI, contractAddress)

global.contract = contract;

const port = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.send('Hello....')
});

app.use('/', my_routes)


app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})