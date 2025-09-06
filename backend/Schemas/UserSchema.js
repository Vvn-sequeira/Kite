const {Schema} = require("mongoose")
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
     Email: {
          type: String,
          required: [true, "Your email address is required"],
          unique: true,
        },
        Username: {
          type: String,
          required: [true, "Your username is required"],
        },
        Password: {
          type: String,
          required: [true, "Your password is required"],
        },
        createdAt: {
          type: Date,
          default: new Date(),
        },
});

UserSchema.pre("save", async function () {
     this.Password = await bcrypt.hash(this.Password, 12);
   });

module.exports = {UserSchema};