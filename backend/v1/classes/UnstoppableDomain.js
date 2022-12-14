/* Section 2: definition */

var MySQL = require("../../MySQL");
var ApiError = require("./ApiError");
module.exports = UnstoppableDomains;

function UnstoppableDomains(unstoppableDomain) {
  this.set(unstoppableDomain);
}

UnstoppableDomains.prototype.set = function setUnstoppableDomain(
  unstoppableDomain
) {
  if (typeof unstoppableDomain !== "undefined") {
    this.description = unstoppableDomain.description;
    this.geopos = unstoppableDomain.geopos;
    this.id = unstoppableDomain.id;
  }
};

/* Section 3: CRUD */

UnstoppableDomains.prototype.create = function createUnstoppableDomain() {
  var unstoppableDomain = this;
  var promise = new Promise((resolve, reject) => {
    MySQL.pool.getConnection(function (err, db) {
      db.execute(
        "insert into `nsfw` (`description`,`name`,`url`) values(?,?,?);",
        [
          unstoppableDomain.description,
          unstoppableDomain.name,
          unstoppableDomain.url,
        ],
        function (err, results, fields) {
          var success = false;
          if (err) {
            reject(new ApiError(500, err));
          } else if (results.length < 1) {
            reject(new ApiError(500, "Domain not saved!"));
          } else {
            unstoppableDomain.id = results.insertId;
            resolve(unstoppableDomain);
          }
          db.release();
        }
      );
    });
  });
  return promise;
};

//Read
UnstoppableDomains.prototype.read = function readUnstoppableDomain() {
  let unstoppableDomain = this;
  var promise = new Promise((resolve, reject) => {
    MySQL.pool.getConnection(function (err, db) {
      db.execute(
        "select * from `unstoppable_domain`",

        function (err, results, fields) {
          if (err) {
            reject(new ApiError(500, err));
          } else if (results.length < 1) {
            resolve([]);
          } else {
            unstoppableDomain.set(results);
            resolve(results);
          }
          db.release();
        }
      );
    });
  });
  return promise;
};

//Update
UnstoppableDomains.prototype.update = function updateUnstoppableDomain(
  description,
  name,
  url,
  id
) {
  var promise = new Promise((resolve, reject) => {
    MySQL.pool.getConnection(function (err, db) {
      var sql =
        "update `unstoppable_domain` set description = ?, name = ?, url = ? where id = ?;";
      var params = [description, name, url, id];
      db.execute(sql, params, function (err, results, fields) {
        if (err) {
          reject(new ApiError(500, err));
        } else {
          resolve();
        }
        db.release();
      });
    });
  });
  return promise;
};

UnstoppableDomains.prototype.delete = function deleteUnstoppableDomain() {
  process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
    // application specific logging, throwing an error, or other logic here
  });
  var unstoppableDomain = this;
  var promise = new Promise((resolve, reject) => {
    if (unstoppableDomain.id) {
      MySQL.pool.getConnection(function (err, db) {
        db.execute(
          "delete from `unstoppable_domain` where `id` = ?",
          [unstoppableDomain.id],
          function (err, results, fields) {
            var success = false;
            if (err) {
              reject(new ApiError(500, err));
            } else if (results.length < 1) {
              reject(new ApiError(400, "Nothing deleted"));
            } else {
              resolve();
            }
            db.release();
          }
        );
      });
    } else {
      reject(new ApiError(400, "Missing unstoppable domain delete id"));
    }
  });
  return promise;
};
