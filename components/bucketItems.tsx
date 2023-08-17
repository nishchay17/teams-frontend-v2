"use client";

import Image from "next/image";
import Link from "next/link";

import useBucketItems from "@/hooks/useBucketItems";
import { Skeleton } from "./ui/skeleton";
import { Links } from "@/config/links";

type Props = {};
type BucketItem = {
  description: string;
  name: string;
  file: string;
  uploadedBy: {
    name: string;
  };
  _id: string;
};

export default function BucketItems({}: Props) {
  const allBucketItems = useBucketItems();
  if (allBucketItems.isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4 my-7">
        {Array(6)
          .fill(1)
          .map((_, i) => (
            <div className="bg-secondary/70 p-3" key={i}>
              <Skeleton className="h-[160px]" />
              <Skeleton className="my-1">Loading Title</Skeleton>
              <Skeleton className="text-sm mb-2">Loading description</Skeleton>
              <Skeleton className="mt-auto text-[0.65rem] w-fit px-2 py-1 ml-auto">
                Loading author
              </Skeleton>
            </div>
          ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-4 my-7">
      {allBucketItems.data.bucketItems.map(
        (
          { description, name, file, uploadedBy, _id }: BucketItem,
          i: number
        ) => (
          <Link
            href={`${Links.bucket.href}/${_id}`}
            className="flex flex-col"
            key={i}
          >
            <div className="bg-secondary/70 p-3 rounded flex flex-col cursor-pointer h-full">
              <Image
                className="w-full h-[150px] object-cover"
                alt={name}
                src={file}
                width="160"
                height="100"
              />
              <p className="my-1">{name}</p>
              <p className="text-sm mb-2">{description}</p>
              <p className="mt-auto text-[0.65rem] w-fit px-2 py-1 rounded-lg ml-auto bg-gray-200 text-black">
                Uploaded by {uploadedBy.name}
              </p>
            </div>
          </Link>
        )
      )}
    </div>
  );
}
