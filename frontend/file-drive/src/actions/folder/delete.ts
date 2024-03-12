import { z } from "zod";
import { authFetch } from "@/lib/authFetch";
import { Response } from "@/types";
import { toast } from "sonner";
import { MESSAGE } from "@/lib/message";

export const FolderDeleteSchema = z.object({
  folderId: z.number(),
});

export const toast_id = { id: "delete-folder" };

export const handler = async (
  data: z.infer<typeof FolderDeleteSchema>
): Promise<boolean> => {
  const { folderId } = data;

  const formData = new FormData();
  formData.set("folderId", `${folderId}`);

  try {
    const response = await authFetch("/api/folder", {
      method: "DELETE",
      body: formData,
    });
    if (!response) return false;

    const result = (await response.json()) as Response<boolean>;
    if (!result.resultStatus.isSuccess) {
      console.error(result.resultStatus.resultMessage);
      toast.error(MESSAGE.EF06, toast_id);
      return false;
    }

    toast.success(MESSAGE.SF06, toast_id);
    return true;
  } catch (e) {
    return false;
  }
};
