import { OutlineVPN } from 'outlinevpn-api';
import TelegramBot from 'node-telegram-bot-api';

import FaqController from './src/controllers/FaqController.js';
import ScenesController from './src/controllers/ScenesController.js';
import UserController from './src/controllers/UserController.js';
import MenuController from './src/controllers/MenuController.js';
import StartController from './src/controllers/StartController.js';
import 'dotenv/config.js';
import namesRouter from './src/namesRouter.js';
import { callbackQueryDto, textDto } from './src/dto/dto.js';

process.env.NTBA_FIX_350 = true;
console.log(process.env.API_URL)
const confVpn = {apiUrl:process.env.API_URL, fingerprint: process.env.FINGERPRINT};
const token = process.env.TOKEN;
const botName = 'harevpnbot';

const outlinevpn = new OutlineVPN(confVpn);
const bot = new TelegramBot(token, {polling: true});
const startController = new StartController();
const faqController = new FaqController(botName);
const userController = new UserController();
const menuController = new MenuController();
const scenesController = new ScenesController(startController, userController, faqController,menuController, bot);


bot.setMyCommands(Object.keys(namesRouter).filter(key => {
    const router = namesRouter[key];

    return router.name.startsWith('/') && router.isActiv;
}).map(key => {
    const router = namesRouter[key];
    return {
        command: router.name,
        description: router.description
    }
}))

bot.on('text', async (data) => {
    const dto = textDto(data)
    if(dto.isBot) return;
    await scenesController.sendScene(dto)
    .catch(e => {
        console.log(e)
    })
})

bot.on('callback_query', async (data) => {
    const dto = callbackQueryDto(data);
    if(dto.isBot) return;

    await scenesController.sendScene(dto)
    .catch(e => {
        console.log(e)
    })
})