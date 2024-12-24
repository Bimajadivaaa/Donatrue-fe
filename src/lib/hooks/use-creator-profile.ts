import { CREATOR_CONTRACT_ABI } from "@/config/consts"
import { useReadContract, useWriteContract } from "wagmi"

export interface CreatorLink {
  url: string
  label: string
}

export interface CreatorProfile {
  address: `0x${string}`
  name: string
  bio: string
  avatar: string
  links: CreatorLink[]
}

export function useCreatorProfile(creatorAddress: `0x${string}`) {
  // Read creator info
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

  // Write operations
  const { writeContract: write, isPending } = useWriteContract()

  const updateBio = async (newBio: string) => {
    if (!creatorAddress) return
    await write({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "updateBio",
      args: [newBio]
    })
  }

  const updateAvatar = async (newAvatar: string) => {
    if (!creatorAddress) return
    await write({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "updateAvatar",
      args: [newAvatar]
    })
  }

  const addLink = async (url: string, label: string) => {
    if (!creatorAddress) return
    await write({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "addLink",
      args: [url, label]
    })
  }

  const removeLink = async (index: number) => {
    if (!creatorAddress) return
    await write({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "removeLink",
      args: [BigInt(index)]
    })
  }

  return {
    profile: {
      address: creatorAddress,
      name: name || "",
      bio: bio || "",
      avatar: avatar || "",
      links: [] // Links will be managed separately due to array handling
    },
    actions: {
      updateBio,
      updateAvatar,
      addLink,
      removeLink
    },
    isPending
  }
}
