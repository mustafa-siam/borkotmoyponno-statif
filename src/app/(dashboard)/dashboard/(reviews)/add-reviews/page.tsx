"use client";
import { Button } from "@/components/ui/button";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Heading from "@/components/layout/dashboard/shared/Heading";
import { InputField } from "@/components/layout/dashboard/shared/inputs/InputState";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
import {
  useHandleAddReviewMutation,
  useHandleGetAllReviewQuery,
} from "@/redux/features/review/reviewApi";
import { useHandleFindProductQuery } from "@/redux/features/product/productApi";
interface IFormInput {
  name: string;
  designation: string;
  content: string;
  rating: number;
}

// 📝 data Interface - Defines structure for each data object
interface IData {
  _id: string; // Unique data ID from MongoDB
  slug: string; // SEO-friendly URL slug for the data (used in URL)
  productName: string; // Title of the data
  productImage: string; // URL of the image associated with the data (e.g., thumbnail)
  price: number;
  quantity: number;
  sold: number;
  createdAt: string; // ISO date string when the data was created
  updatedAt: string; // ISO date string when the data was last updated
}

const AddReview = () => {
  const router = useRouter();
  const methods = useForm<IFormInput>();
  const [rating, setRating] = useState<number>(0);
  const [productId, setProductId] = useState<string>("");
  const [handleAddReview, { isLoading }] = useHandleAddReviewMutation();
  const { refetch } = useHandleGetAllReviewQuery({});

  const { data } = useHandleFindProductQuery({});

  // Extracting the data list and total pages from the response
  const allData: IData[] = data?.payload || [];
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (rating === 0) {
      toast.error("Please select a rating");
    }
    if (productId === "") {
      toast.error("Please select a product");
      return
    }
    const payload = {
      name: data.name,
      designation: data.designation,
      content: data.content,
      rating: rating,
      product: productId,
    };
    try {
      await handleAddReview(payload).unwrap();
      toast.success("Review added successfully");
      refetch();
      router.push("/dashboard/manage-reviews");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.payload?.message || "An error occurred");
    }
  };

  function stripHtmlTags(html: string): string {
    return html.replace(/<[^>]*>/g, "").trim();
  }

  return (
    <>
      <div>
        <Heading
          title="Add Review"
          subTitle="Add a new review to your website"
        />

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="pt-5 sm:pt-7 lg:pt-8 2xl:pt-10 lg:w-[60%] "
          >
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-10 space-y-3 md:space-y-0">
              <InputField
                name="name"
                label="Name"
                placeholder="Enter your name"
                type="text"
                validationRules={{
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long",
                  },
                }}
                inputClassName="border-gray-400"
              />
              <InputField
                name="designation"
                label="Designation"
                placeholder="Enter Designation"
                type="text"
                validationRules={{
                  required: "Designation is required",
                }}
                inputClassName="border-gray-400"
              />
            </section>

            <select
              name=""
              id=""
              className="w-full p-2 border border-gray-400 rounded cursor-pointer mb-5"
              onChange={(e) => setProductId(e.target.value)}
            >
              <option value="">
                Select Product
              </option>
              {allData?.map((item) => (
                <option
                  value={item?._id}
                  key={item?._id}
                  className="cursor-pointer"
                >
                  {stripHtmlTags(item?.productName)}
                </option>
              ))}
            </select>
            {/* Textarea for content */}

            <FormItem>
              <FormLabel>Content</FormLabel>
              <div className="mt-1">
                <textarea
                  {...methods.register("content", {
                    required: "Content is required",
                    minLength: {
                      value: 10,
                      message: "Content must be at least 10 characters long",
                    },
                  })}
                  className="w-full  border border-gray-400 p-2 resize-none h-40"
                  placeholder="Enter your review"
                ></textarea>
                {methods.formState.errors.content && (
                  <p className="text-red-500">
                    {methods.formState.errors.content.message}
                  </p>
                )}
              </div>
            </FormItem>

            <div className="mt-5">
              <FormItem>
                <Rating
                  style={{ maxWidth: 180 }}
                  value={rating}
                  onChange={setRating}
                  isRequired
                />
              </FormItem>
            </div>

            <Button
              type="submit"
              className={`rounded-none cursor-pointer mt-5
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
              disabled={isLoading}
            >
              {isLoading ? "Please Wait..." : "  Add Review"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default AddReview;
