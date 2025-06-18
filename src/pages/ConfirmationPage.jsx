import JobsNavbar from '../components/JobsNavbar'
import JobSuccess from '../components/JobSuccess'

const ConfirmationPage = ({jobId}) => {
    console.log(jobId)
  return (
    <div>
      <JobsNavbar/>
      <JobSuccess/>
    </div>
  )
}

export default ConfirmationPage
