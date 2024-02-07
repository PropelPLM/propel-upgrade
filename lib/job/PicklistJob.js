/**
  {
    "fieldName": "PIM__Type__c",
    "newValues": [ "Richtext" ],
    "sobjectName": "PIM__Attribute_Label__c"
  }
 */

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

  // todo: figure this out for some reason I don't know what object to send to this API and google is not helping.
  execute() {
    this.connection.conn.metadata.update(
      'CustomField',
      {
        fullName: `${this.dataObj.sobjectName}.${this.dataObj.fieldName}`,
        type: 'PICKLIST',
        // default: false,
        // isActive: true,
        label: 'Type Test'
      },
      (err, results) => {
        if (err) { console.log(err); }
        
        console.log(results);
    });
  }
}

module.exports = PicklistJob
