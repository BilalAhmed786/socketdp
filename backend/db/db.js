const {connect} = require('mongoose')
require('dotenv').config()

connect(process.env.DB)

.then(()=>{

    console.log('connected')
})
.catch((error)=>{
    
    console.log(error)
})

