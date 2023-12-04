import namesRouter from "../namesRouter.js";

class FaqController {
    senderName = 'faq'

    constructor(botName) {
        this.botName = botName;

        const controller = this;
        this.scenes = {
            faq: {
                getText(senderName) {return controller.getFaqText(senderName)},
                inlineKeyboard: [],
            },
            vpnPay: {
                getText(senderName) {return controller.getVpnPayText(senderName)},
                inlineKeyboard: [],
            },
            vpnWhate: {
                getText(senderName) {return controller.getVpnWhateText(senderName)},
                inlineKeyboard: [],
            },
            vpnConnect: {
                getText(senderName) {return controller.getVpnConnectText(senderName)},
                inlineKeyboard: [],
            },
            vpnLegal: {
                getText(senderName) {return controller.getVpnLegalText(senderName)},
                inlineKeyboard: [],
            },
            vpnUsing: {
                getText(senderName) {return controller.getVpnUsingText(senderName)},
                inlineKeyboard: [],
            },
            whatSs: {
                getText(senderName) {return controller.getWhatSsText(senderName)},
                inlineKeyboard: [],
            },
            whyOutline: {
                getText(senderName) {return controller.getWhyOutlineText(senderName)},
                inlineKeyboard: [],
            },
        }
        this.routers = new Map([
            [namesRouter.faqCommand.name, this.scenes.faq],
            [namesRouter.faq.name, this.scenes.faq],
            [namesRouter.faqVpnPay.name, this.scenes.vpnPay],
            [namesRouter.faqVpnWhate.name, this.scenes.vpnWhate],
            [namesRouter.faqVpnConnect.name, this.scenes.vpnConnect],
            [namesRouter.faqVpnLegal.name, this.scenes.vpnLegal],
            [namesRouter.faqVpnUsing.name, this.scenes.vpnUsing],
            [namesRouter.faqWhatSs.name, this.scenes.whatSs],
            [namesRouter.faqWhyOutline.name, this.scenes.whyOutline],
        ])
        
    }
    getScene(name) {
        return this.routers.get(name);
    }
    createLink(dataStart, description) {
        return ` <a href="https://t.me/${this.botName}?start=${dataStart}">${description}</a> `
    }
    getStartLinksText(senderName = '', seporator = '•') {
        const texts = this.getLinks(senderName).splice(0, 4);
        texts.push(this.createLink(`${namesRouter.faq.name}_${senderName}`, 'More'))
        return texts.join(seporator);
    }
    getLinks(senderName = this.senderName) {
        return [
            this.createLink(`${namesRouter.faqVpnPay.name}_${senderName}`, namesRouter.faqVpnPay.description),
            this.createLink(`${namesRouter.faqVpnWhate.name}_${senderName}`, namesRouter.faqVpnWhate.description),
            this.createLink(`${namesRouter.faqVpnConnect.name}_${senderName}`, namesRouter.faqVpnConnect.description),
            this.createLink(`${namesRouter.faqVpnLegal.name}_${senderName}`, namesRouter.faqVpnLegal.description),
            this.createLink(`${namesRouter.faqVpnUsing.name}_${senderName}`, namesRouter.faqVpnUsing.description),
            this.createLink(`${namesRouter.faqWhatSs.name}_${senderName}`, namesRouter.faqWhatSs.description),
            this.createLink(`${namesRouter.faqWhyOutline.name}_${senderName}`, namesRouter.faqWhyOutline.description),
        ];
    }
    getFaqText(senderName = this.senderName, join = true) {
        let text = ['<b>Часто задаваемые вопросы:</b>\n']
        this.getLinks(senderName).forEach(link => text.push(`<blockquote>• <b>${link}</b> </blockquote>`));
        
        if (join) { 
            text = text.join('\n'); 
        }
        
        return text;
    }
    getVpnPayText(senderName = this.senderName) {
        const text = [
            'Бесплатному VPN сложно соответствовать возможностям и услугам качественного платного провайдера. При использовании бесплатных VPN вы с большей вероятностью столкнетесь с медленными соединениями, увязшими в потоке пользователей в неоптимальных сетях, отсутствием поддержки клиентов, слабой безопасностью и небольшим количеством расположений VPN-серверов на выбор.\n',
            'Являясь платным провайдером, HareVPN предоставляет подключения, оптимизированные по скорости, безопасности и стабильности. Кроме того, вы можете обращаться в нашу службу поддержки с любыми вопросами в любое время суток.\n'
        ].join('\n');

        const arrText = this.getFaqText(senderName, false);
        arrText.splice(2, 0, text);
        return arrText.join('\n');
    }
    getVpnWhateText(senderName = this.senderName) {
        const text = [
            'VPN, или виртуальная частная сеть, - это инструмент, который создаёт безопасное, зашифрованное подключение в интернете. Он как бы строит "туннель" между вашим устройством и интернет-сервисами, скрывая ваш реальный IP-адрес и защищая ваши данные от посторонних глаз. Это особенно полезно, когда вы используете общедоступные Wi-Fi сети. Также VPN позволяет обойти географические блокировки и открыть доступ  к контенту и веб-сайтам, которые могут быть недоступны в вашем регионе.\n'
        ].join('\n');
        const arrText = this.getFaqText(senderName, false);
        arrText.splice(3, 0, text);
        return arrText.join('\n');
    }
    getVpnConnectText(senderName = this.senderName) {
        const text = [
            'Чтобы подключиться к HareVPN, сначала получите ключ SS в боте для активации VPN, который выдается при регистрации в HareVPN. Затем скачайте приложение Outline на ваше устройство, будь то iOS, Android, Mac или Windows. После установки откройте приложение и нажмите на значок плюсика (+), чтобы добавить полученный в HareVPN ключ SS. Далее, разрешите приложению Outline вносить изменения в ваш телефон или компьютер для активации VPN. Наконец, нажмите на кнопку "подключиться" в приложении Outline, чтобы активировать VPN-соединение.\n'
        ].join('\n');
        const arrText = this.getFaqText(senderName, false);
        arrText.splice(4, 0, text);
        return arrText.join('\n');
    }
    getVpnLegalText(senderName = this.senderName) {
        const text = [
            'VPN сети - это законные инструменты. Они используются людьми и компаниями во всем мире для защиты личных данных в интернете. Они также помогают получить доступ к различным сервисам в странах, где существуют строгие интернет-ограничения. Некоторые правительства не очень поддерживают VPN, но часто без возражений позволяют их использовать чиновникам, учебным заведениям и компаниям. Это считается необходимым для поддержания конкурентоспособности. Запрещать все VPN сети - невыгодно для стран.\n',
            'Однако, использование VPN не делает незаконную деятельность в интернете законной.\n'
        ].join('\n');

        const arrText = this.getFaqText(senderName, false);
        arrText.splice(5, 0, text);
        return arrText.join('\n');
    }
    getVpnUsingText(senderName = this.senderName) {
        const text = [
            'Мы советуем использовать HareVPN каждый раз, когда вы пользуетесь интернетом. Лучше всего всегда оставлять его включенным. Если HareVPN будет работать в фоне, вы можете не беспокоиться о своей конфиденциальности - она будет надежно защищена.\n'
        ].join('\n');

        const arrText = this.getFaqText(senderName, false);
        arrText.splice(6, 0, text);
        return arrText.join('\n');
    }
    getWhatSsText(senderName = this.senderName) {
        const text = [
            'Ключ SS - это специальный код, который нужен для подключения к VPN-сервису через технологию Shadowsocks. Этот ключ содержит всю информацию, необходимую для безопасного соединения с VPN-сервером, включая адрес сервера, порт, метод шифрования и пароль. Подключившись с помощью ключа SS, пользователь может безопасно и анонимно пользоваться интернетом.\n'
        ].join('\n');

        const arrText = this.getFaqText(senderName, false);
        arrText.splice(7, 0, text);
        return arrText.join('\n');
    }
    getWhyOutlineText(senderName = this.senderName) {
        const text = [
            'Outline - это приложение, которое помогает активировать и использовать VPN-сервисы, такие как HareVPN. Когда вы регистрируетесь в HareVPN, вы получаете уникальный ключ SS (Shadowsocks). Этот ключ необходим для подключения к VPN-серверу. Чтобы использовать этот ключ и активировать VPN на вашем устройстве, вам нужно скачать и установить приложение Outline.\n',
            'После установки Outline вы вводите в него полученный от HareVPN ключ SS. Это позволяет приложению настроить безопасное VPN-соединение с сервером HareVPN. Благодаря этому вы получаете зашифрованное соединение для безопасного и конфиденциального доступа в интернет.\n',
            'Таким образом, Outline действует как посредник между вами и HareVPN, облегчая процесс активации и использования VPN-сервиса на вашем устройстве.\n',
        ].join('\n');

        const arrText = this.getFaqText(senderName, false);
        arrText.splice(8, 0, text);
        return arrText.join('\n');
    }
}

export default FaqController;