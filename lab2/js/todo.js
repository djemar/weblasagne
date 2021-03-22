"use strict";

function Task(id, description, urgent = false, priv = true, deadline = undefined) {
  this.id = id;
  this.description = description;
  this.urgent = urgent;
  this.priv = priv;
  this.deadline = deadline;
}

function TaskList() {
  this.list = [];
  //ADD
  this.add = (task) => {
    this.list.push(task);
  };

  //sortAndPrint
  this.sortAndPrint = () => {
    [...this.list].sort((a, b) => (a.deadline.isAfter(dayjs(b.deadline)) ? 1 : -1));
    console.log(this.list);
  };
  //filterAndPrint
  this.filterAndPrint = () => {
    this.list.filter((task) => task.urgent == false);
    console.log(this.list);
  };
}

const tasks = new TaskList();
const lab = new Task(2, "monday lab", false, false, "2021-03-16");
const call = new Task(3, "phone call", true, false, "2021-03-08");
const laundry = new Task(1, "laundry");

tasks.add(call);
tasks.add(lab);
tasks.add(laundry);
tasks.sortAndPrint();
const myTasks = tasks.getTaskList();

console.log(myTasks);
