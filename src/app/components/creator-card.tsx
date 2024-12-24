"use client"

import Image from "next/image"

import { useCreatorProfile } from "@/lib/hooks/use-creator-profile"

interface CreatorCardProps {
  address: `0x${string}`
  onDonateClick: (creator: {
    address: `0x${string}`
    name: string
    bio: string
    avatar: string
  }) => void
}

export function CreatorCard({ address, onDonateClick }: CreatorCardProps) {
  const { profile, isPending } = useCreatorProfile(address)

  if (isPending) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg animate-pulse">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full" />
        </div>
        <div className="h-6 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded mb-4" />
        <div className="flex justify-center space-x-4">
          <div className="h-10 w-20 bg-gray-200 rounded" />
          <div className="h-10 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-center mb-4">
        <Image
          src={profile.avatar || "https://via.placeholder.com/100"}
          alt={profile.name}
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <h2 className="text-xl font-semibold text-center mb-2">
        {profile.name || "Unnamed Creator"}
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        {profile.bio || "No bio available"}
      </p>
      <div className="flex justify-center space-x-4 mt-6">
        <button
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={() => onDonateClick(profile as any)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-purple-700 hover:text-white hover:border-purple-700 transition"
        >
          Donate
        </button>
      </div>
    </div>
  )
}
