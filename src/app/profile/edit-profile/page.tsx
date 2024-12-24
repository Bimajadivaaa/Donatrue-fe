"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
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

const editProfileSchema = z.object({
  name: z.string(),
  avatar: z.string().url("Must be a valid URL"),
  bio: z.string().min(1, "Bio is required").max(500, "Bio is too long"),
  links: z.array(
    z.object({
      url: z.string().url("Must be a valid URL"),
      label: z.string().min(1, "Label is required")
    })
  )
})

type EditProfileSchema = z.infer<typeof editProfileSchema>

export default function EditProfile() {
  const {
    name,
    links,
    avatar,
    bio,
    updateBio,
    updateAvatar,
    addLink,
    removeLink,
    isLoadingUpdateBio,
    isLoadingUpdateAvatar,
    isLoadingAddLink,
    isLoadingRemoveLink,
    creatorAddress
  } = useCreator()

  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      avatar: "",
      bio: "",
      links: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: "links",
    control: form.control
  })

  useEffect(() => {
    if (name || avatar || bio || links) {
      form.reset({
        name: name || "",
        avatar: avatar || "",
        bio: bio || "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        links: (links as any) || []
      })
    }
  }, [name, avatar, bio, links, form])

  const onSubmit = async (values: EditProfileSchema) => {
    try {
      if (values.bio !== bio) await updateBio(values.bio, creatorAddress!)
      if (values.avatar !== avatar)
        await updateAvatar(values.avatar, creatorAddress!)

      // Handle links updates
      const currentLinks = links || []
      const newLinks = values.links || []

      // Find links to remove (exist in current but not in new)
      currentLinks.forEach((link, index) => {
        const exists = newLinks.some(
          (newLink) => newLink.url === link.url && newLink.label === link.label
        )
        if (!exists) {
          removeLink(BigInt(index), creatorAddress!)
        }
      })

      // Find links to add (exist in new but not in current)
      const linksToAdd = newLinks.filter(
        (newLink) =>
          !currentLinks.some(
            (currentLink) =>
              currentLink.url === newLink.url &&
              currentLink.label === newLink.label
          )
      )

      // Add new links
      if (linksToAdd.length > 0) {
        await addLink(linksToAdd, creatorAddress!)
      }

      toast.success("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile. Please try again.")
    }
  }

  const isLoading =
    isLoadingUpdateBio ||
    isLoadingUpdateAvatar ||
    isLoadingAddLink ||
    isLoadingRemoveLink

  return (
    <main>
      <section className="bg-gradient-to-b from-gray-100 to-white min-h-screen px-8 py-12">
        <h1 className="text-center text-black text-4xl font-bold mb-6">
          Edit Profile
        </h1>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={form.watch("avatar") || "/default-avatar.png"}
                    alt="Profile Picture"
                    width={128}
                    height={128}
                    className="rounded-full object-cover"
                  />
                </div>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avatar URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter avatar URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FormLabel>Links</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ url: "", label: "" })}
                  >
                    <Plus className="h-4 w-4" />
                    Add Link
                  </Button>
                </div>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`links.${index}.label`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="Label (e.g. YouTube)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`links.${index}.url`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write something about yourself..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-center">
                <Button
                  type="submit"
                  variant={isLoading ? "outline" : "default"}
                  size={isLoading ? "icon" : "lg"}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </main>
  )
}
