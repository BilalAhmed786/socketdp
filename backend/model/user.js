const {Schema,model} = require('mongoose')


const schema =Schema({

    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true}

})

const User = model('user',schema)

module.exports = User