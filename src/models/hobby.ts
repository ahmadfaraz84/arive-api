import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const hobbySchema = new Schema({
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
	name: {
		type: String,
		required: true,
	},
    passionLevel: {
		type: String,
		required: true,
	},
    year: {
		type: String,
		required: true,
        default: new Date().getFullYear().toString(),
	},
  });

const Hobby = mongoose.model('Hobby', hobbySchema);

export default Hobby;