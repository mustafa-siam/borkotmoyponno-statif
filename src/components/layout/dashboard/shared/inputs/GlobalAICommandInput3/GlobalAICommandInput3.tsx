import { Button } from "@/components/ui/button";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { GenerateDataWithAi } from "@/helper/GenerateDataWithAi/GenerateDataWithAi";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface BlogField {
  label: string;
  valueKey: string;
  placeholder: string;
  type: "text" | "richtext" | "keywords";
  formType: "string" | "array";
}

interface GlobalAICommandInputProps {
  metaData: Record<string, any>;
  setMetaData: React.Dispatch<React.SetStateAction<any>>;
  setMetaDataHistory: React.Dispatch<React.SetStateAction<any>>;
  methods: any; // refine later if needed
  blogFieldConfig: BlogField[];
}

export default function GlobalAICommandInput3({
  metaData,
  setMetaData,
  setMetaDataHistory,
  methods,
  blogFieldConfig,
}: GlobalAICommandInputProps) {
  const [command, setCommand] = useState<string>("");
  const [aiState, setAiState] = useState<BlogField | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAi = async () => {
    if (!command) {
      setError("Please enter a valid command.");
      return;
    }
    if (!aiState) {
      setError("Please select a field to generate content for.");
      return;
    }

    setError(null);
    setIsLoading(true);

    let updatedCommand = command;

    blogFieldConfig.forEach((data: BlogField) => {
      const value =
        data?.type === "keywords"
          ? metaData[data.valueKey]?.join(", ")
          : metaData[data.valueKey];

      // Special handling for richtext field
      if (aiState.type === "richtext" && data.type === "richtext") {
        updatedCommand = `Generate a well-formatted description with HTML tags suitable for a rich text editor (like in MS Word). Include elements like <h1> to <h6>, <p>, <i>, <b>, <a>, <ul>, <li>, <ol>, and <u> based on this content: ${
          value || ""
        }`;
      } else {
        updatedCommand = updatedCommand.replace(
          `$$${data.valueKey}`,
          value || ""
        );
      }
    });

    try {
      const generatedContent = await GenerateDataWithAi(updatedCommand);

      const updatedMetaData = {
        ...metaData,
        [aiState.valueKey]:
          aiState.type === "keywords"
            ? generatedContent.split(/\s*,\s*/).map((k) => k.trim())
            : generatedContent,
      };

      setMetaData(updatedMetaData);
      methods.setValue(aiState.valueKey, updatedMetaData[aiState.valueKey]);

      setMetaDataHistory((prev: any) => ({
        ...prev,
        [aiState.valueKey]: [
          ...(prev[aiState.valueKey] || []),
          updatedMetaData[aiState.valueKey],
        ],
      }));
    } catch {
      setError("Failed to generate content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInsertState = (valueKey: string) => {
    setCommand((prevCommand) => `${prevCommand} $$${valueKey}`);
  };

  return (
    <div>
      <FormItem>
        <FormLabel>Command for AI</FormLabel>
        <Textarea
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter a command using placeholders like $$description or $$title"
          className="w-full h-40 border-gray-300 rounded-lg p-3"
        />
        <p className="text-xs text-gray-500">
          Click on the fields below to add their placeholder:
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {blogFieldConfig.map((data) => (
            <span
              key={data.valueKey}
              onClick={() => handleInsertState(data.valueKey)}
              className="text-xs bg-primary text-primary-foreground p-2 rounded cursor-pointer hover:bg-primary/90"
            >
              Insert {data.label}
            </span>
          ))}
        </div>
      </FormItem>

      <div className="flex mt-5">
        <Button
          onClick={handleAi}
          disabled={isLoading || !command || !aiState}
          className="w-full sm:w-auto py-3 text-white rounded-r-none"
        >
          {isLoading ? "Generating..." : "Generate data for"}
        </Button>
        <FormItem>
          <Select
            onValueChange={(valueKey) => {
              const selected =
                blogFieldConfig.find((f) => f.valueKey === valueKey) || null;
              setAiState(selected);
            }}
          >
            <SelectTrigger className="border-gray-300 rounded-l-none p-3 w-40">
              <SelectValue placeholder="Select field" />
            </SelectTrigger>
            <SelectContent>
              {blogFieldConfig.map((data) => (
                <SelectItem key={data.valueKey} value={data.valueKey}>
                  {data.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
