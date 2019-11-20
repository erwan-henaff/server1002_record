console.log("I'm in seed");

const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/Users');

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
        await User.deleteMany(){
        console.log('database deleted!');
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
                userName: faker.internet.userName()

            });
            return user.save();
        });

    Promise.all(userPromises).then(data=> console.log('saved'))

    try {
        await Promise.all(userPromises);
        console.log('Users stored in the database!');
    } catch (e) {
        console.log(e);
    }

    mongoose.connection.close();

})();
