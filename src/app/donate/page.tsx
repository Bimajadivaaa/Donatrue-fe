"use client"

import { CREATOR_FACTORY_ADDRESS } from "@/config/consts"
import { CREATOR_FACTORY_CONTRACT_ABI } from "@/config/consts"
import { config } from "@/config/wagmi"
import { useState } from "react"
import { toast } from "sonner"
import { useConnect, useReadContract } from "wagmi"

import { CreatorCard } from "@/app/components/creator-card"
import { ConfirmDonationModal } from "@/app/donate/components/confirm-donation"

import { useCreatorFactory } from "@/lib/hooks/use-creator-factory"
import { useWallet } from "@/lib/hooks/use-wallet"

interface Creator {
  address: `0x${string}`
  name: string
  bio: string
  avatar: string
}

export default function Donate() {
  const { address: currentUserAddress } = useWallet()
  const { data: creatorContractAddress } = useReadContract({
    address: CREATOR_FACTORY_ADDRESS,
    abi: CREATOR_FACTORY_CONTRACT_ABI,
    functionName: "getCreatorContract",
    args: [currentUserAddress!],
    query: {
      retry: 100,
      retryDelay: 2000,
      enabled: !!currentUserAddress
    }
  })

  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null)
  const { allCreators, isLoadingCreators } = useCreatorFactory()
  const { isConnected } = useWallet()
  const { connect } = useConnect()

  const handleDonateClick = (creator: Creator) => {
    if (!isConnected) {
      toast.error("Please connect your wallet to donate")
      connect({
        connector: config.connectors[0]
      })
      return
    }
    console.log("@creator", creator)
    setSelectedCreator(creator)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedCreator(null)
  }

  if (isLoadingCreators) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading creators...</div>
      </div>
    )
  }

  console.log("@allCreators", allCreators)

  return (
    <main>
      <section className="bg-gradient-to-b from-gray-100 to-white min-h-screen px-8 py-12">
        <h1 className="text-center text-black text-4xl font-bold mb-6">
          Donate to your favorite creator!
        </h1>

        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search your creator..."
            className="text-black w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-black">
          {allCreators
            ?.filter((address) => !address.includes(creatorContractAddress!))
            ?.map((address) => (
              <CreatorCard
                key={address}
                address={address}
                onDonateClick={handleDonateClick}
              />
            ))}
        </div>
      </section>

      {isModalOpen && selectedCreator && (
        <ConfirmDonationModal
          isOpen={isModalOpen}
          creator={selectedCreator}
          onClose={handleCloseModal}
        />
      )}
    </main>
  )
}
