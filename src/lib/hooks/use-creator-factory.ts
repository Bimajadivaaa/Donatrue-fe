import {
  CREATOR_FACTORY_ADDRESS,
  CREATOR_FACTORY_CONTRACT_ABI
} from "@/config/consts"
import { useReadContract, useWriteContract } from "wagmi"

export function useCreatorFactory() {
  const { data: creatorCount, isLoading: isLoadingCreatorCount } =
    useReadContract({
      address: CREATOR_FACTORY_ADDRESS,
      abi: CREATOR_FACTORY_CONTRACT_ABI,
      functionName: "creatorCount"
    })

  const { data: allCreators, isLoading: isLoadingCreators } = useReadContract({
    address: CREATOR_FACTORY_ADDRESS,
    abi: CREATOR_FACTORY_CONTRACT_ABI,
    functionName: "getAllCreators"
  })

  const {
    writeContract: registerCreator,
    isPending: isRegisterPending,
    error: registerCreatorError
  } = useWriteContract()

  const handleRegisterCreator = (
    name: string,
    bio: string,
    avatar: string,
    links: { url: string; label: string }[]
  ) => {
    registerCreator({
      address: CREATOR_FACTORY_ADDRESS,
      abi: CREATOR_FACTORY_CONTRACT_ABI,
      functionName: "registerCreator",
      args: [name, bio, avatar, links]
    })
  }

  return {
    // Read operations
    creatorCount: Number(creatorCount || 0),
    allCreators,
    isLoadingCreatorCount,
    isLoadingCreators,

    // Write operations
    registerCreator: handleRegisterCreator,
    isRegisterPending,
    registerCreatorError
  }
}
