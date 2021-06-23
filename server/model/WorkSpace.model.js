import mongoose from 'mongoose'

const workSpaceSchema = new mongoose.Schema(
  {
    id: Number,
    workSpaceName: {
      type: String,
      required: true,
      unique: true
    },
    workSpaceImg: String,
    usersId: [String],
    channels: [
      {
        id: Number,
        name: {
          type: String,
          require: true,
          unique: true
        },
        messages: [
          {
            userId: {
              type: String,
              require: true,
              unique: true
            },
            messageId: {
              type: String,
              require: true,
              unique: true
            },
            text: String,
            messageDate: String
          }
        ]
      }
    ]
  },
  {
    timestamps: true
  }
)

export default mongoose.model('workspaces', workSpaceSchema)
