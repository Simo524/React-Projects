const query = require("./sql.js");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const emailValidator = require("deep-email-validator");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const saltRounds = 10;

// server settings
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(cookieParser());

const defaultCallback = (error, result) => {
  if (error) console.log(error);
};

// creates databse if it doesn't exists
const createDatabase = () => {
  let connection = mysql.createConnection({
    user: "root",
    password: "",
  });

  connection.connect();

  let sql = "CREATE DATABASE IF NOT EXISTS Todo";
  connection.query(sql, defaultCallback);

  connection = mysql.createConnection({
    user: "root",
    password: "",
    database: "Todo",
  });

  sql =
    "CREATE TABLE IF NOT EXISTS categories(id int AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, color VARCHAR(255) NOT NULL, id_user VARCHAR(255) NOT NULL DEFAULT '0');";
  connection.query(sql, defaultCallback);

  sql =
    "INSERT INTO categories VALUES(0, 'All', 'white', 0); INSERT INTO categories VALUES(1, 'Study', 'orange', 0); INSERT INTO categories VALUES(2, 'Coding', 'red', 0); INSERT INTO categories VALUES(3, 'Books', 'blue', 0); INSERT INTO categories VALUES(4, 'Movies', 'purple', 0);";
  connection.query(sql, defaultCallback);

  sql =
    "CREATE TABLE IF NOT EXISTS users(email VARCHAR(255) PRIMARY KEY, username VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL);";
  connection.query(sql, defaultCallback);

  sql =
    "CREATE TABLE IF NOT EXISTS todo(id int AUTO_INCREMENT PRIMARY KEY, text VARCHAR(255) NOT NULL, done int(1) NOT NULL DEFAULT 0,id_user VARCHAR(255) NOT NULL, id_category int NOT NULL);";
  connection.query(sql, defaultCallback);

  connection.end();
};
createDatabase();

app.post("/signUp", (req, res) => {
  const { email, username, password } = req.body;

  const checkMailSql = "SELECT * FROM users WHERE email='" + email + "'";
  query(checkMailSql, async (error, result) => {
    defaultCallback(error, result);

    if (!(result.length == 0)) {
      res.send(
        JSON.stringify({
          errorMail: true,
          message: "Email already in use",
        })
      );
      return;
    }

    const checkUsernameSql =
      "SELECT * FROM users WHERE username='" + username + "'";
    query(checkUsernameSql, async (error, result) => {
      defaultCallback(error, result);

      if (!(result.length == 0)) {
        res.send(
          JSON.stringify({
            errorUsername: true,
            message: "Username already in use",
          })
        );
        return;
      }

      const emailValidateResult = await emailValidator.validate(email);
      if (!emailValidateResult.valid) {
        res.send(
          JSON.stringify({
            error: "true",
            message: "Email not valid",
          })
        );
        return;
      }

      bcrypt
        .genSalt(saltRounds)
        .then((salt) => {
          return bcrypt.hash(password, salt);
        })
        .then((hash) => {
          const sql =
            "INSERT INTO users (email, username, password) VALUES ('" +
            email +
            "', '" +
            username +
            "', '" +
            hash +
            "');";

          query(sql, defaultCallback);

          // 86400 is a day
          res.cookie("username", username, { maxAge: 86400 * 30 });
          res.cookie("usermail", email, {
            maxAge: 86400 * 30,
          });

          res.send(
            JSON.stringify({
              error: false,
              message: "Signed up",
            })
          );
        })
        .catch((err) => console.error(err.message));
    });
  });
});

app.post("/addTodo", (req, res) => {
  const text = req.body.text;
  const id_user = req.body.id_user;
  const id_category = req.body.id_category;

  const sql =
    "INSERT INTO todo(text, id_user, id_category) VALUES('" +
    text +
    "', '" +
    id_user +
    "', " +
    id_category +
    ");";

  query(sql, (error, result) => {
    if (error) console.log(error);
    else res.sendStatus(200);
  });
});

app.post("/addCategory", (req, res) => {
  const { name, color, id_user } = req.body;

  const sql =
    "INSERT INTO categories(name, color, id_user) VALUES('" +
    name +
    "', '" +
    color +
    "', '" +
    id_user +
    "');";

  query(sql, (error, result) => {
    if (error) console.log(error);
    else res.sendStatus(200);
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username='" + username + "'";
  query(sql, (error, sqlResult) => {
    if (error) {
      console.log(error);
      return;
    }
    // case no username found
    if (sqlResult.length == 0) {
      res.json({
        errorUsername: "true",
        message: "username not found",
      });
      res.send();
      return;
    }

    const dbPassword = sqlResult[0].password;

    // password check
    bcrypt
      .compare(password, dbPassword)
      .then((compareResult) => {
        if (compareResult) {
          // get categories and todos and send back
          const categorySql =
            'SELECT * FROM categories WHERE id_user="0" OR id_user="' +
            sqlResult[0].email +
            '";';
          let categories;
          query(categorySql, (error, categoryResult) => {
            if (error) {
              console.log(error);
              return;
            }
            categories = categoryResult;

            const todoSql =
              'SELECT * FROM todo WHERE id_user="' + sqlResult[0].email + '";';
            let todo;
            query(todoSql, (error, todoResult) => {
              if (error) {
                console.log(error);
                return;
              }
              todo = todoResult;

              // 86400 is a day
              res.cookie("username", username, { maxAge: 86400 * 30 });
              res.cookie("usermail", sqlResult[0].email, {
                maxAge: 86400 * 30,
              });

              res.send(
                JSON.stringify({
                  error: "false",
                  message: "logged in",
                  id_user: sqlResult[0].email,
                  username: sqlResult[0].username,
                  categories: categories,
                  todos: todo,
                })
              );
            });
          });
        } else {
          // case wrong password
          res.json({
            errorPassword: "true",
            message: "Wrong password",
          });
          res.send();
          return;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
});

app.post("/getTodos", (req, res) => {
  const { email } = req.body;

  const sql = "SELECT * FROM todo WHERE id_user='" + email + "'";
  query(sql, (error, result) => {
    if (error) console.log(error);
    else res.send(JSON.stringify(result));
  });
});

app.post("/getCategories", (req, res) => {
  const { email } = req.body;

  const sql =
    "SELECT * FROM categories WHERE id_user='0' OR id_user='" + email + "'";
  query(sql, (error, result) => {
    if (error) console.log(error);
    else res.send(JSON.stringify(result));
  });
});

app.post("/deleteTodos", (req, res) => {
  const { email, id } = req.body;

  const sql =
    "DELETE FROM todo WHERE id=" + id + " AND id_user='" + email + "'";
  query(sql, (error, result) => {
    error ? console.log(error) : res.sendStatus(200);
  });
});

app.post("/deleteCategory", (req, res) => {
  const { email, id } = req.body;

  if (id <= 4) {
    res.sendStatus(403);
    return;
  }

  const todoMsg =
    "DELETE FROM todo WHERE id_category=" + id + " AND id_user='" + email + "'";
  query(todoMsg, (error, result) => {
    if (error) {
      console.log(error);
      return;
    }

    const categoryMsg =
      "DELETE FROM categories WHERE id=" + id + " AND id_user='" + email + "'";
    query(categoryMsg, (error, result) => {
      error ? console.log(error) : res.sendStatus(200);
    });
  });
});

app.post("/updateTodos", (req, res) => {
  const { email, id, value } = req.body;

  const sql =
    "UPDATE todo SET done=" +
    value +
    " WHERE id=" +
    id +
    " AND id_user='" +
    email +
    "'";

  query(sql, (error, result) => {
    error ? console.log(error) : res.sendStatus(200);
  });
});

app.get("/getCookies", (req, res) => {
  if (!req.cookies.username && !req.cookies.usermail) {
    res.sendStatus(404);
    return;
  }

  console.log(req.cookies);

  res.send(
    JSON.stringify({
      username: req.cookies.username,
      usermail: req.cookies.usermail,
    })
  );
});

app.get("/deleteCookies", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("usermail");

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
