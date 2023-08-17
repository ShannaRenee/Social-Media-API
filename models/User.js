const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
      username: { 
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
      email: {
        type: String,
        required: true,
        unique: true,
        // look into mongoose validation
      },
      thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
        }
      ],
      friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'user',
        }
      ],
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