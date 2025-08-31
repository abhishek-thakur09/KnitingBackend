const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const Product = require("./models/product");



const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = req.body;
  console.log(user);

  try {
    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) return res.status(400).send("User is existed already..");

    const NewUser = await new User(user);

    await NewUser.save();

    res.send("user added successfully...");
  } catch (error) {
    res.status(400).send("please enter valid credentials.."+ error);
  }
});



app.patch("/updateUser/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const allowed_Updates = [
      "firstName",
      "lastName",
      "phoneNumber",
      "Gender",
    ];

    const updateallowed = Object.keys(data).every((k) =>
      allowed_Updates.includes(k)
    );

    if (!updateallowed) {
      throw new Error("Update is not allowed.");
    }

    // update user
    const updateduser = await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("user updated successfully..");
    // await updateduser.save();

  } catch (error) {
    res.status(400).send("Enter valid credentials..");
  }
});





app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    console.log(userEmail);

    const user = await User.findOne({ email: userEmail });

    res.json(user);
  } catch (error) {
    res.status(400).send("User not found!");
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await User.find();

    res.send(products);
  } catch (error) {
    res.status(404).send("Something went wrong..");
  }
});

app.post("/addProducts", async (req, res) => {
  try {
    const products = new Product(req.body);

    await products.save();

    res.send("data added successfully");
  } catch (error) {
    res.status(404).send("please add valid product...");
  }
});

app.delete("/productDelete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const product = await Product.findByIdAndDelete(userId);

    res.send("user deleted successfully!!");
  } catch (error) {
    res.send("something went wrong!!");
  }
});

app.patch("/updateProducts/:userId", async (req, res) => {
  const productId = req.params?.userId;
  const data = req.body;


  try {

      const allowed_Updates = [
      "photoUrl",
      "name",
      "description",
      "price",
      "gender",
      "size",
      "stock",
    ];

    const updateallowed = Object.keys(data).every((k) =>
      allowed_Updates.includes(k)
    );

    if (!updateallowed) {
      throw new Error("Update is not allowed.");
    }




    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      ProductUpdate
    );

    res.send("product updated successfully!!");
    await updatedProduct.save();
  } catch (error) {
    res.send("Something went wrong"+ error.message);
  }
});

connectDb()
  .then(() => {
    console.log("Database Connection establish...");

    app.listen(4000, () => {
      console.log("Server is running on  4000");
    });
  })
  .catch((error) => {
    console.log("Database cannot be connected");
  });
