import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GridIcon, RowsIcon } from "lucide-react";
import DnDZone from "./DnDZone";
import { useState } from "react";

export default function FileTabs() {
  const [type, setType] = useState<string>("all");

  return (
    <div>
      <Tabs defaultValue='grid'>
        <div className='flex justify-between items-center sticky top-16 pt-4 bg-background'>
          <TabsList>
            <TabsTrigger value='grid' className='flex gap-2 items-center'>
              <GridIcon /> <span className='hidden sm:block'>Grid</span>
            </TabsTrigger>
            <TabsTrigger value='table' className='flex gap-2 items-center'>
              <RowsIcon /> <span className='hidden sm:block'>Table</span>
            </TabsTrigger>
          </TabsList>

          <div className='flex gap-2 items-center'>
            <Select value={type} onValueChange={(type) => setType(type)}>
              <SelectTrigger id='type-select' className='w-[120px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* loading */}
        {/* placeholder */}

        <DnDZone>
          <TabsContent value='grid'>grid</TabsContent>
          <TabsContent value='table'>table</TabsContent>
        </DnDZone>
      </Tabs>
    </div>
  );
}
