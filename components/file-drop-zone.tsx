import { useRef, useEffect, useId } from "react";

interface Props {
  onDrop: (files: FileList) => void;
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
  return (
    <>
      <input id={`file-${id}`} type="file" style={{ display: "none" }} />
      <label htmlFor={`file-${id}`}>
        <div
          ref={drop}
          className="rounded-md border border-input flex justify-center items-center h-full"
        >
          {!!error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <p className="opacity-60">
              {!!text ? text : "Drop your files here"}
            </p>
          )}
        </div>
      </label>
    </>
  );
}
