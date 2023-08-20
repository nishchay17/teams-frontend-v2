"use client";

import Link from "next/link";
import Image from "next/image";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Links } from "@/config/links";
import useBucketItem from "@/hooks/useBucketItem";
import { capitalize } from "@/lib/utils";
import BucketItemDeleteDialog from "@/components/bucket-item-delete-dialog";

type Props = {
  params: {
    id: string;
  };
};

export default function BucketItem({ params: { id } }: Props) {
  const bucketItem = useBucketItem(id);
  const ArrowLeft = Icons["arrowLeft"];

  if (bucketItem.isLoading) {
    return <p>Loading</p>;
  }
  if (bucketItem.isError || !bucketItem.data.status) {
    return <p>Error</p>;
  }
  const bucketData = bucketItem.data.bucketItem;
  return (
    <>
      <div className="flex justify-between items-center">
        <Link href={Links.bucket.href}>
          <Button variant="outline">
            <ArrowLeft size="1rem" className="mr-2" />
            Back
          </Button>
        </Link>
        <BucketItemDeleteDialog
          bucketItem={bucketData}
          isLoading={bucketItem.isLoading}
        />
      </div>
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-2xl">{capitalize(bucketData.name)}</h2>
        <p className="text-sm opacity-75">
          Uploaded by: {bucketData.uploadedBy.name} <br />
          at <i>{new Date(bucketData.createdAt).toLocaleString()}</i>
        </p>
      </div>
      {!!bucketData.description ? (
        <p className="my-4">{capitalize(bucketData.description)}</p>
      ) : null}
      <Image
        src={bucketData.file}
        alt={bucketData.name}
        width="320"
        height="180"
      />
    </>
  );
}
