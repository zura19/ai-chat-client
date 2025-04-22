import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import InputComp from "./InputComp";
import { RegisterSchemaType, registerSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import useRegister from "@/hooks/useRegister";

export default function RegisterForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { register } = useRegister();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterSchemaType) {
    const data = await register(values);
    console.log(data);
    if (data && data.error) return;
    closeModal();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <InputComp
          name="email"
          label="Email"
          placeholder="JohnDoe@example.com"
          control={form.control}
        />

        <InputComp
          name="name"
          label="Name"
          placeholder="John Doe"
          control={form.control}
        />

        <InputComp
          name="password"
          label="Password"
          placeholder="password"
          control={form.control}
        />

        <Button type="submit" variant={"secondary"}>
          {form.formState.isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
