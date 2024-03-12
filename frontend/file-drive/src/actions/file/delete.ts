import { z } from "zod";
import { authFetch } from "@/lib/authFetch";
import { Response } from "@/types";
import { toast } from "sonner";
import { MESSAGE } from "@/lib/message";

export const FileDeleteSchema = z.object({
  fileId: z.number(),
  isDelete: z.boolean(),
});

export const toast_id = { id: "delete-file" };

export const handler = async (
  data: z.infer<typeof FileDeleteSchema>
): Promise<boolean> => {
  const { fileId, isDelete } = data;

  const formData = new FormData();
  formData.set("fileId", `${fileId}`);
  formData.set("isDelete", `${isDelete}`);

  try {
    const response = await authFetch("/api/file", {
      method: "DELETE",
      body: formData,
    });
    if (!response) return false;

    const result = (await response.json()) as Response<boolean>;
    if (!result.resultStatus.isSuccess) {
      console.error(result.resultStatus.resultMessage);
      toast.error(MESSAGE.EF04, toast_id);
      return false;
    }

    toast.success(MESSAGE.SF02, toast_id);
    return true;
  } catch (e) {
    return false;
  }
};
