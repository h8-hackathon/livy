const { Op } = require('sequelize')
const { User, CounselorSubmission } = require('../models')
const jwt = require('jsonwebtoken')
const axios = require('axios')
module.exports = class UserController {

    static async fetchUserInfo(token) {
        let response = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const useInfo = await response.data;
        return useInfo
    }

    static async getUsers(req, res, next) {
        const { type, search, limit } = req.query
        let options = {
            attributes: [
                'id',
                "name",
                "email",
                "gender",
                'dob',
                'image',
                'role',
                'helpful'
            ]
        }
        let where;
        if (type && search) {
            where = {
                role: type,
                name: {
                    [Op.iLike]: `%${search}%`
                }
            }
        } else if (type) {
            where = {
                role: type
            }
        } else if (search) {
            where = {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            }
        } else {
            where = null
        }
        options['where'] = where
        if (limit) {
            options['limit'] = limit
        }

        try {
            const response = await User.findAll(options)

            res.status(200).json(response)
        } catch (error) {

            next(error)
        }
    }
    static async getUserParamId(req, res, next) {
        try {
            const response = await User.findOne({
                where: { id: req.params.id },
                attributes: [
                    'id',
                    "name",
                    "email",
                    "gender",
                    'dob',
                    'image',
                    'role',
                    'helpful'
                ]
            })

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    static async postUsers(req, res, next) {
        try {
            const response = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${req.body.token}` }
              });
            const payload = response.data;

            /* BELOW IS DUMMY PURPOSE @ilias */
            /* const payload = {
                id: '114434339297979854205',
                email: 'xvnyan@test.com',
                verified_email: true,
                name: 'Testing Purpose',
                given_name: 'Gilang',
                family_name: 'Ramadhan',
                picture: 'https://lh3.googleusercontent.com/a/AGNmyxa9f7amIsKzXc4FXr2NkMnjQoKB0Pi4fj7OZFTN=s96-c',
                locale: 'id'
              }
            const role = 'counselor'   */
            
            if ( req.body.role === 'admin' ) {
                const user = await User.findOne({
                    where: {
                        email:payload.email,
                        role:req.body.role
                    }
                })
                if (!user) throw { name: "InvalidCredentials", }
                else {

                    const access_token = jwt.sign({
                        id: user.id,
                    }, process.env.JWT_SECRET || 'mamamuda')
                    res.status(200).json({ access_token, user })

                }
                return
            }

            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    name: payload.name,
                    email: payload.email,
                    image: payload.picture,
                    helpful: 0,
                    role: req.body.role
                }
            });



            let status
            if (created) {
                status = 201
            } else {
                status = 200
            }

            const access_token = jwt.sign({
                id: user.id,
                role:user.role
            }, process.env.JWT_SECRET || 'mamamuda')
            if(user.role === 'counselor'){
                await CounselorSubmission.create({status:'pending'/* SET AS DEFAULT BECAUSE STATUS VALIDATION @ilias*/,submission:'',UserId:user.id})
            }

            res.status(status).json({ access_token, user: {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "image": user.image,
                "helpful": user.helpful,
                "role": user.role,
                "gender": user.gender,
                "dob": user.dob
            } })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
    static async putUsers(req, res, next) {
        try {
            await User.update({ ...req.body }, { where: { id: req.params.id } })

            res.status(200).json({ "message": "successfuly updated" })
        } catch (error) {
            next(error)
        }
    }
    static async deleteUsers(req, res, next) {
        try {

            await User.destroy({ where: { id: req.params.id } })

            res.status(200).json({ "message": "successfuly deleted" })
        } catch (error) {
            next(error)
        }
    }
    static async patchUsers(req, res, next) {
        const { helpful } = req.body
        try {
            const user = await User.findByPk(req.params.id)
            if (+helpful > 1 || +helpful < -1) throw { name: "OnlyAccept 1 or -1" }
            if (!(helpful < 0 && user.helpful < 1)) {
                await User.increment('helpful', { by: +helpful, where: { id: req.params.id } })
            }

            res.status(200).json({ "message": "successfuly updated" })
        } catch (error) {
            next(error)
        }
    }

    static async verify(req, res, next) {
        const { access_token } = req.body

        try {
            if (!access_token) throw { name: 'InvalidCredential' }
            const payload = jwt.verify(access_token, process.env.JWT_SECRET || 'mamamuda')
            const response = await User.findOne({
                where: { id: payload.id },
                attributes: [
                    'id',
                    "name",
                    "email",
                    "gender",
                    'dob',
                    'image',
                    'role',
                    'helpful'
                ]
            })

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    static async putCounselorIdSubmissions(req, res, next) {
        try {

            await CounselorSubmission.update({ ...req.body }, { where: { id: req.params.id } })

            res.status(200).json({ "message": "successfuly updated" })
        } catch (error) {
            next(error)
        }
    }
    static async postUsersAdmin(req, res, next){
        try {
            const response = await User.create({...req.body, role:'admin', helpful:0})
            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }
}