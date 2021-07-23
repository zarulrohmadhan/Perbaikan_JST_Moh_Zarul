var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '1801727828:AAHncjz56vZ44m_va6vYGBaefUHLMWBHfP0'
const bot = new TelegramBot(token, {polling: true});


// bots
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `Hallo Moh Zarul Rohmadhan ...\n
        click /predict`
    );   
});

// input i and r
state = 0;
bot.onText(/\/predict/, (msg) => { 
    bot.sendMessage(
        msg.chat.id,
        `Masukan nilai X1|X2|X3|X4 contoh 9|9|9|9`
    );   
    state = 1;
});

bot.on('message', (msg) => { 
    if(state == 1){
        s = msg.text.split("|");
        x1 = s[0]
        x2 = s[1]
        x3 = s[2]
        x4 = s[3]
        model.predict(
            [
                parseFloat(s[0]),
                parseFloat(s[1]),
                parseFloat(s[2]),
                parseFloat(s[3])
            ]
         ).then((jres)=>{
            bot.sendMessage(
                msg.chat.id,
                `Y1 yang diprediksi yaitu : ${jres[0]}`
            );
             bot.sendMessage(
                msg.chat.id,
                `Y2 yang diprediksi yaitu : ${jres[1]}`
            );
             bot.sendMessage(
                msg.chat.id,
                `Y3 yang diprediksi yaitu : ${jres[2]}`
            );
              bot.sendMessage(
                msg.chat.id,
                `Y4 yang diprediksi yaitu : ${jres[3]}`
            );
              bot.sendMessage(
                msg.chat.id,
                `Y5 yang diprediksi yaitu : ${jres[4]}`
            );
              bot.sendMessage(
                msg.chat.id,
                `Y6 yang diprediksi yaitu : ${jres[5]}`
            );
        })
     }else{
         state = 0
     }
})
    
// routers
r.get('/prediction/:x1/:x2/:x3/:4', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.x1), // string to float
            parseFloat(req.params.x2),
            parseFloat(req.params.x3),
            parseFloat(req.params.x4),
        ]
    ).then((jres)=>{
        res.json(jres);
    })
});

module.exports = r;
