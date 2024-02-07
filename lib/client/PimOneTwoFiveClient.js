const PicklistJob = require('../job/PicklistJob');
const Runner = require('../runner/Runner');
const SfdcConnection = require('../connection/SfdcConnection');
const workorder = require('../../work/pim-1-25.json');


class PimOneTwoFiveClient {

  constructor(req, res) {
    const {
      isTest,
      user
    } = req.body;

    this.sfdcConnection;
    this.isTest = isTest;
    this.user = user;

    this.start();
  }

  async start() {
    console.log('calling connect');
    await this.connect();
    console.log('finished connect');
    
    console.log('calling process');
    await this.process();
    console.log('finished process');

    console.log('calling log');
    //await this.sfdcConnection.log.sendReport();
    console.log('finished logging');
  }

  async connect() {
    this.sfdcConnection = new SfdcConnection(this.isTest, this.user);
    await this.sfdcConnection.connect();
  }

  async process() {
    const jobObj = JSON.parse(JSON.stringify(workorder));
    const theRunner = new Runner();

    Object.keys(jobObj).forEach((key) => {

      if (key === 'picklists') {
        jobObj[key].forEach((picklist) => {
          theRunner.addJob(new PicklistJob(
            this.sfdcConnection.connection,
            picklist
          ));
        });
      }
    });

    // process
    theRunner.executeJobs();
  }
}

module.exports = PimOneTwoFiveClient
