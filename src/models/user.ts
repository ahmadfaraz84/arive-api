import mongoose, { Query } from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
    hobbies: [
        { 
        type: Schema.Types.ObjectId, 
        ref: 'Hobby' 
    }
    ]
  });

  /**
   * Middle ware to delete all referenced hobbies of a particular user
   */
  userSchema.post('findOneAndDelete',  async function(doc){
    await mongoose.model("Hobby").deleteMany({owner: doc._id});
  });

  /**
   * Middle ware to delete all hobbies
   */
  userSchema.post('deleteMany',  async function(doc){
    await mongoose.model("Hobby").deleteMany({});
  });

  

const User = mongoose.model('User', userSchema);

export default User;