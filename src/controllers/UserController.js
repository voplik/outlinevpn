class UserController {
    users = new Map([[0, {messageId:0, scene: null}]])
    
    createUser(userId, scene = null, messageId = null) {
        return this.users.set(userId, {messageId, scene});
    }
    getUser(userId) {
        return this.users.get(userId);
    }
    updateUser(messageId, sceneName, userId) {
        const user = this.getUser(userId);
        if (user) {
            user.messageId = messageId;
            user.scene = sceneName;
        } else {
            this.createUser(userId, sceneName, messageId)
        }
    }
}

export default UserController;