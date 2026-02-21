db.books.createIndex({ genre: 1 });
db.books.createIndex({ authorId: 1 });
db.books.createIndex({ "ratings.score": 1 });

db.books.find({ genre: "Fiction" }).explain("executionStats");

db.books.dropIndex({ genre: 1 });

db.books.createIndex({ genre: 1 });

db.books.aggregate([
  { $unwind: "$ratings" },
  {
    $group: {
      _id: "$title",
      avgRating: { $avg: "$ratings.score" }
    }
  }
]);

db.books.aggregate([
  { $unwind: "$ratings" },
  {
    $group: {
      _id: "$title",
      avgRating: { $avg: "$ratings.score" }
    }
  },
  { $sort: { avgRating: -1 } },
  { $limit: 3 }
]);

db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      totalBooks: { $sum: 1 }
    }
  }
]);

db.books.aggregate([
  {
    $group: {
      _id: "$authorId",
      bookCount: { $sum: 1 }
    }
  },
  { $match: { bookCount: { $gt: 2 } } }
]);

db.books.aggregate([
  { $unwind: "$ratings" },
  {
    $group: {
      _id: "$authorId",
      totalRewardPoints: { $sum: "$ratings.score" }
    }
  }
]);

