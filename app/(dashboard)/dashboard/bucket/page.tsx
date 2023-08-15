"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addBucketSchema } from "@/lib/validation/add-bucket";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FileDropzone from "@/components/file-drop-zone";
import useAddBucketItem from "@/hooks/useAddBucketItem";
import { useToast } from "@/components/ui/use-toast";
import BucketItems from "@/components/bucketItems";
import { useInvalidateBucketItems } from "@/hooks/useBucketItems";

type BucketItem = z.infer<typeof addBucketSchema>;

export default function BucketPage() {
  const [fileError, setFileError] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const addBucketItem = useAddBucketItem();
  const invalidateBucketItems = useInvalidateBucketItems();
  const { toast } = useToast();
  const form = useForm<BucketItem>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(addBucketSchema),
  });

  async function onSubmit(data: BucketItem) {
    setFileError("");
    if (!file) {
      setFileError("File is required");
      return;
    }
    addBucketItem.mutate(
      {
        ...data,
        file,
      },
      {
        onError: (error: unknown) => {
          console.error(error);
          toast({
            title: "Error while creating Bucket item",
            description: "Please check network connect and try again",
          });
        },
        onSuccess: (data) => {
          toast({
            title: data.status
              ? "Bucket item Created"
              : "Error while creating Bucket item",
            description: data.message,
          });
          if (!!data.status) {
            setFile(undefined);
            form.reset();
            invalidateBucketItems();
          }
        },
      }
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-2xl">Bucket</h2>
        <Button
          form="add-bucket-item"
          isLoading={addBucketItem.isLoading}
          type="submit"
        >
          Add file to bucket
        </Button>
      </div>
      <Form {...form}>
        <form id="add-bucket-item" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex-1 flex gap-4 flex-col">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        autoCapitalize="none"
                        autoCorrect="off"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-20 resize-none"
                        autoCapitalize="none"
                        autoCorrect="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FileDropzone
              onDrop={(files?: FileList) => {
                setFileError("");
                setFile(files?.item(0));
              }}
              text={file?.name}
              error={fileError}
            />
          </div>
        </form>
      </Form>
      <BucketItems />
    </>
  );
}
