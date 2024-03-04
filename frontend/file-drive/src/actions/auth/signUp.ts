import { z } from "zod";
import { toast } from "sonner";
import { Response } from "@/types";

// zod
export const SignUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "이메일 형식에 맞지 않습니다." }),
  name: z
    .string()
    .min(1, { message: "닉네임을 입력해주세요." })
    .max(6, { message: "6자 이하로 입력해주세요." }),
  password: z.string().min(6, { message: "6자 이상 입력해주세요." }),
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
    toast.error("알수없는 오류가 발생했습니다.", { id: "sign-up" });
  }
  return false;
};
