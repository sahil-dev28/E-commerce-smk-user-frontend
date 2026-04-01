import { useState, useEffect } from "react";
import { useDebounce } from "@/utils/debounce";
import { Input } from "@/components/ui/input";

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchInput({ onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedQuery = useDebounce(searchTerm, 1000);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <Input
      className="border-muted-foreground w-xs rounded-lg pl-10"
      placeholder="Search for products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
