"use client"

import { CREATOR_FACTORY_ADDRESS } from "@/config/consts"
import { CREATOR_FACTORY_CONTRACT_ABI } from "@/config/consts"
import Link from "next/link"
import { useReadContract } from "wagmi"

import { buttonVariants } from "@/components/ui/button"

import { useWallet } from "@/lib/hooks/use-wallet"

import RegisterFormDialog from "./register-form-dialog"

export function Hero() {
  const { address, isConnected } = useWallet()

  const { data: creatorContractAddress } = useReadContract({
    address: CREATOR_FACTORY_ADDRESS,
    abi: CREATOR_FACTORY_CONTRACT_ABI,
    functionName: "getCreatorContract",
    args: [address!],
    query: {
      retry: 100,
      retryDelay: 2000,
      enabled: !!address
    }
  })

  console.log(creatorContractAddress, address, isConnected)

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-4xl md:text-4xl font-bold text-black text-center mb-4">
        Welcome to the Web3 Donation Platform!
      </h1>

      <p className="text-lg md:text-xl text-gray-600 mb-8 text-center">
        Experience a new era of giving with security, transparency, and
        decentralization. 
      </p>

      <div className="flex space-x-4">
        <Link
          href="/donate"
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          Explore
        </Link>
        {isConnected &&
        (creatorContractAddress ==
          "0x0000000000000000000000000000000000000000" ||
          !creatorContractAddress) ? (
          <RegisterFormDialog />
        ) : creatorContractAddress &&
          creatorContractAddress !=
            "0x0000000000000000000000000000000000000000" ? (
          <Link
            href="/profile"
            className={buttonVariants({ size: "lg", variant: "default" })}
          >
            Profile
          </Link>
        ) : null}
      </div>
    </section>
  )
}
