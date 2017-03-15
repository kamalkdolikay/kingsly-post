import express from 'express';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String
})

const User = mongoose.model("User", UserSchema, "User")

const router = express.Router();

/* GET index page. */
router.get('/', (req, res, next) => {
  User.find({},function(err,data){
    res.render('index', {
    title: 'Jannat',
    data: data,
    user_id: data[0]["_id"],
    user_name: data[0]["username"]
  });
  })
});

router.get("/posts", (req,res) => {
  User.find({},function(err,data){
    res.send(data)
  })
})

router.post("/home", (req, res) => {
    console.log(req.body.desc);
    console.log(req.body.title);
    User({
				username:req.body.desc,
				password:req.body.title
				}).save(function(err,docs){
					if(err){
						res.json({"err":err})
					}
					else{
						res.json({"message":"success"})
					}
				})
    res.end();
});

export default router;
