"use client";

import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import { ChevronDown, Languages } from "lucide-react";

const countries = [
  //   { code: "", value: "", label: "Select country" },

  {
    code: "en",
    value: "english",
    label: "English",
  },

  {
    code: "hi",
    value: "hindi",
    label: "Hindi",
  },
  {
    code: "mr",
    value: "marathi",
    label: "Marathi",
  },
  {
    code: "fr",
    value: "french",
    label: "Francis",
  },
  {
    code: "de",
    value: "deutsche",
    label: "Deutsche",
  },
];

export function SelectLanguage() {
  return (
    <>
      <Combobox items={countries} defaultValue={countries[0]}>
        <ComboboxTrigger
          render={
            <Button className="w-30 justify-between font-normal gap-0 cursor-pointer">
              <Languages />
              <ComboboxValue />
              <ChevronDown />
            </Button>
          }
        />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.code} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  );
}
