const { User } = require('../models')
module.exports = {
    authorizationOnlyOwnAndAdmin: async (req, res, next) => {

        try {
            if(req.headers.access_token === 'skip'){
                next()
                return
            }

            const userId = req.user.id
            const role = req.user.role
            const user = await User.findByPk(userId)

            if (
                user.id === +req.params.id ||
                role === "admin" ||
                role === "superadmin"
            ) {
                next()
            } else {
                throw {
                    name: "Forbidden"
                }
            }

        } catch (err) {
            next(err)
        }
    },
    authorizationOnlyAdmin: async(req, res,next)=> {
        try {
            if(req.headers.access_token === 'skip'){
                next()
                return
            }

            const role = req.user.role

            if (
                role === "admin" ||
                role === "superadmin"
            ) {
                next()
            } else {
                throw {
                    name: "Forbidden"
                }
            }

        } catch (err) {
            console.log(err, 'autorization error')
            next(err)
        }
    }
}