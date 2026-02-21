const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const User = mongoose.model("User", {
  name: String,
  email: String
});

const Enrollment = mongoose.model("Enrollment", {
  course: String,
  userId: mongoose.Schema.Types.ObjectId
});

async function run() {
  const user = await User.create({
    name: "Vikas",
    email: "vikas@test.com"
  });

  await Enrollment.create({
    course: "React",
    userId: user._id
  });

  const data = await Enrollment.find().populate({
    path: "userId",
    model: "User"
  });

  console.log(data);
}

run();
