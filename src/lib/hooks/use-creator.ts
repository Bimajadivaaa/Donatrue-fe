import {
  CREATOR_CONTRACT_ABI,
  CREATOR_FACTORY_ADDRESS,
  CREATOR_FACTORY_CONTRACT_ABI
} from "@/config/consts"
import { useReadContract, useWriteContract } from "wagmi"

import { useWallet } from "./use-wallet"

export function useCreator() {
  const { address: currentUserAddress } = useWallet()
  const { data: creatorAddress } = useReadContract({
    address: CREATOR_FACTORY_ADDRESS,
    abi: CREATOR_FACTORY_CONTRACT_ABI,
    functionName: "getCreatorContract",
    args: [currentUserAddress!],
    query: {
      refetchInterval: 1000,
      enabled: !!currentUserAddress
    }
  })

  // Read contract state
  const { data: creatorInfo, isLoading: isLoadingInfo } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "getContractBalance",
    query: {
      refetchInterval: 1000,
      enabled: !!creatorAddress
    }
  })

  const { data: donationsCount, isLoading: isLoadingCount } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "getDonationsCount",
    query: {
      refetchInterval: 1000,
      enabled: !!creatorAddress
    }
  })

  const { data: name } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "name",
    query: {
      refetchInterval: 1000,
      enabled: !!creatorAddress
    }
  })

  const { data: bio } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "bio",
    query: {
      refetchInterval: 1000,
      enabled: !!creatorAddress
    }
  })

  const { data: avatar } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "avatar",
    query: {
      refetchInterval: 1000,
      enabled: !!creatorAddress
    }
  })

  const { data: links } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "getLinks",
    args: [0n, 100n],
    query: {
      refetchInterval: 1000,
      enabled: !!creatorAddress
    }
  })

  // Write operations
  const { writeContract, isPending, error: donateError } = useWriteContract()

  const donate = (message: string, amount: bigint, ca: `0x${string}`) => {
    if (!ca) return
    writeContract({
      address: ca,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "donate",
      args: [message],
      value: amount
    })
  }

  const acceptDonation = (donationId: bigint, ca: `0x${string}`) => {
    if (!ca) return
    writeContract({
      address: ca,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "acceptDonation",
      args: [donationId]
    })
  }

  const burnDonation = (donationId: bigint, ca: `0x${string}`) => {
    if (!ca) return
    writeContract({
      address: ca,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "burnDonation",
      args: [donationId]
    })
  }

  const updateBio = async (newBio: string, ca: `0x${string}`) => {
    if (!ca) return
    writeContract({
      address: ca,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "updateBio",
      args: [newBio]
    })
  }

  const updateAvatar = (newAvatar: string, ca: `0x${string}`) => {
    if (!ca) return
    writeContract({
      address: ca,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "updateAvatar",
      args: [newAvatar]
    })
  }

  const addLink = async (
    newLink: { url: string; label: string }[] | undefined,
    ca: `0x${string}`
  ) => {
    if (!ca || !newLink) return
    for await (const link of newLink) {
      writeContract({
        address: ca,
        abi: CREATOR_CONTRACT_ABI,
        functionName: "addLink",
        args: [link.url, link.label]
      })
    }
  }

  const removeLink = (index: bigint, ca: `0x${string}`) => {
    if (!ca) return
    writeContract({
      address: ca,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "removeLink",
      args: [index]
    })
  }

  return {
    // Contract state
    balance: creatorInfo?.[0] || 0n,
    pendingAmount: creatorInfo?.[1] || 0n,
    donationsCount: Number(donationsCount || 0),
    bio,
    avatar,
    isLoadingInfo: isLoadingInfo,
    isLoadingDonate: isPending,
    isLoadingAcceptDonation: isPending,
    isLoadingBurnDonation: isPending,
    isLoadingUpdateBio: isPending,
    isLoadingUpdateAvatar: isPending,
    isLoadingAddLink: isPending,
    isLoadingRemoveLink: isPending,
    name,
    links: links?.[0] || ([] as { url: string; label: string }[]),
    creatorAddress,
    isLoadingCount,

    // Write operations
    donate,
    acceptDonation,
    burnDonation,
    updateBio,
    updateAvatar,
    addLink,
    removeLink,
    donateError
  }
}
