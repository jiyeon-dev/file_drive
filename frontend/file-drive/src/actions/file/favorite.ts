import { z } from "zod";
import { authFetch } from "@/lib/authFetch";
import { Response } from "@/types";
import { toast } from "sonner";
import { MESSAGE } from "@/lib/message";

export const FileFavoriteSchema = z.object({
  fileId: z.number(),
  isFavorite: z.boolean(),
});

export const toast_id = { id: "favorite-file" };

export const handler = async (
  data: z.infer<typeof FileFavoriteSchema>
): Promise<boolean> => {
  const { fileId, isFavorite } = data;

  const formData = new FormData();
  formData.set("fileId", `${fileId}`);
  formData.set("isFavorite", `${isFavorite}`);

  try {
    const response = await authFetch("/api/file/favorite", {
      method: "POST",
      body: formData,
    });
    if (!response) return false;

    const result = (await response.json()) as Response<boolean>;
    if (!result.resultStatus.isSuccess) {
      console.error(result.resultStatus.resultMessage);
      toast.error(MESSAGE.EF05, toast_id);
      return false;
    }

    toast.success(MESSAGE.SF03, toast_id);
    return true;
  } catch (e) {
    return false;
  }
};
