let courses = [
  { id: 1, title: "Node.js Basics" },
  { id: 2, title: "React Fundamentals" }
];

export const getCourses = (req, res) => {
  res.status(200).json(courses);
};

export const createCourse = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newCourse = {
    id: courses.length + 1,
    title
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
};
