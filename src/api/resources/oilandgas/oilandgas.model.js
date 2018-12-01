import mongoose from 'mongoose';
import timestamp from '../../../config/plugin';

const { Schema } = mongoose;
const oilandgasSchema = new Schema({
  heading: {
    type: String,
    required: [true, 'News must have a heading']
  },
  createdAt: {
    type: Date
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

oilandgasSchema.plugin(timestamp);

export default mongoose.model('Oilandgas', oilandgasSchema);
