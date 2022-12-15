import mongoose from 'mongoose';

const url = process.env.DATABASE;

const database = {
    connect : async function() {
        try{
            mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                //useFindAndModify: false,
            })

            console.log("Database connection successful")

        }catch(err){

            console.error(err)
            process.exit(1)
        }
    },

    createUser: function(mod, doc, call) {
        mod.create(doc, function(err, result) {
            if(err){
                console.log(err);
                return call(false);
            }
            else{
                console.log('New user created' + result);
                return call(true);
            }
        });
    },

    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error){
                return callback(false);
            } 
            else{
                return callback(result);
            }
            
        });
    },

    updateOne: function(model, filter, update, callback) {
        model.updateOne(filter, update, function(error, result) {
            if(error){
                return callback(false);
            } 
            else{
                console.log('Information changed: ' + result.nModified);
                return callback(true);
            }
            
        });
    }
}

export default database;