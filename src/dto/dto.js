export function textDto(data) {
    const {message_id: messageId, from, chat, text} = data;
    const {id: userId, is_bot: isBot} = from;
    const {id: chatId} = chat;

    const [command, arg] = text.split(' ');
    const sceneName = arg?.split('_')[0];
    const senderName = arg?.split('_')[1];

    return {
        isBot,
        chatId,
        userId,
        messageId, 
        sceneName: sceneName ?? command,
        senderName,
        text,
    }
}
export function callbackQueryDto(data) {
    const {id: queryId, from, message, data: queryData} = data;
    const {chat, message_id: messageId, text: oldText} = message;
    const {id: chatId} = chat;
    const {id: userId, is_bot: isBot} = from;

    const sceneName = queryData.split('_')[0];
    const senderName = queryData.split('_')[1];

    return {
        isBot,
        chatId, 
        userId, 
        messageId, 
        sceneName,
        senderName,
        queryId, 
        oldText
    }
}