// components/FieldRenderer.tsx
import RichTextEditor from "@/components/editor";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import GlobalKeywordInput from "../inputs/GlobalKeywordInput/GlobalKeywordInput";
import { GenerateDataWithAi } from "@/helper/GenerateDataWithAi/GenerateDataWithAi";
import { useState } from "react";
import { Clock, Loader2, RefreshCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

interface FieldRendererProps {
  fieldConfig: {
    label: string;
    valueKey: string;
    placeholder?: string;
    type: "text" | "richtext" | "keywords" | "number";
  }[];
  metaData: Record<string, any>;
  setMetaData: (meta: Record<string, any>) => void;
  methods: any;
  setHistoryModal: (modal: { open: boolean; field: any }) => void;
  setMetaDataHistory: React.Dispatch<React.SetStateAction<any>>;
}

export default function GlobalFieldRenderer({
  fieldConfig,
  metaData,
  setMetaData,
  methods,
  setHistoryModal,
  setMetaDataHistory,
}: FieldRendererProps) {
  const [updateLoading, setUpdateLoading] = useState(false);

  const handeUpdate = async (data: string, type: string) => {
    setUpdateLoading(true);
    try {
      // Use a different prompt for keywords
      const updatedCommand =
        type === "keywords"
          ? `Generate a list of relevant SEO keywords (separete with comma) based on this: ${metaData[data]}`
          : type === "richtext"
          ? `Generate a well-formatted description with HTML tags suitable for a rich text editor (like in MS Word). Include elements like <h1> to <h6>, <p>, <i>, <b>, <a>, <ul>, <li>, <ol>, and <u> based on this content: ${metaData[data]}`
          : `Update this: ${metaData[data]}`;

      const generatedContent = await GenerateDataWithAi(updatedCommand);

      const updatedMetaData = {
        ...metaData,
        [data]:
          type === "keywords"
            ? generatedContent.split(/\s*,\s*/).map((k) => k.trim())
            : generatedContent,
      };

      setMetaData(updatedMetaData);
      methods.setValue(data, updatedMetaData[data]);

      setMetaDataHistory((prev: any) => ({
        ...prev,
        [data]: [...(prev[data] || []), updatedMetaData[data]],
      }));
    } catch {
      console.log("");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <>
      {fieldConfig.map(({ label, valueKey, placeholder, type }) => {
        const field = { label, valueKey, placeholder, type };
        return (
          <div className="" key={valueKey}>
            <TooltipProvider>
              <div className="flex justify-end items-center gap-2 -mb-4 relative z-50">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => handeUpdate(valueKey, type)}
                      className="text-blue-500 hover:text-blue-600 cursor-pointer ml-auto"
                      disabled={updateLoading}
                    >
                      {updateLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCcw className="w-4 h-4" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Update</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setHistoryModal({ open: true, field })}
                      className="text-blue-500 hover:text-blue-600 cursor-pointer"
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>View History</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
            {type === "text" && (
              <FormField
                control={methods.control}
                name={valueKey}
                key={valueKey}
                rules={{ required: `${label} is required` }} // ✅ Add this line
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={placeholder}
                        {...field}
                        value={metaData[valueKey]}
                        onChange={(e) => {
                          field.onChange(e);
                          setMetaData({
                            ...metaData,
                            [valueKey]: e.target.value,
                          });
                        }}
                        className={`w-full h-40 border  ${
                          methods.formState.errors[valueKey]
                            ? "border-red-500"
                            : "border-gray-300"
                        } mt-1 rounded-none p-3`}
                      />
                    </FormControl>
                    {/* ✅ Show error message */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {type === "number" && (
              <FormField
                control={methods.control}
                name={valueKey}
                key={valueKey}
                rules={{
                  required: `${label} is required`,
                  validate: (value: any) =>
                    parseFloat(value) >= 0 ||
                    `${label} must be a non-negative number`,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={placeholder}
                        {...field}
                        value={metaData[valueKey]}
                        onChange={(e) => {
                          field.onChange(e);
                          setMetaData({
                            ...metaData,
                            [valueKey]: e.target.value,
                          });
                        }}
                        className={`w-full border ${
                          methods.formState.errors[valueKey]
                            ? "border-red-500"
                            : "border-gray-300"
                        }  mt-1 rounded-none p-3`}
                      />
                    </FormControl>

                    {/* ✅ Show error message */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {type === "richtext" && (
              <FormField
                control={methods.control}
                name={valueKey}
                key={valueKey}
                rules={{
                  required: `${label} is required`, // ✅ Add required validation
                  validate: (value) => {
                    const strippedContent = value
                      .replace(/<[^>]*>/g, "")
                      .trim();
                    return strippedContent.length > 0 || `${label} is required`;
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <RichTextEditor
                      content={metaData[valueKey]}
                      onChange={(content) => {
                        field.onChange(content);
                        setMetaData({
                          ...metaData,
                          [valueKey]: content,
                        });
                      }}
                    />
                    <FormMessage /> {/* ✅ Show validation error */}
                  </FormItem>
                )}
              />
            )}

            {type === "keywords" && (
              <FormField
                control={methods.control}
                name={valueKey}
                key={valueKey}
                rules={{
                  required: `${label} is required`,
                  validate: (value) =>
                    Array.isArray(value) && value.length > 0
                      ? true
                      : `${label} is required`,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <GlobalKeywordInput
                      keywords={metaData?.[valueKey] || []}
                      onChange={(newKeywords) => {
                        field.onChange(newKeywords);
                        setMetaData({
                          ...metaData,
                          [valueKey]: newKeywords,
                        });
                      }}
                    />
                    <FormMessage /> {/* ✅ Show error message */}
                  </FormItem>
                )}
              />
            )}
          </div>
        );
      })}
    </>
  );
}

