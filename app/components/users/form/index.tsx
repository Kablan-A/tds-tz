import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { USER_FORM_SCHEMA, type UserFormValues } from "~/lib/schemas/user";

type UserFormProps = {
  type?: "post" | "update";
  onSubmit: (data: UserFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
  defaultValues?: Partial<UserFormValues>;
};

export const UserForm = ({
  type = "post",
  onSubmit,
  isSubmitting = false,
  defaultValues,
}: UserFormProps) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(USER_FORM_SCHEMA),
    defaultValues: {
      firstName: defaultValues?.firstName || "",
      lastName: defaultValues?.lastName || "",
      email: defaultValues?.email || "",
      skillset: defaultValues?.skillset || "",
    },
    mode: "all",
  });

  const isDisabled =
    isSubmitting || !form.formState.isDirty || !form.formState.isValid;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skillset"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="JavaScript, React, TypeScript" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isDisabled}
          isLoading={isSubmitting}
        >
          {type === "post" ? "Add User" : "Update User"}
        </Button>
      </form>
    </Form>
  );
};
