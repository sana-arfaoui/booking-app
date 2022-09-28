import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import createError from "../utils/error.js";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  try {
    let { email, username, country, phone, password, city } = req.body;

    let checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(401).json({
        status: false,
        error: "This email is already exists, please enter another one",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // const newUser = new User({
    //   ...req.body,
    //   password: hash,
    // });
    const newUser = new User({
      username,
      email,
      country,
      city,
      phone,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created ");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      // return next(createError(404, "User Not Found Try again"));
      return res
        .status(404)
        .json({ status: false, message: "User Not Found Try again" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      // return next(createError(400, "Wrong password or email"));
      return res
        .status(404)
        .json({ status: false, message: "Wrong password or email" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};


export const logout = (req, res  )=>{
  console.log("logout")
  res.clearCookie('token')
  res.status(200).send("user logout")

}