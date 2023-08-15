import { useRef, useEffect, useId, useState } from "react";
import { Button } from "./ui/button";

interface Props {
  onDrop: (files?: FileList) => void;
  text?: string;
  error?: string;
}

export default function FileDropzone({
  text,
  onDrop,
  error = undefined,
}: Props) {
  const id = useId();
  const drop = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!!drop.current) {
      drop.current.addEventListener("dragover", handleDragOver);
      drop.current.addEventListener("drop", handleDrop);
    }
    return () => {
      drop?.current?.removeEventListener("dragover", handleDragOver);
      drop?.current?.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    if (files && files.length) {
      onDrop(files);
    }
  };

  const handleChange = (e: any) => {
    const { files } = e.target;
    if (files && files.length) {
      onDrop(files);
    }
  };

  return (
    <>
      <input
        id={`file-${id}`}
        multiple={false}
        type="file"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <label htmlFor={`file-${id}`}>
        <div
          ref={drop}
          className="rounded-md border border-input flex justify-center items-center h-full relative"
        >
          {!!error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <p className="opacity-60">
              {!!text ? text : "Drop your images here"}
            </p>
          )}
          <Button
            className="absolute right-1 bottom-1"
            type="button"
            onClick={() => onDrop(undefined)}
            size="sm"
            variant="ghost"
          >
            Remove
          </Button>
        </div>
      </label>
    </>
  );
}
