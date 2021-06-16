import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    name: String,
    image: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    },
    userName: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    tymeZona: String
  },
  {
    timestamps: true
  }
)

export default mongoose.model('users', userSchema)
