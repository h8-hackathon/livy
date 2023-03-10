const { Op } = require("sequelize");
const { User, CounselorSubmission } = require("../models");
const { Availability } = require("../mongo");
const jwt = require("jsonwebtoken");
const axios = require("axios");
module.exports = class UserController {
  static async getCounselorSubmissions(req, res, next) {
    try {
      const response = await CounselorSubmission.findOne({
        where: { UserId: req.params.counselorId },
        include: User,
      });
      if (!response) throw { name: "NotFound" };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(req, res, next) {
    const { type, search, limit } = req.query;
    let options = {
      attributes: [
        "id",
        "name",
        "email",
        "gender",
        "dob",
        "image",
        "role",
        "helpful",
      ],
    };
    let where;
    if (type && search) {
      where = {
        role: type,
        name: {
          [Op.iLike]: `%${search}%`,
        },
      };
    } else if (type) {
      where = {
        role: type,
      };
    } else if (search) {
      where = {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      };
    } else {
      where = null;
    }
    options["where"] = where;
    if (limit) {
      options["limit"] = limit;
    }

    try {
      const response = await User.findAll(options);
      if (response.length < 1) throw { name: "NotFound" };
      console.log(response);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getUserParamId(req, res, next) {
    try {
      const response = await User.findOne({
        where: { id: req.params.id },
        attributes: [
          "id",
          "name",
          "email",
          "gender",
          "dob",
          "image",
          "role",
          "helpful",
        ],
      });

      if (!response) throw { name: "NotFound" };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  /* istanbul ignore next */
  static async postUsers(req, res, next) {
    try {
      let response;
      let payload;
      if (process.env.NODE_ENV == "test") {
        /* BELOW IS DUMMY PURPOSE @ilias */
        payload = {
            name: "iliasadmin",
            email: "iliasadmin@test.com",
            gender: "M",
            dob: "2023-03-07T01:19:32.622Z",
            image: "string image url testing purpose",
            role: "superadmin",
            helpful: 20,
          }
        const role = "counselor";
      } else {
        response = await axios.get(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${req.body.token}` },
          }
        );

        payload = response.data;
      }

      if (req.body.role === "admin") {
        const user = await User.findOne({
          where: {
            email: payload.email,
            role: req.body.role,
          },
        });
        if (!user && (user.role !== "admin" || user.role !== "superadmin"))
          throw { name: "InvalidCredentials" };
        else {
          const access_token = jwt.sign(
            {
              id: user.id,
            },
            process.env.JWT_SECRET || "mamamuda"
          );
          res.status(200).json({ access_token, user });
        }
        return;
      }

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          name: payload.name,
          email: payload.email,
          image: payload.picture,
          helpful: 0,
          role: req.body.role,
        },
      });

      let status;
      if (created) {
        status = 201;
      } else {
        status = 200;
      }

      const access_token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET || "mamamuda"
      );
      if (req.body.role === "counselor") {
        await CounselorSubmission.findOrCreate({
          where: { UserId: user.id },
          defaults: {
            status: "pending",
            submission: "",
          },
        });

        const isExist = await Availability.findOne({
          UserId: user.id,
        });

        console.log(isExist);

        if (!isExist) {
          const response = await Availability.insertOne({
            UserId: user.id,
            availability: [],
          });

          console.log(response);
        }
      }

      res.status(status).json({
        access_token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          helpful: user.helpful,
          role: user.role,
          gender: user.gender,
          dob: user.dob,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  static async putUsers(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) throw { name: "NotFound" };
      await User.update({ ...req.body }, { where: { id: req.params.id } });
      res.status(200).json({ message: "successfuly updated" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteUsers(req, res, next) {
    try {
      await User.destroy({ where: { id: req.params.id } });

      res.status(200).json({ message: "successfuly deleted" });
    } catch (error) {
      next(error);
    }
  }
  static async patchUsers(req, res, next) {
    const { helpful } = req.body;
    try {
      const user = await User.findByPk(req.params.id);
      if (+helpful > 1 || +helpful < -1) throw { name: "OnlyAccept 1 or -1" };
      if (!(helpful < 0 && user.helpful < 1)) {
        await User.increment("helpful", {
          by: +helpful,
          where: { id: req.params.id },
        });
      }

      res.status(200).json({ message: "successfuly updated" });
    } catch (error) {
      next(error);
    }
  }

  static async verify(req, res, next) {
    const { access_token } = req.body;

    try {
      if (!access_token) throw { name: "InvalidCredentials" };
      const payload = jwt.verify(
        access_token,
        process.env.JWT_SECRET || "mamamuda"
      );
      const response = await User.findOne({
        where: { id: payload.id },
        attributes: [
          "id",
          "name",
          "email",
          "gender",
          "dob",
          "image",
          "role",
          "helpful",
        ],
      });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async putCounselorIdSubmissions(req, res, next) {
    console.log(req.body);
    console.log(req.params);
    try {
      // await User.update({ ...req.body }, { where: { id: req.params.id } })
      await CounselorSubmission.update(
        { ...req.body },
        { where: { UserId: req.params.counselorId } }
      );

      res.status(200).json({ message: "successfuly updated" });
    } catch (error) {
      next(error);
    }
  }
  static async postUsersAdmin(req, res, next) {
    console.log(req.body);
    try {
      const response = await User.create({
        ...req.body,
        role: "admin",
        helpful: 0,
      });
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async postUsersTest(req, res, next) {
    try {
      /*             const response = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
                  headers: { Authorization: `Bearer ${req.body.token}` }
                });
              const payload = response.data; */

      const payload = req.body?.payload;

      if (req.body.role === "admin") {
        const user = await User.findOne({
          where: {
            email: payload.email,
            role: req.body.role,
          },
        });
        if (!user) throw { name: "InvalidCredentials" };
        else {
          const access_token = jwt.sign(
            {
              id: user.id,
            },
            process.env.JWT_SECRET || "mamamuda"
          );
          res.status(200).json({ access_token, user });
        }
        return;
      }

      const [user, created] = await User.findOrCreate({
        where: { email: payload?.email },
        defaults: {
          name: payload?.name,
          email: payload?.email,
          image: payload?.picture,
          helpful: 0,
          role: req.body?.role,
        },
      });

      let status;
      if (created) {
        status = 201;
      } else {
        status = 200;
      }

      const access_token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET || "mamamuda"
      );
      if (user.role === "counselor") {
        await CounselorSubmission.create({
          status:
            "pending" /* SET AS DEFAULT BECAUSE STATUS VALIDATION @ilias*/,
          submission: "",
          UserId: user.id,
        });
      }

      res.status(status).json({
        access_token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          helpful: user.helpful,
          role: user.role,
          gender: user.gender,
          dob: user.dob,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
};
