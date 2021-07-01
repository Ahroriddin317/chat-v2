import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

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
    role: {
      type: [String],
      default: ['user']
    },
    password: {
      type: String,
      required: true
    },
    tymeZona: String
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = bcrypt.hashSync(this.password)

  return next()
})

userSchema.method({
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  async findAndValidateUser({ email, password }) {
    if (!email) {
      throw new Error('No email')
    }

    if (!password) {
      throw new Error('No password')
    }

    const user = await this.findOne({ email }).exec()
    if (!user) {
      throw new Error('No User')
    }

    const isPasswordOk = await user.passwordMatches(password)

    if (!isPasswordOk) {
      throw new Error('PasswordIncorrect')
    }

    return user
  }
}

export default mongoose.model('users', userSchema)
