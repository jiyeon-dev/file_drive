import { z } from "zod";
import { authFetch } from "@/lib/authFetch";
import { Page, Response } from "@/types";
import { toast } from "sonner";
import { MESSAGE } from "@/lib/message";

export const FileSearchSchema = z.object({
  searchTerm: z.string(),
});

export const toast_id = { id: "search-file" };

export const handler = async (
  data: z.infer<typeof FileSearchSchema>
): Promise<boolean> => {
  const { searchTerm } = data;

  try {
    const response = await authFetch(
      `/api/file?pageNo=0&folderId=${1}&searchTerm=${searchTerm}`,
      // `/api/file${fileTypeUrl}?pageNo=0&folderId=${1}&searchTerm=${searchTerm}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = (await response?.json()) as Response<Page<File>>;
    if (!result.resultStatus.isSuccess) {
      console.error(result.resultStatus.resultMessage);
      throw new Error(result.resultStatus.resultMessage);
    }

    toast.success(MESSAGE.SF01, toast_id);
    return true;
  } catch (e) {
    return false;
  }
};
