"use strict";

const dayjs = require("dayjs"); //per importare la tabella, la si salva in una variabile
const sqlite = require("sqlite3");

function Task(id, description, urgent = false, priv = true, deadline = undefined) {
  this.id = id;
  this.description = description;
  this.urgent = urgent;
  this.priv = priv;
  this.deadline = deadline;
}

function TaskList() {
  //creazione database
  const db = new sqlite.Database("tasks.db", (err) => {
    if (err) throw err;
  });
  this.getTaskList = (task) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM  tasks";
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else {
          //console.log(rows);
          const taskList = rows.map((row) => new Task(row.id, row.description, row.urgent, row.private, row.deadline));
          //console.log(taskList);
          resolve(taskList);
        }
      });
    });
  };

  this.getTaskAfter = (deadline) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM  tasks WHERE deadline > ?";
      db.all(sql, [deadline], (err, rows) => {
        if (err) reject(err);
        else {
          //console.log(rows);
          const taskList = rows.map((row) => new Task(row.id, row.description, row.urgent, row.private, row.deadline));
          //console.log(taskList);
          resolve(taskList);
        }
      });
    });
  };

  this.find = (word) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM  tasks WHERE description LIKE '%' || ? || '%'";
      db.all(sql, [word], (err, rows) => {
        if (err) reject(err);
        else {
          //console.log(rows);
          const taskList = rows.map((row) => new Task(row.id, row.description, row.urgent, row.private, row.deadline));
          //console.log(taskList);
          resolve(taskList);
        }
      });
    });
  };
}

const main = async () => {
  const tasks = new TaskList();
  const myTasks = await tasks.getTaskList();
  const myTasksAfter = await tasks.getTaskAfter("2021-03-01");
  const myTasksFound = await tasks.find("phone");
  console.log(myTasks);
  console.log("AFTER");
  console.log(myTasksAfter);
  console.log("FOUND");
  console.log(myTasksFound);
};

main();
