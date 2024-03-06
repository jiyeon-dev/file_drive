import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FileSearchSchema } from "@/actions/file/search";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const searchTerm = searchParams.get("searchTerm") || "";

  const form = useForm<z.infer<typeof FileSearchSchema>>({
    resolver: zodResolver(FileSearchSchema),
    defaultValues: {
      searchTerm,
    },
  });

  const onSubmit = async (values: z.infer<typeof FileSearchSchema>) => {
    searchParams.set("searchTerm", values.searchTerm);
    setSearchParams(searchParams.toString());
    queryClient.invalidateQueries({ queryKey: ["files"] });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex items-center justify-center space-x-1'
      >
        <FormField
          control={form.control}
          name='searchTerm'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='파일명' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' size='sm' className='break-keep'>
          검색
        </Button>
      </form>
    </Form>
  );
}
