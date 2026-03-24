"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

// Components
import { Button } from "@/components/ui/button";
import GlobalHistoryModal from "@/components/layout/dashboard/shared/GlobalHistoryModal/GlobalHistoryModal";
import GlobalFieldRenderer from "@/components/layout/dashboard/shared/GlobalFieldRenderer/GlobalFieldRenderer";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { GlobalAICommandInput } from "@/components/layout/dashboard/shared/inputs/GlobalAICommandInput/GlobalAICommandInput";
import Heading from "@/components/layout/dashboard/shared/Heading";
import { useHandleFindSingleLevelQuery, useHandleUpdateLevelMutation } from "@/redux/features/level/levelAPi";


// Types
interface IFormInput {
    text: string;
  }
  

  interface Fields {
    label: string;
    valueKey: string;
    placeholder: string;
    type: "text" | "richtext" | "keywords" | "number";
    formType: "string" | "array" | "number";
  }
interface Params {
  slug: string;
}


const fieldConfig: Fields[] = [
  {
    label: "Text",
    valueKey: "text",
    placeholder: "Enter the text",
    type: "text",
    formType: "string",
  },
];

const getInitialMetaData = () => {
  return fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") {
      acc[field.valueKey] = [];
    } else {
      acc[field.valueKey] = "";
    }
    return acc;
  }, {} as Record<string, any>);
};

const getInitialMetaDataHistory = () => {
  return fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") {
      acc[field.valueKey] = [[]];
    } else {
      acc[field.valueKey] = [];
    }
    return acc;
  }, {} as Record<string, any>);
};

const UpdatePage: React.FC<{ params: Promise<Params> }> = ({ params }) => {
  const [slug, setSlug] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [metaData, setMetaData] = useState(getInitialMetaData);
  const [metaDataHistory, setMetaDataHistory] = useState(
    getInitialMetaDataHistory
  );
  const [handleUpdateLevel, { isLoading }] = useHandleUpdateLevelMutation();
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const router = useRouter();

  const [historyModal, setHistoryModal] = useState<{
    open: boolean;
    field: any;
  }>({ open: false, field: null });

  const { data, refetch } = useHandleFindSingleLevelQuery(slug);

  // Resolve the params promise and set the slug
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    resolveParams();
  }, [params]);

  const defaultValues = fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") acc[field.valueKey] = [];
    else acc[field.valueKey] = "";
    return acc;
  }, {} as Record<string, any>);

  const methods = useForm<IFormInput>({ defaultValues });

  const onSubmit: SubmitHandler<IFormInput> = async () => {


    setIsImageUploading(true);

    try {

      const payload = {
        id,
        text: metaData?.text,
      };
      await handleUpdateLevel(payload).unwrap();
      toast.success("Data updated successfully!");
      refetch()
      router.push("/dashboard/manage-level");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "An error occurred");
    } finally {
      setIsImageUploading(false);
    }

    // You can send the data to an API or save it to your database here
  };

  useEffect(() => {
    if (data?.payload) {
      const payload = data.payload;

      const newMetaData = {
        text: payload.text || "",
      };

      setMetaData(newMetaData);

      // Populate history with the initial values as first entries
      const newMetaDataHistory = {
        text: payload.text || "",
      };

      setMetaDataHistory(newMetaDataHistory);

      // Set form values
      methods.reset({
        text: payload.text || "",
      });

      setId(payload._id);
    }
  }, [data, methods]);

  return (
    <div>
      <Heading
        title="Update Category"
        subTitle="Please update your category content."
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="pt-5 lg:pt-7 lg:w-[60%] space-y-10"
        >
          <GlobalFieldRenderer
            fieldConfig={fieldConfig}
            metaData={metaData}
            setMetaData={setMetaData}
            methods={methods}
            setHistoryModal={setHistoryModal}
            setMetaDataHistory={setMetaDataHistory}
          />


          <Button
            type="submit"
            // className="w-full sm:w-auto"
            disabled={isLoading || isImageUploading}
            className={`rounded-none mr-5 ${
              isLoading || isImageUploading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading || isImageUploading ? "Please Wait..." : "Update Level"}
          </Button>

          <GlobalAICommandInput
            metaData={metaData}
            setMetaData={setMetaData}
            setMetaDataHistory={setMetaDataHistory}
            methods={methods}
            fieldConfig={fieldConfig}
          />
        </form>
      </FormProvider>
      <GlobalHistoryModal
        historyModal={historyModal}
        metaData={metaData}
        metaDataHistory={metaDataHistory}
        setMetaData={setMetaData}
        setHistoryModal={setHistoryModal}
        methods={methods}
      />
    </div>
  );
};

export default UpdatePage;
