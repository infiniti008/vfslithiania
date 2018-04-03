const TelegramBot = require('node-telegram-bot-api');
const stat = require('./status.js');

const TOKEN = process.env.TELEGRAM_TOKEN || '268377689:AAEehpljdqiY6qITewLNPUkbe60Kbszl95w';

var bot;
var server;
if (process.env.PORT) {
    console.log('Webhook');
    server = 'Heroku';
    const options = {
        webHook: {
            port: process.env.PORT
        }
    };
    const url = process.env.APP_URL || 'https://vfscheck.herokuapp.com:443';
    bot = new TelegramBot(TOKEN, options);
    bot.setWebHook(`${url}/bot${TOKEN}`);
    console.log('URL', url);
    // console.log(bot.getWebHookInfo());
} else {
    console.log('Polling');
    server = 'Localhost';
    bot = new TelegramBot(TOKEN, { polling: true });
    console.log('We start telegramm bot!');
}


console.log('Server started on ' + server);

bot.onText(/\/Olya/, (msg, match) => {

    const OLYA = {
        date : '11/03/1996',
        pasport : 'KB1822883'
    }

    const chatId = msg.chat.id;

    stat.status(OLYA)
        .then(status => {
            bot.sendMessage(msg.chat.id, `Ольга, статус вашей заявки:\n${status}`);
        })
        .catch(() => {
            bot.sendMessage(msg.chat.id, 'Я не смог получить информацию :( Попробуйте позже');
        })
});

bot.onText(/\/Slava/, (msg, match) => {

    const SLAVA = {
        date : '19/11/1990',
        pasport : 'MP3756412'
    }

    const chatId = msg.chat.id;

    stat.status(SLAVA)
        .then(status => {
            bot.sendMessage(msg.chat.id, `Слава, статус вашей заявки:\n${status}`);
        })
        .catch(() => {
            bot.sendMessage(msg.chat.id, 'Я не смог получить информацию :( Попробуйте позже');
        })
});

bot.on('message', (msg) => {

    const chatId = msg.chat.id;
    if (msg.entities) {
        const keyboard = {
            parse_mode: "Markdown",
            reply_markup: {
                keyboard: [
                    ["/Olya", "/Slava"]
                ],
                resize_keyboard: true,
                one_time_keyboard: false,
            },
        };
        bot.sendMessage(msg.chat.id, `You send bot command!`, keyboard);
    } else {
        bot.sendMessage(msg.chat.id, `I am alive on ${server}!`);
    }
});