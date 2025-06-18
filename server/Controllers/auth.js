const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Model/user");

exports.UserSignup = async (req, res) => {
  try {
    let checkUser = await User.findOne({ email: req.body.email });

    if (checkUser) {
      res.status(409).send("User already exists");
      return;
    }

    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const usertobeabbed = new User({ ...req.body, password: hashpassword });
    const user = await usertobeabbed.save();
    res.send({ user, msg: "signup succesfully" });
  } catch (error) {
    console.log(error);
  }
};

exports.UserSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (user) {
      const verify = await bcrypt.compare(password, user.password);

      if (verify) {
        const token = jwt.sign({ email, password }, process.env.SECRET, {
          expiresIn: "1hr",
        });
        console.log(user);

        res.send({
          token,
          userId: user._id,
          profilepic: user.ProfilePicture,
          msg: "Signin Succesfully",
        });
      } else {
        res.status(401).send("wrong password");
      }
    } else {
      res.status(409).send("User does not exists");
    }
  } catch (error) {
    console.log(error);
  }
};
