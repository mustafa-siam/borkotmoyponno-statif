"use client";

import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

// Components
import { ImageUploader } from "@/components/layout/dashboard/shared/inputs/ImageInput";
import Heading from "@/components/layout/dashboard/shared/Heading";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import GlobalHistoryModal from "@/components/layout/dashboard/shared/GlobalHistoryModal/GlobalHistoryModal";
import GlobalFieldRenderer from "@/components/layout/dashboard/shared/GlobalFieldRenderer/GlobalFieldRenderer";
import toast from "react-hot-toast";
import uploadImageToImageBB from "@/helper/ImageUpload/ImageUpload";
import { useRouter } from "next/navigation";
import { GlobalAICommandInput } from "@/components/layout/dashboard/shared/inputs/GlobalAICommandInput/GlobalAICommandInput";
import { useHandleAddBannerMutation } from "@/redux/features/banner/bannerApi";

// Types
interface IFormInput {
  categoryName: string;
  categoryPhoto: string;
}

interface Fields {
  label: string;
  valueKey: string;
  placeholder: string;
  type: "text" | "richtext" | "keywords" | "number";
  formType: "string" | "array" | "number";
}

const fieldConfig: Fields[] = [];

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

const AddPage = () => {
  const [images, setImages] = useState<File[]>([]);
  const [metaData, setMetaData] = useState(getInitialMetaData);
  const [metaDataHistory, setMetaDataHistory] = useState(
    getInitialMetaDataHistory
  );
  const [handleAddBanner, { isLoading }] = useHandleAddBannerMutation();
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const router = useRouter();

  const [historyModal, setHistoryModal] = useState<{
    open: boolean;
    field: any;
  }>({ open: false, field: null });

  const defaultValues = fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") acc[field.valueKey] = [];
    else acc[field.valueKey] = "";
    return acc;
  }, {} as Record<string, any>);

  const methods = useForm<IFormInput>({ defaultValues });

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    if (images.length === 0) {
      return toast.error("Please upload at least one image.");
    }
    setIsImageUploading(true);
    try {
      const imageURLs = (
        await Promise.all(images?.map((img) => uploadImageToImageBB(img)))
      ).filter((url): url is string => !!url);

      if (imageURLs.length === 0) {
        return toast.error("Failed to upload images.");
      }

      const payload = {
        photo: imageURLs[0],
      };

      await handleAddBanner(payload).unwrap();
      toast.success("Data created successfully!");
      setImages([]);
      router.push("/dashboard/manage-banner");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.payload?.message || "An error occurred");
    } finally {
      setIsImageUploading(false);
    }

    // You can send the data to an API or save it to your database here
  };

  return (
    <div>
      <Heading
        title="Add Banner image"
        subTitle="Fill in the details to add a new member to your banner image."
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

          <FormItem>
            <FormLabel>Image</FormLabel>
            <ImageUploader
              images={images}
              setImages={setImages}
              mode="add"
              multiple
            />
          </FormItem>

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
            {isLoading || isImageUploading
              ? "Please Wait..."
              : "Add Banner image"}
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

export default AddPage;
