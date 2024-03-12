import { z } from "zod";
import { authFetch } from "@/lib/authFetch";
import { Folder, Response } from "@/types";
import { toast } from "sonner";
import { MESSAGE } from "@/lib/message";

export const FolderCreateSchema = z.object({
  name: z.string(),
  color: z.string(),
  parent: z.string(),
});

export const toast_id = { id: "create_folder" };

export const handler = async (
  data: z.infer<typeof FolderCreateSchema>
): Promise<boolean> => {
  const { name, color, parent } = data;

  const formData = new FormData();
  formData.set("name", name);
  formData.set("color", color);
  formData.set("folderId", parent);

  try {
    const response = await authFetch("/api/folder", {
      method: "POST",
      body: formData,
    });
    if (!response) return false;

    const result = (await response.json()) as Response<Folder>;
    if (!result.resultStatus.isSuccess) {
      console.error(result.resultStatus.resultMessage);
      toast.error(MESSAGE.EF07, toast_id);
      return false;
    }

    toast.success(MESSAGE.SF07, toast_id);
    return true;
  } catch (e) {
    return false;
  }
};
