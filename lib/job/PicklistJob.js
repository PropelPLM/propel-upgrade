const Job = require('./Job');

class PicklistJob extends Job {

  /**
   *
   * @param {Object} connection the sfdc connection object 
   * @param {Object} dataObj picklist job structure
   */
  constructor(connection, dataObj) {
    super(connection, dataObj);
  }

  /**
   * Picklist Job will execute the metadata deployment call to sfdc to create
   * the new picklist values listed.
   */
  execute() {
    const picklists = [];

    this.dataObj.newValues.forEach((element) => {
      picklists.push({
        default: element.default,
        description: element.description,
        fullName: `${this.dataObj.sobjectName}.${this.dataObj.fieldName}.${element.apiName}`,
        isActive: element.isActive,
        label: element.label
      });
    });

    this.connection.conn.metadata.create(
      'CustomValue',
      picklists,
      (err, results) => {
        if (err) { console.log(err); }
        
        console.log(results);
    });
  }
}

module.exports = PicklistJob
