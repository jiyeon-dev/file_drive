import { z } from "zod";
import { toast } from "sonner";
import { Response } from "@/types";
import { MESSAGE } from "@/lib/message";
import { SignInSchema } from "./signIn";

// zod
export const SignUpSchema = z.object({
  ...SignInSchema.shape,
  name: z
    .string()
    .min(1, { message: "닉네임을 입력해주세요." })
    .max(6, { message: "6자 이하로 입력해주세요." }),
});

export const handler = async (
  data: z.infer<typeof SignUpSchema>
): Promise<boolean> => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as Response<void>;
    if (result.resultStatus.isSuccess) {
      return true;
    } else {
      toast.error(result.resultStatus.resultMessage, { id: "sign-up" });
      return false;
    }
  } catch (e) {
    toast.error(MESSAGE.E01, { id: "sign-up" });
  }
  return false;
};
