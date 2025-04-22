import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import InputComp from "./InputComp";
import { loginSchema, LoginSchemaType } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import useLogin from "@/hooks/useLogin";

export default function LoginForm({ closeModal }: { closeModal: () => void }) {
  const { login } = useLogin();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchemaType) {
    const data = await login(values);
    if (!data.success) return;
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
          name="password"
          label="Password"
          placeholder="password"
          control={form.control}
        />
        <Button type="submit" variant={"secondary"}>
          {form.formState.isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
