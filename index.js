/* Your Code Here */
const createEmployeeRecord = function (array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = function (array) {
  return array.map((element) => createEmployeeRecord(element));
};

const createTimeInEvent = function (dateStamp) {
  let date = dateStamp.split(" ");

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(date[1], 10),
    date: date[0],
  });

  return this;
};

const createTimeOutEvent = function (dateStamp) {
  let date = dateStamp.split(" ");

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(date[1], 10),
    date: date[0],
  });

  return this;
};

const hoursWorkedOnDate = function (date) {
  let inDate = this.timeInEvents.find((e) => e.date === date);
  let outDate = this.timeOutEvents.find((e) => e.date === date);

  return (outDate.hour - inDate.hour) / 100;
};

const wagesEarnedOnDate = function (date) {
  let payOwed = hoursWorkedOnDate.call(this, date);

  return parseInt(payOwed * this.payPerHour, 10);
};

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

const findEmployeeByFirstName = function (collection, firstNameString) {
  return collection.find((data) => {
    if (data.firstName === firstNameString) {
      return data;
    } else {
      return undefined;
    }
  });
};

//allWagesFor() = sum of pay owed for 1 emp for all dates

//First, collect all the dates worked for each employee
//<= this shows the amount of pay owed for each employee
//Then, sum all the pay owed
const calculatePayroll = function (collection) {
  return collection.reduce(function (accum, emp) {
    return accum + allWagesFor.call(emp);
  }, 0);
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
