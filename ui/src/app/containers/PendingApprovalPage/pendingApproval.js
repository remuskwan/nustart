import { useHistory } from "react-router"

export default function PendingApprovalPage() {
  const history = useHistory()
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://nustart.s3.ap-southeast-1.amazonaws.com/nustartlogo.png"
          alt="Workflow"
        />

      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2>
            Staff account is pending approval, please wait.
          </h2>
          <button
            className="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            onClick={() => history.push('/')}
          >
            Back to sign in
          </button>
        </div>
      </div>
    </div>
  )
}