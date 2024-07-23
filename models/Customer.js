// Implementation of one to many approach 2

const mongoose = require("mongoose");
const { Schema } = mongoose;

async function main() {
  await mongoose.connect("mongodb://localhost:27017/cutomer-db");
}

main()
  .then(() => console.log("Connected to DB Successfully"))
  .catch((err) => console.log(err));

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const Order = mongoose.model("Order", orderSchema);

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Customer = mongoose.model("Customer", customerSchema);

const addOrders = async () => {
  const order1 = new Order({
    item: "Samosa",
    price: 10,
  });
  const order2 = new Order({
    item: "Tea",
    price: 12,
  });
  const order3 = new Order({
    item: "Maggi",
    price: 14,
  });
  await order1.save();
  await order2.save();
  await order3.save();
};

// addOrders()
//   .then(() => console.log("Added Data"))
//   .catch((err) => console.log(err));

const addCustomers = async () => {
  await Customer.insertMany([
    {
      name: "Aakash",
      orders: [
        await Order.findOne({ item: "Tea" }),
        await Order.findOne({ item: "Maggi" }), // find the complete object or by specifying the ObhectID both works
      ],
    },
  ]);
};

// addCustomers()
//   .then(() => console.log("Inserted Customers"))
//   .catch((err) => console.log(err));
