"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { parseEther } from "viem"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useCreator } from "@/lib/hooks/use-creator"

interface Creator {
  address: `0x${string}`
  name: string
  bio: string
  avatar: string
}

interface ConfirmDonationModalProps {
  isOpen: boolean
  creator: Creator
  onClose: () => void
}

const donationSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message is too long")
})

type DonationSchema = z.infer<typeof donationSchema>

export function ConfirmDonationModal({
  isOpen,
  creator,
  onClose
}: ConfirmDonationModalProps) {
  console.log("@creator:confirm-donation.tsx:58", creator)
  const { donate, isLoadingDonate, donateError } = useCreator()

  const form = useForm<DonationSchema>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: "",
      message: ""
    }
  })

  const onSubmit = async (values: DonationSchema) => {
    try {
      const amountInWei = parseEther(values.amount)
      donate(values.message, amountInWei, creator.address)
      form.reset()
      toast.success("Approve your transaction in your wallet")
      onClose()
    } catch (error) {
      console.error("Failed to donate:", error)
      toast.error(donateError?.message || "Failed to donate. Please try again.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Donate to {creator.name}</DialogTitle>
          <DialogDescription>
            Support {creator.name} by making a donation.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (ETH)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.000000000000000001"
                      placeholder="0.1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a message to the creator..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoadingDonate}>
                {isLoadingDonate ? "Donating..." : "Donate"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
