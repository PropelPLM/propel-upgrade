/**
 * base class for the metadata deployment jobs
 */
class Job {

  constructor(connection, dataObj) {
    this.connection = connection;
    this.dataObj = dataObj;
  }

  // implement execute in your extended command classes
  execute() {}
}

module.exports = Job
