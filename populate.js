import { readFile } from 'fs/promises'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connect.js'
import Job from './models/Job.js'

export const start = async () => {
  console.log(`om`)
  try {
    await connectDB(process.env.MONGO_URL)
    console.log(`1`)
    await Job.deleteMany()
    const jsonProducts = JSON.parse(
      await readFile(new URL('./mock-data.json', import.meta.url))
    )
    await Job.create(jsonProducts)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}