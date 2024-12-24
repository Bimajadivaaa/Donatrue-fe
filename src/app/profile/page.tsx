"use client"

import { CREATOR_CONTRACT_ABI } from "@/config/consts"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { formatEther } from "viem"
import { useReadContract } from "wagmi"

import { Button } from "@/components/ui/button"

import { useCreator } from "@/lib/hooks/use-creator"
import { cn } from "@/lib/utils"

export default function Profile() {
  const { name, links, avatar, bio } = useCreator()

  const { creatorAddress } = useCreator()

  const { data: donations } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "getDonations",
    args: [BigInt(0), BigInt(10)],
    query: {
      enabled: !!creatorAddress,
      refetchInterval: 1000
    }
  })

  console.log("@donations", donations)

  const {
    acceptDonation,
    burnDonation,
    isLoadingAcceptDonation,
    isLoadingBurnDonation
  } = useCreator()

  const handleAccept = async (donationId: bigint) => {
    try {
      acceptDonation(donationId, creatorAddress!)
      toast.success("Approve transaction on your wallet")
    } catch (error) {
      console.error("Failed to accept donation:", error)
      toast.error("Failed to accept donation. Please try again.")
    }
  }

  const handleBurn = async (donationId: bigint) => {
    try {
      burnDonation(donationId, creatorAddress!)
      toast.success("Approve transaction on your wallet")
    } catch (error) {
      console.error("Failed to burn donation:", error)
      toast.error("Failed to burn donation. Please try again.")
    }
  }

  return (
    <main>
      <section className="bg-gradient-to-b from-gray-100 to-white min-h-screen px-8 py-12">
        <h1 className="text-center text-black text-2xl font-semibold mb-6">
          Your Profile
        </h1>

        <div className=" flex flex-col items-center justify-center text-center mb-10">
          <Image
            src={avatar ?? "https://via.placeholder.com/150"}
            alt="Sena Gacor"
            width={100}
            height={100}
            className="rounded-full mx-auto mb-4"
          />
          <p className="text-lg font-medium text-black">{name}</p>
          <p className="text-sm text-black">{bio}</p>
          {links &&
            links?.map((x) => (
              <div key={x.url}>
                <a
                  href={x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-purple-600"
                >
                  {x.label}
                </a>
              </div>
            ))}
          <div className="hover:bg-slate-100 mt-4 flex items-center justify-center max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none text-black">
            <Link href="/profile/edit-profile">Edit Profile</Link>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search Donator Name..."
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none text-black"
          />
        </div>

        <div>
          <h3 className="text-black text-xl font-bold mb-4">
            Donation History
          </h3>
          <div className="overflow-x-auto">
            <div className="mt-4 space-y-4">
              {donations?.[0]?.map((donation, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="mt-1 text-xs text-gray-500">
                      <p className="text-sm text-gray-500">
                        From: {donation.donator}
                      </p>
                      <p className="text-xs text-cyan-700">
                        {new Date(
                          Number(donation.timestamp) * 1000
                        ).toLocaleString()}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatEther(donation.amount)} ETH
                    </p>
                  </div>
                  <p className="my-2">{donation.message}</p>
                  {donation.isAccepted || donation.isBurned ? (
                    <p className="text-sm">
                      Status:{" "}
                      <span
                        className={cn(
                          donation.isAccepted
                            ? "text-green-500"
                            : "text-red-500"
                        )}
                      >
                        {donation.isAccepted ? "Accepted" : "Burned"}
                      </span>
                    </p>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAccept(BigInt(index))}
                        variant="default"
                        size="sm"
                        disabled={isLoadingAcceptDonation}
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleBurn(BigInt(index))}
                        variant="destructive"
                        size="sm"
                        disabled={isLoadingBurnDonation}
                      >
                        Burn
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
