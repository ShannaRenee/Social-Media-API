const { ObjectId } = require('mongodb');
const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [{
        reactionId: Schema.Types.ObjectId,
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
        },
    }],
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
    return `${this.reactions.length}`
  });



const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;