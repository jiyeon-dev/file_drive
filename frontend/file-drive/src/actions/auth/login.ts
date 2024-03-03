import { z } from "zod";
import { toast } from "sonner";
import { Response, Token } from "@/types";
import AuthToken from "@/lib/authToken";

// zod
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "이메일 형식에 맞지 않습니다." }),
  password: z.string().min(6, { message: "6자 이상 입력해주세요." }),
});

export const handler = async (
  data: z.infer<typeof LoginSchema>
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
      toast.error(result.resultStatus.resultMessage, { id: "login" });
      return false;
    }
  } catch (e) {
    toast.error("알수없는 오류가 발생했습니다.", { id: "login" });
  }
  return false;
};
