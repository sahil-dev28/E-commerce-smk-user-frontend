import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  return (
    <Input
      className="border-muted-foreground w-xs rounded-lg pl-10"
      placeholder="Search for products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
