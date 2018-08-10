// require('dotenv').config();
var Web3 = require('web3');
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/result', function (req, res) {
    
    let address = req.body.wallet;
    if (address.length <=0)
        return;

    var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/3d5a687f0fb3485ab575d884bbcd2b84'));
    let numberETH  ;
    
	var balance = web3.eth.getBalance(address, function (error, result) {
        if (!error) {       
            numberETH = web3.utils.fromWei(result, 'ether');                       			            
			res.render('result', { Result:  numberETH, Wallet: address });
        } else {
            console.log('Khong lay duoc ETH');
        }
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});





