1. db.books.find({status:"Available"},{_id:false,title:true})

2. db.members.find({ "borrowHistory.overdue": { $gt: 0 } })

3. db.books.find({ genre: "Technology" })

4. db.books.find({ "copies.total": { $gt: 3 } })

5. db.books.find({ "location.floor": 2 })

6. db.members.find({ status: "Active" })

7. db.books.find({ "location.section": "Tech" })

8. db.books.find({ genre: { $all: ["Technology", "Mathematics"] } })

9. db.members.find({ "currentBorrowings.1": { $exists: true } })

10. db.books.find({ "reviews.rating": { $gt: 4.5 } })

11. db.books.updateOne(
  { bookId: "BK101" },
  { $push: { reviews: { rating: 4.9, review: "Extremely detailed and helpful" } } }
)

12. db.members.updateOne(
  { memberId: "MEM101" },
  { $set: { notifications: false } }
)

13. db.books.updateOne(
  { bookId: "BK102" },
  { $set: { status: "Maintenance" } }
)

14. db.members.updateOne(
  { memberId: "MEM103" },
  { $set: { status: "Expired" } }
)

15. db.members.deleteMany({ status: "Expired" })

16. db.books.deleteMany({ status: "Maintenance" })

17. db.members.updateOne(
  { memberId: "MEM103" },
  { $pull: { borrowHistory: "BK105" } }
)





