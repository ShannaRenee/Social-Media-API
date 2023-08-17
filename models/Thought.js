const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        // must be between 1-280 characters
    },
    createdAt: {
        type: Date,
        // set default to the current timestamp
        // use a getter method to format the timestamp on query
    },
    username: {
        type: String,
        required: true,
    },
    reactions: {
        // array of nested documents created with the reactionSchema
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `${reactions.length}`
  });



const Thought = model('post', thoughtSchema);

module.exports = Thought;