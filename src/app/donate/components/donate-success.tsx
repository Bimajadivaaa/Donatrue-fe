"use client"

interface DonateSuccessProps {
  onClose: () => void
}

export function DonateSuccess({ onClose }: DonateSuccessProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-black w-full max-w-md p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Donation Success!</h1>
        <p className="mb-6">
          <span>Check </span>
          <a
            href="https://etherscan.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 underline hover:text-purple-800"
          >
            here
          </a>
          <span> to see your transaction hash.</span>
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-200 transition"
        >
          Close
        </button>
      </div>
    </div>
  )
}
