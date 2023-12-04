import namesRouter from "../namesRouter.js";

class MenuController {
    senderName = 'menu'
    constructor() {
        this.scenes = {
            menu: {
                getText() {
                    return [
                        'HareVPN - ваш ключь к свободе в мире интернета\n',
                        '<b>Выберите нужное действие: </b>'
                    ].join('\n');
                },
                inlineKeyboard: [
                    [{text: namesRouter.menuPay.textButton, callback_data: namesRouter.menuPay.name}],
                    [
                        {text: namesRouter.menuAccount.textButton, callback_data: namesRouter.menuAccount.name}, 
                        {text: namesRouter.menuSupport.textButton, callback_data: namesRouter.menuSupport.name}
                    ],
                    [
                        {text: namesRouter.menuPartners.textButton, callback_data: namesRouter.menuPartners.name}, 
                        {text: namesRouter.menuFriends.textButton, callback_data: namesRouter.menuFriends.name}
                    ]
                ]
            },
            pay: {
                getText() {
                    return '💎 Купить ключь';
                },
                inlineKeyboard: [
                    [{text: namesRouter.menuBack.textButton, callback_data: namesRouter.menuBack.name}]
                ]
            },
            account: {
                getText() {
                    return '⚙️ Мой аккаунт';
                },
                inlineKeyboard: [
                    [{text: namesRouter.menuBack.textButton, callback_data: namesRouter.menuBack.name}]
                ]
            },
            support: {
                getText() {
                    return [
                        '<b>Обращаем ваше внимание</b>, что наша команда поддержки состоит из квалифицированных экспертов, готовых оказать вам помощь. Мы приложим все усилия для оперативного решения вашего вопроса, хотя иногда это может потребовать некоторого времени.\n',
                        '<blockquote>🕛 Круглосуточно: <code>среднее время овтета 4-8 минут</code></blockquote>\n',
                        '<b>Хотите связаться с нашей службой поддержки?</b>'
                    ].join('\n');
                },
                inlineKeyboard: [
                    [{text: namesRouter.faq.textButton, callback_data: `${namesRouter.faq.name}_${this.senderName}`}],
                    [{text: namesRouter.faqVpnConnect.textButton, callback_data: `${namesRouter.faqVpnConnect.name}_${this.senderName}`}],
                    [
                        {text: namesRouter.menuBack.textButton, callback_data: namesRouter.menuBack.name}, 
                        {text: '✅ Да', callback_data: '0'}
                    ]
                ]
            },
            friends: {
                getText() {
                    return '🎁 VPN Другу';
                },
                inlineKeyboard: [
                    [{text: namesRouter.menuBack.textButton, callback_data: namesRouter.menuBack.name}]
                ]
            },
            key: {
                getText() {
                    return 'Ключи';
                },
                inlineKeyboard: [
                    [{text: namesRouter.menuBack.textButton, callback_data: namesRouter.menuBack.name}]
                ]
            },
            partners: {
                getText() {
                    return '🤝 Партнерам';
                },
                inlineKeyboard: [
                    [{text: namesRouter.menuBack.textButton, callback_data: namesRouter.menuBack.name}]
                ]
            }
        }
        this.routers = new Map([
            [namesRouter.keyCommand.name, this.scenes.key],
            [namesRouter.payCommand.name, this.scenes.pay],
            [namesRouter.menuCommand.name, this.scenes.menu],
            [namesRouter.accountCommand.name, this.scenes.account],
            [namesRouter.friendsCommand.name, this.scenes.friends],
            [namesRouter.supportCommand.name, this.scenes.support],
            [namesRouter.menu.name, this.scenes.menu],
            [namesRouter.menuPay.name, this.scenes.pay],
            [namesRouter.menuAccount.name, this.scenes.account],
            [namesRouter.menuFriends.name, this.scenes.friends],
            [namesRouter.menuSupport.name, this.scenes.support],
            [namesRouter.menuPartners.name, this.scenes.partners],
            [namesRouter.menuBack.name, this.scenes.menu]
        ])
    }

    getScene(name) {
        return this.routers.get(name);
    }
}

export default MenuController;