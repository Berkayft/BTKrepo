const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { User } = require("../models/Model");


passport.use(new LocalStrategy({usernameField:"email"},
    async (email , password , done) => {
        try {
            const user = await User.findOne({ email });
            if(!user){
                return done(null , false , {message:"Bu email de biri yok"});

            }
            const isMatch = await bcrypt.compare(password , user.password);
            if(!isMatch){
                return done(null , false , {message:"Parola hatalı"});

            }
            return done(null , user);
        } catch(err) {
            return done(err);
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });