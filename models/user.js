const mongoose = require("mongoose");
const { Schema } = mongoose;
async function main() {
  await mongoose.connect("mongodb://localhost:27017/test-rel-db");
}

main()
  .then(() => {
    console.log("Connected DB Successfully");
  })
  .catch((err) => console.log(err));

const userSchema = new Schema({
  username: String,
  address: [
    {
      _id: false,
      location: String,
      city: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const saveUser = async () => {
  const user1 = new User({
    username: "Aakash",
    address: [
      {
        // _id: false,
        location: "Kavadiguda",
        city: "Hyderabad",
      },
    ],
  });

  await user1.save();
};

saveUser();
