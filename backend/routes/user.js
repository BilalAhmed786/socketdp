const {Router} = require('express')
const User = require('../model/user')


const router = Router()


router.post('/user',async(req,res)=>{
    try{
 
       const {formData:{username ,email,phone}} = req.body

            const user = new User({name:username,email,phone})

            const saveuser = await user.save()
            
            return res.json(saveuser._id)

    }catch(error){

        console.log(error)
    }
})



module.exports =router
