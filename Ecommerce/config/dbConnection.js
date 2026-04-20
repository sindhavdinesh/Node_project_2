const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://ds3568065_db_user:Dinesh1234@ac-deyrdkz-shard-00-00.ev8bqv9.mongodb.net:27017,ac-deyrdkz-shard-00-01.ev8bqv9.mongodb.net:27017,ac-deyrdkz-shard-00-02.ev8bqv9.mongodb.net:27017/ecommerceDB?ssl=true&replicaSet=atlas-xxg05p-shard-0&authSource=admin&retryWrites=true&w=majority");
        console.log("DB Connected");
    } catch (err) {
        console.log(err);
    }
};
module.exports = connectDB;