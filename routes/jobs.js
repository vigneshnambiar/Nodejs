const express = require('express')
const router = express.Router()

const {getAlljobs,getJob,createJob,updateJob,deleteJobs} = require('../controllers/jobs')

router.get('/',getAlljobs)
router.get('/:id',getJob)
router.post('/',createJob)
router.patch('/:id',updateJob)
router.delete('/:id',deleteJobs)

module.exports = router