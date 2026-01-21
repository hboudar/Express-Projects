

const getAllJobs = (req, res) => {
  res.send("get all jobs");
};

const getJob = (req, res) => {
  res.send("get single job");
};

const createJob = (req, res) => {
  res.json(req.body);
};

const updateJob = (req, res) => {
  res.send("update job");
};

const deleteJob = (req, res) => {
  res.send("delete job");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};