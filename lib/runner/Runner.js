class Runner {

  constructor() {
    this.jobs = [];
  }

  addJob(jobObj) {
    this.jobs.push(jobObj);
  }

  executeJobs() {
    this.jobs.forEach((job) => {
      job.execute();
    });

    // this is to clear the job queue once all is commpleted
    this.jobs = [];
  }
}

module.exports = Runner
