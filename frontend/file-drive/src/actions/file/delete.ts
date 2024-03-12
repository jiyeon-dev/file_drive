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
      const message = isDelete ? MESSAGE.EF04 : MESSAGE.EF04_1;
      toast.error(message, toast_id);
      return false;
    }

    const message = isDelete ? MESSAGE.SF02 : MESSAGE.SF02_1;
    toast.success(message, toast_id);
    return true;
  } catch (e) {
    return false;
  }
};
