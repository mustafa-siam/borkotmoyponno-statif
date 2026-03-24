"use client";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  useHandleGetAllReviewQuery,
  useHandleGetSingleReviewQuery,
  useHandleUpdateReviewMutation,
} from "@/redux/features/review/reviewApi";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Heading from "@/components/layout/dashboard/shared/Heading";
import { InputField } from "@/components/layout/dashboard/shared/inputs/InputState";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useHandleFindProductQuery } from "@/redux/features/product/productApi";

interface IFormInput {
  name: string;
  designation: string;
  content: string;
  rating: number;
}

const UpdateReview = () => {
  const { id } = useParams();
  const { data: reviewData } = useHandleGetSingleReviewQuery(id);
  const [productId, setProductId] = useState<string>("");
  const methods = useForm<IFormInput>();
  const [rating, setRating] = useState<number>(0);
  const [handleUpdateReview, { isLoading }] = useHandleUpdateReviewMutation();
  const router = useRouter();
  const { refetch } = useHandleGetAllReviewQuery({});

  const { data } = useHandleFindProductQuery({});

  // Extracting the data list and total pages from the response
  const allData: any[] = data?.payload || [];
  useEffect(() => {
    if (reviewData?.payload) {
      methods.reset({
        name: reviewData.payload.name,
        designation: reviewData.payload.designation,
        content: reviewData.payload.content,
      });
      setRating(reviewData.payload.rating);
      setProductId(reviewData.payload.product);
    }
  }, [reviewData, methods]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!reviewData?.payload?._id) {
      toast.error("Review ID not found");
      return;
    }

    const payload = {
      name: data.name,
      designation: data.designation,
      content: data.content,
      rating: rating,
      product: productId,
    };

    try {
      await handleUpdateReview({
        payload,
        id: reviewData.payload._id,
      }).unwrap();
      toast.success("Review updated successfully");
      refetch();
      router.push("/dashboard/manage-reviews");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update review");
    }
  };
  
  function stripHtmlTags(html: string): string {
    return html.replace(/<[^>]*>/g, "").trim();
  }

  return (
    <div>
      <Heading
        title="Update Review"
        subTitle="Update an existing review on your website"
      />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="pt-5 sm:pt-7 lg:pt-8 2xl:pt-10 lg:w-[60%]"
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
            value={productId}
            id=""
            className="w-full p-2 border border-gray-400 rounded cursor-pointer mb-5"
            onChange={(e) => setProductId(e.target.value)}
          >
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
                className="w-full border border-gray-400 p-2 resize-none h-40"
                placeholder="Enter your review"
              />
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
            className={`rounded-none cursor-pointer mt-5 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Please Wait..." : "Update Review"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default UpdateReview;
