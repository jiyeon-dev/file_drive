import { z } from "zod";
import { toast } from "sonner";
import { Response, Token } from "@/types";
import AuthToken from "@/lib/authToken";
import { MESSAGE } from "@/lib/message";

// zod
export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "이메일 형식에 맞지 않습니다." }),
  password: z.string().min(6, { message: "6자 이상 입력해주세요." }),
});

export const handler = async (
  data: z.infer<typeof SignInSchema>
): Promise<boolean> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as Response<Token>;
    if (result.resultStatus.isSuccess) {
      AuthToken.setToken(result.resultData);
      return true;
    } else {
      toast.error(result.resultStatus.resultMessage, { id: "sign-in" });
      return false;
    }
  } catch (e) {
    toast.error(MESSAGE.E01, { id: "sign-in" });
  }
  return false;
};
