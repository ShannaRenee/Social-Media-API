const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
      username: { 
        type: String,
        unique: true,
        required: true,
        trimmed: true,
    },
      email: {
        type: String,
        required: true,
        unique: true,
        // look into mongoose validation
      },
      thoughts: {
        // array of id values referencing the thought model
      },
      friends: {
        // array of id values referencing the user model
      },
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

  userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return `${this.friends.length}`;
  });


const User = model('user', userSchema);

module.exports = User;

