"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { parseEther } from "viem"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { useWallet } from "@/lib/hooks/use-wallet"

const donationSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message is too long")
})

type DonationSchema = z.infer<typeof donationSchema>

export function DonationFormDialog() {
  const { isConnected } = useWallet()
  const { creatorAddress } = useCreator()
  const { donate, isLoadingDonate, isLoadingInfo, donateError } = useCreator()

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
      donate(values.message, amountInWei, creatorAddress!)
      form.reset()
      toast.success("Donation sent successfully!")
    } catch (error) {
      console.error("Failed to donate:", error)
      toast.error(donateError?.message || "Failed to donate. Please try again.")
    }
  }

  if (!isConnected) {
    return (
      <div className="rounded-lg border p-6">
        <p className="text-center text-gray-500">
          Please connect your wallet to donate
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-xl font-semibold">Make a Donation</h3>

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

          <Button
            type="submit"
            className="w-full"
            disabled={isLoadingDonate || isLoadingInfo}
          >
            {isLoadingDonate || isLoadingInfo ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Donate"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
