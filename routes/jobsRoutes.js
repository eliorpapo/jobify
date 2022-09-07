import express from 'express'
const router = express.Router()

import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
} from '../controllers/jobsController.js'

router.route('/').get(getAllJobs)
router.route('/').post(createJob)

router.route('/stats').get(showStats)

router.route('/:id').put(updateJob)
router.route('/:id').delete(deleteJob)

export default router
