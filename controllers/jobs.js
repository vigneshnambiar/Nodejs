const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')

const getAlljobs = async (req,res)=> {
    const job = await Job.find({createdBy:req.user.userID})
    res.status(StatusCodes.OK).json({job})
}

const getJob = async (req,res)=> {
    //const job = req.params.id
    //console.log(job)
    const job = await Job.findOne({_id:req.params.id,createdBy:req.user.userID})
    if(!job){
        throw new BadRequestError('Item donot exist')
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req,res)=> {
    //console.log(req.user);
    req.body.createdBy = req.user.userID
    //console.log(req.body)
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
    //res.status(StatusCodes.CREATED).json(req.body)
}

const updateJob = async (req,res)=> {
    const {company, position } = req.body
    
      if (company === '' || position === '') {
        throw new BadRequestError('Company or Position fields cannot be empty')
      }
      const job = await Job.findByIdAndUpdate(
        { _id: req.params.id, createdBy: req.user.userID },
        req.body,
        { new: true, runValidators: true }
      )
      if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
      }
      res.status(StatusCodes.OK).json({ job })
    }

const deleteJobs = async (req,res)=> {
    const job = await Job.deleteOne({_id:req.params.id,createdBy:req.user.userID})
    res.status(StatusCodes.OK).json({msg:`Successfully deleted the item ${req.params.id}`})
}

module.exports = {
    getAlljobs,getJob,createJob,updateJob,deleteJobs
}