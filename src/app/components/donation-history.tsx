"use client"

import { formatEther } from "viem"

import { useDonations } from "@/lib/hooks/use-donations"

interface DonationHistoryProps {
  creatorAddress: `0x${string}`
  isOwner: boolean
}

export function DonationHistory({ creatorAddress }: DonationHistoryProps) {
  const { donations, isLoading, fetchNextPage, hasNextPage } =
    useDonations(creatorAddress)

  if (isLoading) {
    return <div>Loading donations...</div>
  }

  if (!donations.length) {
    return <div>No donations yet.</div>
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Donation History</h3>
      <div className="space-y-4">
        {donations
          ?.sort((a, b) => b.timestamp - a.timestamp)
          .map((donation, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">
                    From: {donation.donator}
                  </div>
                  <div className="mt-1 font-medium">
                    {formatEther(donation.amount)} ETH
                  </div>
                  <div className="mt-2 text-sm">{donation.message}</div>
                  <div className="mt-1 text-xs text-gray-500">
                    {new Date(
                      Number(donation.timestamp) * 1000
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="w-full rounded-lg border p-2 text-sm hover:bg-gray-50"
        >
          Load More
        </button>
      )}
    </div>
  )
}
