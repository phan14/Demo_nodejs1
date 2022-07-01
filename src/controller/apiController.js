
import loginRegisterService from '../service/loginRegisterService'

const testApi = (req, res) => {
  return res.status(200).json({
    message: 'ok',
    data: 'test api'
  })
}


const handleRegister = async (req, res) => {

  try {
    // req.body: email,phone,username,password
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: "Missing require parameters",//error message
        EC: '1',//error code
        Dt: '',//date
      })
    }

    if (req.body.password && req.body.password.length < 4) {
      return res.status(200).json({
        EM: "Your password must have more than 3",//error message
        EC: '1',//error code
        Dt: '',//date
      })
    }

    // service : create user
    let data = await loginRegisterService.registerNewUser(req.body)


    return res.status(200).json({
      EM: data.EM,//error message
      EC: data.EC,//error code
      Dt: '',//date
    })

  } catch (err) {
    return res.status(500).json({
      EM: "err from server",//error message
      EC: '-1',//error code
      Dt: '',//date

    })


  }

}




const handleLogin = async (req, res) => {
  try {


    let data = await loginRegisterService.handleUserLogin(req.body)


    return res.status(200).json({
      EM: data.EM,//error message
      EC: data.EC,//error code
      Dt: data.Dt,//date
    })
  }

  catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "err from server",//error message
      EC: '-1',//error code
      Dt: '',//date

    })

  }
}



module.exports = {
  testApi,
  handleRegister,
  handleLogin
}