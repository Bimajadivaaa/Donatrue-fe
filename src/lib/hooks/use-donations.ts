import { CREATOR_CONTRACT_ABI } from "@/config/consts"
import { useCallback, useEffect, useState } from "react"
import { useReadContract } from "wagmi"

interface Donation {
  donator: `0x${string}`
  amount: bigint
  message: string
  timestamp: number
  isAccepted: boolean
  isBurned: boolean
}

const PAGE_SIZE = 10

export function useDonations(creatorAddress: `0x${string}`) {
  const [donations, setDonations] = useState<Donation[]>([])
  const [offset, setOffset] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { data: donationsData, isLoading: isLoadingDonations } =
    useReadContract({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "getDonations",
      args: [BigInt(offset), BigInt(PAGE_SIZE)],
      query: {
        refetchInterval: 1000,
        enabled: !!creatorAddress
      }
    })

  const { data: donationsCount } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "getDonationsCount",
    query: {
      refetchInterval: 1000,
      enabled: !!creatorAddress
    }
  })

  useEffect(() => {
    if (donationsData) {
      const [newDonations, total] = donationsData
      setDonations((prev) => [...prev, ...newDonations])
      setHasNextPage(offset + PAGE_SIZE < Number(total))
      setIsLoading(false)
    }
  }, [donationsData, offset])

  const fetchNextPage = useCallback(() => {
    if (hasNextPage) {
      setOffset((prev) => prev + PAGE_SIZE)
    }
  }, [hasNextPage])

  return {
    donations,
    isLoading: isLoading || isLoadingDonations,
    hasNextPage,
    fetchNextPage,
    donationsCount
  }
}
