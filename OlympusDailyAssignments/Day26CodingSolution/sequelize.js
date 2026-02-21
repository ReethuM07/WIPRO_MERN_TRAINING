const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite"
});

const Instructor = sequelize.define("Instructor", {
  name: DataTypes.STRING
});

const Course = sequelize.define("Course", {
  title: DataTypes.STRING
});

Instructor.hasMany(Course);
Course.belongsTo(Instructor);

async function run() {
  await sequelize.sync();

  const instructor = await Instructor.create({ name: "John" });

  await Course.create({
    title: "Node Advanced",
    InstructorId: instructor.id
  });

  const courses = await Course.findAll({
    where: { InstructorId: instructor.id }
  });

  console.log(courses);
}

run();
