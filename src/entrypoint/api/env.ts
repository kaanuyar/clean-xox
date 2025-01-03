export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/clean-xox',
    port: process.env.PORT || 5050,
    jwtSecret: process.env.JWT_SECRET || 'baya_secret',
}