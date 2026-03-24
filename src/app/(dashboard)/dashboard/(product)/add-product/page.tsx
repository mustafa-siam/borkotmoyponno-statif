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
import { useHandleFindCategoryQuery } from "@/redux/features/categories/categoriesApi";
import { useHandleAddProductMutation } from "@/redux/features/product/productApi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ------------------------------------------------------------------------- */
/* 🆕 Types                                                                  */
/* ------------------------------------------------------------------------- */
interface IFormInput {
  productName: string;
  slug: string;
  productImage: string;
  tagline: string;
  quantity: number;
  unit: string;
  prvPrice?: number;
  price: number;
  hadith?: string;
  benefitsHeading: string;
  benefitsSteps: string[];
  buyingReasonHeading: string;
  buyingReasonSteps: string[];
  shippingDhakaCity: number;
  shippingDhakaCityOuter: number;
  shippingOutsideDhaka: number;
  seoDescription: string;
  seoTag: string[];
}

interface Fields {
  label: string;
  valueKey: keyof IFormInput;
  placeholder: string;
  type: "text" | "richtext" | "keywords" | "number";
  formType: "string" | "array" | "number";
}

/* ------------------------------------------------------------------------- */
/* 🆕 Field Configuration                                                    */
/* ------------------------------------------------------------------------- */
const fieldConfig: Fields[] = [
  {
    label: "Product Name",
    valueKey: "productName",
    placeholder: "Enter the Product Name",
    type: "richtext",
    formType: "string",
  },
  {
    label: "Slug",
    valueKey: "slug",
    placeholder: "Enter the slug",
    type: "text",
    formType: "string",
  },
  {
    label: "Tag Line",
    valueKey: "tagline",
    placeholder: "Enter the Tag Line",
    type: "richtext",
    formType: "string",
  },
  {
    label: "Quantity",
    valueKey: "quantity",
    placeholder: "Enter the Quantity",
    type: "number",
    formType: "number",
  },
  {
    label: "Unit",
    valueKey: "unit",
    placeholder: "Enter the Unit",
    type: "richtext",
    formType: "string",
  },
  {
    label: "Previous Price",
    valueKey: "prvPrice",
    placeholder: "Enter the Previous Price",
    type: "number",
    formType: "number",
  },
  {
    label: "Price",
    valueKey: "price",
    placeholder: "Enter the Price",
    type: "number",
    formType: "number",
  },
  {
    label: "Hadith",
    valueKey: "hadith",
    placeholder: "Enter the Hadith",
    type: "richtext",
    formType: "string",
  },
  {
    label: "Benefits Heading",
    valueKey: "benefitsHeading",
    placeholder: "Enter the Benefits Heading",
    type: "richtext",
    formType: "string",
  },
  {
    label: "Benefits Steps",
    valueKey: "benefitsSteps",
    placeholder: "Enter the Benefits Steps",
    type: "keywords",
    formType: "array",
  },
  {
    label: "Buying Reason Heading",
    valueKey: "buyingReasonHeading",
    placeholder: "Enter the Buying Reason Heading",
    type: "richtext",
    formType: "string",
  },
  {
    label: "Buying Reason Steps",
    valueKey: "buyingReasonSteps",
    placeholder: "Enter the Buying Reason Steps",
    type: "keywords",
    formType: "array",
  },
  /* ⬇⬇⬇  তিন টি শিপিং ফিল্ড   ⬇⬇⬇ */
  {
    label: "Shipping — Dhaka City",
    valueKey: "shippingDhakaCity",
    placeholder: "e.g. 80",
    type: "number",
    formType: "number",
  },
  {
    label: "Shipping — Dhaka City Outer",
    valueKey: "shippingDhakaCityOuter",
    placeholder: "e.g. 99",
    type: "number",
    formType: "number",
  },
  {
    label: "Shipping — Outside Dhaka",
    valueKey: "shippingOutsideDhaka",
    placeholder: "e.g. 119",
    type: "number",
    formType: "number",
  },
  /* --------------------------------------------------------------------- */
  {
    label: "SEO Description",
    valueKey: "seoDescription",
    placeholder: "Enter the SEO Description",
    type: "text",
    formType: "string",
  },
  {
    label: "SEO Tag",
    valueKey: "seoTag",
    placeholder: "Enter SEO tags (comma separated)",
    type: "keywords",
    formType: "array",
  },
];

/* ------------------------------------------------------------------------- */
/* Utility functions for initial states                                      */
/* ------------------------------------------------------------------------- */
const buildInitialState = <T extends "meta" | "history">(kind: T) =>
  fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") {
      acc[field.valueKey] = kind === "meta" ? [] : [[]];
    } else {
      acc[field.valueKey] = kind === "meta" ? "" : [];
    }
    return acc;
  }, {} as Record<string, any>);

const AddPage = () => {
  /* ---------------------- State ---------------------- */
  const [images, setImages] = useState<File[]>([]);
  const [metaData, setMetaData] = useState(buildInitialState("meta"));
  const [metaDataHistory, setMetaDataHistory] = useState(
    buildInitialState("history")
  );
  const [category, setCategory] = useState<string>("");
  const [historyModal, setHistoryModal] = useState<{
    open: boolean;
    field: any;
  }>({ open: false, field: null });
  const [isImageUploading, setIsImageUploading] = useState(false);

  /* ---------------------- RTK Query ------------------ */
  const [handleAddProduct, { isLoading }] = useHandleAddProductMutation();
  const { data } = useHandleFindCategoryQuery({
    page: 1,
    limit: 100,
    search: "",
  });
  const categories: any[] = data?.payload || [];

  const router = useRouter();

  /* ---------------------- React‑Hook‑Form ------------- */
  const methods = useForm<IFormInput>({
    defaultValues: buildInitialState("meta") as IFormInput,
  });

  /* --------------------------------------------------------------------- */
  /* Form Submit Handler                                                   */
  /* --------------------------------------------------------------------- */
  const onSubmit: SubmitHandler<IFormInput> = async () => {
    if (images.length === 0)
      return toast.error("Please upload at least one image.");
    setIsImageUploading(true);

    try {
      const imageURLs = (
        await Promise.all(images.map((img) => uploadImageToImageBB(img)))
      ).filter((url): url is string => !!url);

      if (imageURLs.length === 0)
        return toast.error("Failed to upload images.");

      const payload = {
        productName: metaData.productName,
        slug: metaData.slug,
        tagline: metaData.tagline,
        quantity: Number(metaData.quantity),
        unit: metaData.unit,
        prvPrice: Number(metaData.prvPrice),
        price: Number(metaData.price),
        hadith: metaData.hadith,
        benefits: {
          heading: metaData.benefitsHeading,
          steps: metaData.benefitsSteps,
        },
        buyingReason: {
          heading: metaData.buyingReasonHeading,
          steps: metaData.buyingReasonSteps,
        },
        category,
        /* 🆕 ৩ টি শিপিং ফিল্ড ম্যাপ */
        shipping: {
          dhakaCity: Number(metaData.shippingDhakaCity),
          dhakaCityOuter: Number(metaData.shippingDhakaCityOuter),
          outsideDhaka: Number(metaData.shippingOutsideDhaka),
        },
        productImage: imageURLs[0],
        seo: { tag: metaData.seoTag, description: metaData.seoDescription },
      };

      await handleAddProduct(payload).unwrap();
      toast.success("Product created successfully!");
      setImages([]);
      router.push("/dashboard/manage-products");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.payload?.message || "An error occurred");
    } finally {
      setIsImageUploading(false);
    }
  };

  /* --------------------------------------------------------------------- */
  /* Render                                                                */
  /* --------------------------------------------------------------------- */
  return (
    <div>
      <Heading
        title="Add Product"
        subTitle="Fill in the details to add a new product."
      />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="pt-5 lg:pt-7 lg:w-[60%] space-y-10"
        >
          {/* Dynamic fields */}
          <GlobalFieldRenderer
            fieldConfig={fieldConfig}
            metaData={metaData}
            setMetaData={setMetaData}
            methods={methods}
            setHistoryModal={setHistoryModal}
            setMetaDataHistory={setMetaDataHistory}
          />

          {/* Category select */}
          <div>
            <FormLabel className="mb-2">Category</FormLabel>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((c) => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.categoryName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Image uploader */}
          <FormItem>
            <FormLabel>Image</FormLabel>
            <ImageUploader
              images={images}
              setImages={setImages}
              mode="add"
              multiple
            />
          </FormItem>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isLoading || isImageUploading}
            className={`rounded-none mr-5 ${
              isLoading || isImageUploading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading ? "Please Wait..." : "Add Product"}
          </Button>

          {/* AI Command Input */}
          <GlobalAICommandInput
            metaData={metaData}
            setMetaData={setMetaData}
            setMetaDataHistory={setMetaDataHistory}
            methods={methods}
            fieldConfig={fieldConfig}
          />
        </form>
      </FormProvider>

      {/* History modal */}
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
