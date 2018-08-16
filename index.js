var request = require("request");
const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome! Type /pnr/<PNR NO.> to check PNR Status. Eg. /pnr/1234567890'))

bot.hears(/pnr/i, (ctx) => {
    var input_pnr = ctx.match.input;
    var parts = input_pnr.split('/');
    var pnr_no = parts[parts.length - 1];
    request.get({
        "url": "https://api.railwayapi.com/v2/pnr-status/pnr/"+pnr_no+"/apikey/noccuw1hzo/",
    }, (error, response, body) => {
        if (error) {
            return console.log(error);
        }
        var objRes = JSON.parse(body);
        if(objRes.passengers.length!=0) {
            var current_status = objRes.passengers[0].current_status;
            ctx.reply(current_status);
        }
        
        else
            ctx.reply('Invalid PNR');
            
    })
});


bot.startPolling()
