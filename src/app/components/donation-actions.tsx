"use client"

import { toast } from "sonner"
import { formatEther } from "viem"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

import { useCreator } from "@/lib/hooks/use-creator"

interface DonationActionsProps {
  donationId: bigint
  amount: bigint
  message: string
  isAccepted: boolean
  isBurned: boolean
  creatorAddress: `0x${string}`
}

export function DonationActions({
  donationId,
  amount,
  message,
  isAccepted,
  isBurned,
  creatorAddress
}: DonationActionsProps) {
  const {
    acceptDonation,
    burnDonation,
    isLoadingAcceptDonation,
    isLoadingBurnDonation
  } = useCreator()

  const handleAccept = async () => {
    try {
      await acceptDonation(donationId, creatorAddress)
      toast.success("Approve transaction on your wallet")
    } catch (error) {
      console.error("Failed to accept donation:", error)
      toast.error("Failed to accept donation. Please try again.")
    }
  }

  const handleBurn = async () => {
    try {
      await burnDonation(donationId, creatorAddress)
      toast.success("Approve transaction on your wallet")
    } catch (error) {
      console.error("Failed to burn donation:", error)
      toast.error("Failed to burn donation. Please try again.")
    }
  }

  if (isAccepted || isBurned) {
    return (
      <div className="text-sm">
        Status:{" "}
        <span className={isAccepted ? "text-green-500" : "text-red-500"}>
          {isAccepted ? "Accepted" : "Burned"}
        </span>
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-2">
          <Button
            onClick={handleAccept}
            variant="default"
            size="sm"
            disabled={isLoadingAcceptDonation}
          >
            Accept
          </Button>
          <Button
            onClick={handleBurn}
            variant="destructive"
            size="sm"
            disabled={isLoadingBurnDonation}
          >
            Burn
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to {isAccepted ? "accept" : "burn"} this
            donation?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium">Amount</div>
            <div>{formatEther(amount)} ETH</div>
          </div>
          <div>
            <div className="text-sm font-medium">Message</div>
            <div className="text-sm text-gray-500">{message}</div>
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose>Cancel</DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
