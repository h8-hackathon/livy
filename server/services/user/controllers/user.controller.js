const { Op } = require('sequelize')
const { User } = require('../models')
module.exports = class UserController {

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
                where: {id:req.params.id},
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
            const { id, name, email, gender, dob, image, role, helpful } = await User.create({ ...req.body, helpful: 0 })

            res.status(200).json({ id, name, email, gender, dob, image, role, helpful })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async putUsers(req, res, next) {
        try {
            await User.update({ ...req.body }, { where: { id: req.params.id } })

            res.status(200).json({  "message": "successfuly updated" })
        } catch (error) {
            next(error)
        }
    }
    static async deleteUsers(req, res, next) {
        try {
            await User.destroy({ where: { id: req.params.id } })

            res.status(200).json({"message": "successfuly deleted"})
        } catch (error) {
            next(error)
        }
    }
    static async patchUsers(req, res, next) {
        const { helpful } = req.body
        try {
            const user = await User.findByPk(req.params.id)
            if (helpful > 1 && helpful < -1) throw { name: "OnlyAccept 1 or -1" }
            if (!(helpful < 0 && user.helpful < 1)) {
                await User.increment('helpful', { by: +helpful, where: { id: req.params.id } })
            }

            res.status(200).json({ "message": "successfuly updated" })
        } catch (error) {
            next(error)
        }
    }

   static async verify(req, res, next) {
    const {access_token} = req.body
    
    try {
        const response = await User.findOne({
            where: {id:1},
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
}