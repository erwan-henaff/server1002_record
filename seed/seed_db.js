console.log("I'm in seed");

const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/Users');
const Record = require('../models/Records');
const Order = require('../models/Orders');

(async function(){

    /// connect to database 

    mongoose.connect('mongodb://localhost:27017/server1002', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology:true
    });

    mongoose.connection.on(
        'error',
        console.error.bind(console, "connection error:")
    );

    mongoose.connection.on(
        'open',
        () => {
            console.log("connected to the database ...");
        }
    )
    
    //// deleting database form the start

    try {
        await User.deleteMany({});
        console.log('database user collection deleted!');
    } catch (e) {
        console.log(e);
    }

    /** DELETE ALL ORDERS */
    try {
        await Order.deleteMany({});
        console.log('Orders deleted');
    } catch (e) {
        console.log(e);
    }


    ////// creating the fake users

    console.log("creating 20 fake users");

    const userPromises = Array(20)
        .fill(null)
        .map(() => {
            const user = new User({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                birthday: faker.date.past(),
                userName: faker.internet.userName(),
                address: {
                    city: faker.address.city(),
                    street: faker.address.streetName()
                }
            });
            const token = user.generateAuthToken();
            return user.save();
        });

    Promise.all(userPromises).then(data=> console.log('saved'))

    try {
        await Promise.all(userPromises);
        console.log('Users stored in the database!');
    } catch (e) {
        console.log(e);
    }

        /** CREATE 20 FAKE RECORDS */
    const recordPromises = Array(20)
        .fill(null)
        .map(() => {
            const record = new Record({
            title: faker.random.words(),
            artist: faker.internet.userName(),
            year: new Date(faker.date.past()).getFullYear(),
            price: faker.finance.amount()
            });

            return record.save();
        });

    try {
        await Promise.all(recordPromises);
        console.log('Records stored in the database!');
    } catch (e) {
        console.log(e);
    }

    mongoose.connection.close();

})();
