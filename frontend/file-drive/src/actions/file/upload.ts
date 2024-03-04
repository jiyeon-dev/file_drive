import { z } from "zod";
import { authFetch } from "@/lib/authFetch";
import { Response } from "@/types";
import { toast } from "sonner";
import { MESSAGE } from "@/lib/message";

export const FileUploadSchema = z.object({
  file: z.any().refine((val) => val.length > 0, MESSAGE.EF03),
  folderId: z.number(),
});

export const toast_id = { id: "upload-file" };

export const handler = async (
  data: z.infer<typeof FileUploadSchema>
): Promise<boolean> => {
  const { file, folderId } = data;

  const formData = new FormData();
  formData.set("file", file);
  formData.set("folderId", `${folderId}`);

  try {
    const response = await authFetch("/api/file", {
      method: "POST",
      body: formData,
    });
    if (!response) return false;

    const result = (await response.json()) as Response<File>;
    if (!result.resultStatus.isSuccess) {
      console.error(result.resultStatus.resultMessage);
      toast.error(MESSAGE.EF01, toast_id);
      return false;
    }

    toast.success(MESSAGE.SF01, toast_id);
    return true;
  } catch (e) {
    return false;
  }
};
