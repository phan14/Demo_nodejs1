import db from "../models/index"
import bcrypt from "bcryptjs";
import { Op } from "sequelize";




const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne(
    { where: { email: userEmail } }
  )

  if (user) {
    return true;
  }

  return false

}


const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne(
    { where: { phone: userPhone } }
  )

  if (user) {
    return true;
  }

  return false

}


const registerNewUser = async (rawUserData) => {

  try {



    //check email/phonenumber are exits
    let isEmailExist = await checkEmailExist(rawUserData.email);

    if (isEmailExist === true) {
      return {
        EM: 'the email is already exits',
        EC: 1
      }
    }
    let isPhoneExits = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExits === true) {
      return {
        EM: 'the phone is already exits',
        EC: 1
      }
    }


    // hash user password

    let hashPassword = hashUserPassword(rawUserData.password);


    // create new user
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: hashPassword,
      phone: rawUserData.phone
    })

    return {
      EM: 'A user is created successfully!',
      EC: 0
    }

  } catch (e) {
    console.log(e)
    return {
      EM: 'somthing worong is service',
      EC: -2
    }
  }

}



const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);//true or false
}

const handleUserLogin = async (rawData) => {
  try {

    //check email/phonenumber are exits

    let user = await db.User.findOne({
      where: {
        [Op.or]: [
          { email: rawData.valueLogin },
          { phone: rawData.valueLogin }
        ]
      }


    })

    if (user) {
      console.log(">> found user with email/phone");
      let isCorrectPassword = checkPassword(rawData.password, user.password)
      if (isCorrectPassword === true) {
        return {
          EM: 'Ok',
          EC: 0,
          Dt: ''
        }
      }
    }
    console.log(">> input found user with email/phone :", rawData.valueLogin, "password: ", rawData.password);
    return {
      EM: 'Your email/phone number or password is incorrect',
      EC: 1,
      Dt: ''
    }

  } catch (err) {
    console.log(err);
    return {
      EM: 'something worngs in service...',
      EC: -2
    }
  }
}

module.exports = {
  registerNewUser,
  handleUserLogin
}