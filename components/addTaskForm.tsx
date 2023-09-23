import { UseFormReturn } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import FileDropzone from "@/components/file-drop-zone";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/Select";

type AddTaskProps = {
  form: UseFormReturn<any, any, undefined>;
  onSubmit: (data: FormData) => Promise<void>;
  getList: () => Promise<unknown>;
  handleFileChange: (file?: File) => void;
  file?: File;
  formName: string;
};

export default function AddTaskForm({
  form,
  onSubmit,
  getList,
  handleFileChange,
  file,
  formName,
}: AddTaskProps) {
  return (
    <Form {...form}>
      <form id={formName} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex-1 flex gap-4 flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
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
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned To</FormLabel>
                  <FormControl>
                    <Select
                      defaultOptions
                      isAsync
                      loadOptions={getList}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Select
                      options={[
                        {
                          label: "High",
                          value: "high",
                        },
                        {
                          label: "Medium",
                          value: "medium",
                        },
                        {
                          label: "Low",
                          value: "low",
                        },
                      ]}
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
            onDrop={(files?: FileList) =>
              handleFileChange(files?.[0] ?? undefined)
            }
            text={file?.name}
          />
        </div>
      </form>
    </Form>
  );
}
