"use client"

import {
  CREATOR_FACTORY_ADDRESS,
  CREATOR_FACTORY_CONTRACT_ABI
} from "@/config/consts"
import { formatDistanceToNow } from "date-fns"
import { formatEther } from "viem"
import { useAccount, useReadContract } from "wagmi"

export default function History() {
  const { address } = useAccount()
  console.log("@address", address)
  const { data: userDonations } = useReadContract({
    abi: CREATOR_FACTORY_CONTRACT_ABI,
    address: CREATOR_FACTORY_ADDRESS,
    functionName: "getDonationsByDonator",
    args: [address as `0x${string}`, 0n, 100n],
    query: {
      enabled: !!address,
      refetchInterval: 1000
    }
  })

  console.log(userDonations)

  return (
    <main>
      <section className="bg-gradient-to-b from-gray-100 to-white min-h-screen px-8 py-12">
        <h1 className="text-center text-black text-4xl font-bold mb-6">
          Track your creator donation
        </h1>
        {/* 
        <div className="text-center mb-10">
          <h2 className="text-xl font-semibold text-black mb-4">
            Donation history
          </h2>
          {avatar && (
            <Image
              src={avatar}
              alt={name || "Creator"}
              width={100}
              height={100}
              className="rounded-full mx-auto mb-4"
            />
          )}
          <p className="text-lg font-medium text-black">
            {name || "Unnamed Creator"}
          </p>
          <p className="text-sm text-gray-500">{creatorAddress}</p>
        </div> */}

        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th className="px-4 py-2 text-left text-black">Creator</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {userDonations?.[0]
                ?.toSorted((a, b) => b.timestamp - a.timestamp)
                .map((donation, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } hover:bg-gray-50`}
                  >
                    <td className="border px-4 py-2 text-black">
                      {donation.creator}
                    </td>
                    <td className="border px-4 py-2 text-black">
                      {formatEther(donation.amount)} ETH
                    </td>
                    <td className="border px-4 py-2 text-black">
                      {donation.message}
                    </td>
                    <td className="border px-4 py-2 text-black">
                      {formatDistanceToNow(
                        new Date(Number(donation.timestamp) * 1000),
                        {
                          addSuffix: true
                        }
                      )}
                    </td>
                    <td
                      className={`border px-4 py-2 font-medium ${
                        donation.isAccepted
                          ? "text-green-500"
                          : donation.isBurned
                            ? "text-red-500"
                            : "text-yellow-500"
                      }`}
                    >
                      {donation.isAccepted
                        ? "Accepted"
                        : donation.isBurned
                          ? "Burned"
                          : "Pending"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
