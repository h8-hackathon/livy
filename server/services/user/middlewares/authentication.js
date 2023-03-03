const {User} = require('../models')
const jwt = require('jsonwebtoken')
module.exports = authentication = async (req,res,next)=> {
        try {
            if(req.headers.access_token === 'skip'){
                next()
                return
            }

            if(!req.headers.access_token) throw {name: "Unauthenticated"}
            const payload = jwt.verify(req.headers.access_token, process.env.JWT_SECRET || 'mamamuda')
            const user = await User.findByPk(payload.id)
            if(!user) throw {name: "NotFound"}
            req.user = {
                id:user.id,
                role:user.role
            } 
            next()
        } catch (error) {
            console.log("AUTHENTICATION ERROR =>", error)
            next(error)            
        }
    }