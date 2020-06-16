import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Bug = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  comments: [{ type: ObjectId }],
  status: { type: String, required: true, default: "Open", enum: ["Open", "Closed"] }
}, { timestamps: true, toJSON: { virtuals: true } })

Bug.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

//CASCADE ON DELETE
// Board.pre('findOneAndRemove', function (next) {
//   //lets find all the lists and remove them
//   Promise.all([
//     dbContext.List.deleteMany({ boardId: this._conditions._id })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

export default Bug