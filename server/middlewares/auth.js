const { verifyToken } = require('../helpers/jwt');
const { UserSymptom } = require('../models');

const authentication = (req, res, next) => {
  const accessToken = req.headers.access_token;
  const verifiedData = verifyToken(accessToken);
  try {
    if (!accessToken) {
      throw {
        name: 'AuthenticationFailed'
      };
    } else if (!verifiedData) {
      throw {
        name: 'AuthenticationFailed'
      };
    } else {
      const { id, email } = verifiedData;
      req.user = { id, email }; 
      next();
    }
  } catch (error) {
    // console.log(error, 'ini error autentikasi');
    next(error);
  }
}

const authorization = async (req, res, next) => {
  const userSymptomId = +req.params.id;
  // console.log(req.params);
  const { id } = req.user;
  // console.log(id);
  try {
    const userSymptom = await UserSymptom.findByPk(userSymptomId);

    if (!userSymptom) {
      throw {
        name: 'NotFound'
      }
    } else if (userSymptom.UserId !== +id) {
      throw {
        name: 'NotAuthorized'
      }
    } else {
      next();
    }
    
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
  authorization
}