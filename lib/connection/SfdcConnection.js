/**
 * SfdcConnect will need to be added to propel-sfdc-connect asap.
 * but for now this object will be the jsforce connection and the logging
 */

const { jwtSession } = require('@propelsoftwaresolutions/propel-sfdc-connect')
const propelConnect = require('@propelsoftwaresolutions/propel-sfdc-connect')

class SfdcConnection {

  constructor(isTest, user) {
    this.isTest = isTest;
    this.user = user;

    this.connection;
    this.log;
    this.response;
  }

  async connect() {

    try {
      this.response = await jwtSession({
        clientId: process.env.PIM_DATA_SERVICE_CLIENT_ID,
        isTest: this.isTest,
        privateKey: process.env.PIM_DATA_SERVICE_KEY.replace(/\\n/g, '\n'),
        user: this.user,
      });

      this.connection = propelConnect.newConnection(
        this.response.instance_url,
        this.response.access_token
      );

      this.log = propelConnect.newLog(this.connection);

    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = SfdcConnection
