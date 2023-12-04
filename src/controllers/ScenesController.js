import { ScenesControllerError } from "../extends/error.js";
import namesRouter from "../namesRouter.js";
import FaqController from "./FaqController.js";
import MenuController from "./MenuController.js";
import StartController from "./StartController.js";
import UserController from "./UserController.js";
import TelegramBot from "node-telegram-bot-api";

class ScenesController {
    startController = StartController.prototype; // TODO remove
    userController = UserController.prototype; // TODO remove
    faqController = FaqController.prototype; // TODO remove
    menuController = MenuController.prototype; // TODO remove
    bot = TelegramBot.prototype; // TODO remove
    
    constructor (startController, userController, faqController, menuController, bot) {
        if (!(startController instanceof StartController)) throw new ScenesControllerError('startController is not an instance StartController');
        if (!(userController instanceof UserController)) throw new ScenesControllerError('userController is not an instance UserController');
        if (!(faqController instanceof FaqController)) throw new ScenesControllerError('faqController is not an instance FaqController');
        if (!(menuController instanceof MenuController)) throw new ScenesControllerError('menuController is not an instance MenuController');
        if (!(bot instanceof TelegramBot)) throw new ScenesControllerError('bot is not an instance TelegramBot');

        this.startController = startController;
        this.userController = userController;
        this.faqController = faqController;
        this.menuController = menuController;
        this.bot = bot;
    }

    async sendScene(data) {
        const {sceneName, messageId, senderName, userId, chatId, oldText, queryId} = data;
        let user = this.userController.getUser(userId);
        if (!user) {
            user = this.userController.createUser(userId);
        }

        const menuScene = this.menuController.getScene(sceneName);
        const faqScene = this.faqController.getScene(sceneName);
        const startScene = this.startController.getScene(sceneName);
        
        if (!menuScene && !faqScene && !startScene) return;
        
        let textScene = 'textScene';
        let inlineKeyboard = [];

        if (startScene) {
            textScene = startScene.getText(this.faqController.getStartLinksText(this.startController.senderName));
            inlineKeyboard = startScene.inlineKeyboard;
        }
        if (menuScene) {
            textScene = menuScene.getText();
            inlineKeyboard = menuScene.inlineKeyboard;
        }
        
        if (faqScene) {
            const sender = senderName === this.menuController.senderName ? senderName : this.faqController.senderName;
            textScene = faqScene.getText(sender);
            inlineKeyboard = faqScene.inlineKeyboard;

            if (user.scene === sceneName) {
                textScene = this.faqController.getFaqText(sender)
            }
            if (senderName === this.menuController.senderName) {
                inlineKeyboard = [
                    [{text: namesRouter.menuBack.textButton, callback_data: namesRouter.menuSupport.name}]
                ]
            }
        }

        if (startScene && sceneName === namesRouter.startCommand.name) {
            return await this.bot.sendPhoto(chatId, namesRouter.startCommand.photoPath, {
                parse_mode: 'HTML',
                disable_notification: true,
                caption: textScene,
                reply_markup: JSON.stringify({
                    inline_keyboard: inlineKeyboard
                })
            })
        }
        if (sceneName.startsWith('/') || senderName === this.startController.senderName) {
            return await this.bot.sendMessage(chatId, textScene, {
                parse_mode: 'HTML',
                disable_web_page_preview: true,
                reply_markup: JSON.stringify({
                    inline_keyboard: inlineKeyboard,
                })
            })
            .then(res => this.userController.updateUser(res.message_id, sceneName, userId))
        }
        return await this.bot.editMessageText(textScene, {
            parse_mode: 'HTML',
            message_id: user.messageId ?? messageId,
            chat_id: chatId,
            disable_web_page_preview: true,
            reply_markup: JSON.stringify({
                inline_keyboard: inlineKeyboard,
            })
        })
        .then(res => this.userController.updateUser(res.message_id, sceneName, userId))
    }
}

export default ScenesController;