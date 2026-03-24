"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

// Components
import { ImageUploader } from "@/components/layout/dashboard/shared/inputs/ImageInput";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import GlobalHistoryModal from "@/components/layout/dashboard/shared/GlobalHistoryModal/GlobalHistoryModal";
import GlobalFieldRenderer from "@/components/layout/dashboard/shared/GlobalFieldRenderer/GlobalFieldRenderer";
import toast from "react-hot-toast";
import uploadImageToImageBB from "@/helper/ImageUpload/ImageUpload";

import { useRouter } from "next/navigation";
import { GlobalAICommandInput } from "@/components/layout/dashboard/shared/inputs/GlobalAICommandInput/GlobalAICommandInput";
import Heading from "@/components/layout/dashboard/shared/Heading";
import {
  useHandleFindSingleBannerQuery,
  useHandleUpdateBannerMutation,
} from "@/redux/features/banner/bannerApi";

// Types
interface IFormInput {
  photo: string;
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

const UpdatePage: React.FC<{ params: Promise<Params> }> = ({ params }) => {
  const [slug, setSlug] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [metaData, setMetaData] = useState(getInitialMetaData);
  const [metaDataHistory, setMetaDataHistory] = useState(
    getInitialMetaDataHistory
  );
  const [handleUpdateBanner, { isLoading }] = useHandleUpdateBannerMutation();
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const router = useRouter();

  const [historyModal, setHistoryModal] = useState<{
    open: boolean;
    field: any;
  }>({ open: false, field: null });

  const { data, refetch } = useHandleFindSingleBannerQuery(slug);
  let updatedImage = data?.payload?.photo;
  // image

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
    if (!updatedImage) {
      return toast.error("Please upload at least one image.");
    }

    setIsImageUploading(true);

    try {
      if (images.length > 0) {
        const imageURLs = (
          await Promise.all(images?.map((img) => uploadImageToImageBB(img)))
        ).filter((url): url is string => !!url);
        updatedImage = imageURLs[0];
        if (imageURLs.length === 0) {
          return toast.error("Failed to upload images.");
        }
      }

      const payload = {
        id,
        photo: updatedImage,
      };
      await handleUpdateBanner(payload).unwrap();
      toast.success("Data updated successfully!");
      setImages([]);
      refetch();
      router.push("/dashboard/manage-banner");
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

          <FormItem>
            <FormLabel>Image</FormLabel>
            <ImageUploader
              images={images}
              setImages={setImages}
              mode="update"
              multiple={false}
              defaultImages={data?.payload?.photo ? [data?.payload.photo] : []}
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
            {isLoading || isImageUploading ? "Please Wait..." : "Update Banner"}
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
