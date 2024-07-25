// implementing one to squillion (one to many approach 3)

const mongoose = require("mongoose");
const { Schema } = mongoose;

async function main() {
  await mongoose.connect("mongodb://localhost:27017/cutomer-db");
}

main()
  .then(() => console.log("Connected to DB Successfully"))
  .catch((err) => console.log(err));

const userSchema = new Schema({
  name: String,
});

userSchema.post("findOneAndDelete", async (data) => {
  console.log("POST Middleware after the query executes");
  console.log(data);
});

const User = mongoose.model("User", userSchema);

const postSchema = new Schema({
  likes: Number,
  user: {
    type: Schema.Types.ObjectId, // Storing the reference of Parent
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);

const addUsers = async () => {
  await User.insertMany([
    {
      name: "Aakash",
    },
    {
      name: "Bharath",
    },
  ]);
};

// addUsers()
//   .then(() => console.log("Inserted User Data Successfully"))
//   .catch((err) => console.log(err));

const addPosts = async () => {
  await Post.insertMany([
    {
      likes: 250,
      user: await User.findOne({ name: "Aakash" }),
    },
    // {
    //   likes: 300,
    //   user: await User.findOne({ name: "Bharath" }),
    // },
  ])
    .then(() => console.log("Inserted"))
    .catch((err) => console.log(err));
};

addPosts();

const findPosts = async () => {
  const data = await Post.find({}).populate("user");
  console.log(data);
};

// findPosts();

// const delUser = async () => {
//   let data = await User.findByIdAndDelete("669efd92d87f75e791ec0498");
//   console.log(data);
// };

// delUser();
