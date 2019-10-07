const MongoClient = require("mongodb").MongoClient;

class MongoDBClient {
  constructor(host = "localhost", port = "27017") {
    this.url = `mongodb://${host}:${port}`;
  }
  connect(callback) {
    MongoClient.connect(
      this.url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, db) => {
        if (!err) {
          console.log("MongoDB Connected");
          this.db = db;
        }
        callback(err, db);
      }
    );
  }
  close() {
    if (this.db) {
      this.db.close();
    }
  }
}

module.exports = MongoDBClient;
