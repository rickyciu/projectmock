"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {}
    static #encrypt = (password) => bcrypt.hashSync(password, 10);
    static register = (payload) => {
      console.log(payload);
      const encryptedPassword = this.#encrypt(payload.password);
      return this.create({
        username: payload.username,
        email: payload.email,
        password: encryptedPassword,
        skor: payload.skor,
      });
    };

    static authenticate = async (payload) => {
      const user = await Users.findOne({
        where: { email: payload.email },
      });
      console.log("payload2", user);
      if (user) {
        const isPasswordValid = bcrypt.compareSync(
          payload.password,
          user.password
        );
        if (isPasswordValid) {
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            skor : user.skor,
            isplayed : user.isplayed
          };
          const secret = "secret";
          const token = jwt.sign(payload, secret);
          user.token = token;
          console.log("username dan password cocok");
          return user;
        } else {
          console.log("password salah");
          return !user;
        }
      } else {
        console.log("username tidak ditemukan");
        return !user;
      }
    };

    static profile = async (payload) => {
       const user = await Users.findOne({
        where: { id: payload },
      });
      if (user) {
       return user;
      } else {
        console.log("username tidak ditemukan");
        return !user;
      }
    };
    
    static editprofile = async (payload) => {
     console.log("payload",payload);
      const user = await Users.update(
        payload,{
       where: { id: payload.id },
     });
      return user;
   };
  }
  Users.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      skor: DataTypes.INTEGER,
      isplayed: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
