import namesRouter from "../namesRouter.js";

class StartController {
    senderName = 'start'

    constructor() {
        const controller = this;

        this.scenes = {
            start: {
                getText(faqLinks) {
                    return [
                        '<b>Hare VPN 🐰</b> - Анонимный и быстрый VPN свободный доступ в интернет на всех ваших устройствах: будь то iOS, Android, Mac, Windows или TV.\n',
                        '<blockquote><b>Легкое подключение в три шага:</b>\n├ Получить ключь активации\n├ Скачать приложение\n└ Вставить ключ активации</blockquote>\n',
                        faqLinks,
                    ].join('\n');
                },
                inlineKeyboard: [
                    [{text: namesRouter.trialKey.textButton, callback_data: `${namesRouter.trialKey.name}_${this.senderName}`}],
                    [{text: namesRouter.menuPay.textButton, callback_data: `${namesRouter.payCommand.name}_${this.senderName}`}]
                ]
            },
            trialKey: {
                getText() {
                    return '🍭 Пробный ключь';
                },
                inlineKeyboard: []
            }
        }
        this.routers = new Map([
            [namesRouter.startCommand.name, this.scenes.start],
            [namesRouter.trialKey.name, this.scenes.trialKey]
        ])
    }

    getScene(name) {
        return this.routers.get(name);
    }
}

export default StartController;