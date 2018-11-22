import mongoose from 'mongoose';

const { Schema } = mongoose;
const oilandgasSchema = new Schema({
  heading: {
    type: String,
    required: [true, 'News must have a heading']
  },
  content: {
    imgSrc: {
      type: String
    },
    body: {
      type: String,
      required: [true, 'Content must have a body']
    }
  },
  intro: {
    type: String,
    required: [true, 'News must have a body']
  }
});

export default mongoose.model('Oilandgas', oilandgasSchema);
