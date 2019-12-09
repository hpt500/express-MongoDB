module.exports = {
    // 用户
    user: {
        name: { type: String, required: true },
        password: { type: String, required: true }
    },
    // 书籍
    note: {
        title: { type: String, required: true },
        content: { type: String, required: true },
    }
};