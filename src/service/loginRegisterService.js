import db from "../models/index"
import bcrypt from "bcryptjs";




const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkEmail = async (userEmail) => {
  let user = await db.User.findOne(
    { where: { email: userEmail } }
  )

  if (user) {
    return true;
  }

  return false

}


const checkPhone = async (userPhone) => {
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
    let isEmailExist = await checkEmail(rawUserData.email);

    if (isEmailExist === true) {
      return {
        EM: 'the email is already exits',
        EC: 1
      }
    }
    let isPhoneExits = await checkPhone(rawUserData.phone);
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

module.exports = {
  registerNewUser,
}