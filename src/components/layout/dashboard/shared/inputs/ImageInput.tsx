"use client";

import { TrashIcon, UploadCloudIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  images: File[];
  setImages: (images: File[]) => void;
  mode: "add" | "update";
  defaultImages?: string[];
  multiple?: boolean;
}

export function ImageUploader({
  images,
  setImages,
  mode,
  defaultImages = [],
  multiple = false,
}: ImageUploaderProps) {
  // State to track removed default images
  const [removedDefaultImages, setRemovedDefaultImages] = useState<number[]>(
    []
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const maxSize = 2 * 1024 * 1024; // 2 MB
      const files = Array.from(e.target.files);

      // Filter out files larger than 2MB
      const validFiles = files.filter((file) => {
        if (file.size > maxSize) {
          toast.error(`Your image exceeds the 2MB limit and will be skipped.`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      if (!multiple && validFiles.length > 1) {
      toast.error("Only one image can be uploaded at a time.");
        return;
      }

      setImages(multiple ? [...images, ...validFiles] : [validFiles[0]]);
    }
  };
  

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Function to remove a default image
  const removeDefaultImage = (index: number) => {
    setRemovedDefaultImages((prev) => [...prev, index]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Upload Box */}
        {images?.length === 0 &&
          (!defaultImages ||
            defaultImages.length === 0 ||
            removedDefaultImages.length === defaultImages.length) && (
            <div className="h-40 w-full bg-gray-100 border border-gray-200 cursor-pointer flex justify-center items-center text-white text-center relative rounded-xs  duration-300">
              <div className="flex flex-col items-center text-black">
                <UploadCloudIcon className="text-3xl text-gray-900 mb-1" />
                <span className="text-sm text-gray-800 font-semibold">
                  Choose files to upload
                </span>
                <span className="text-gray-600 text-xs">
                  PNG, JPG, or JPEG files
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple={multiple}
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer rounded-lg"
              />
            </div>
          )}

        {/* Default Images (Update Mode) */}
        {mode === "update" &&
          defaultImages.map(
            (url, index) =>
              !removedDefaultImages.includes(index) && (
                <div key={`default-${index}`} className="relative w-fit">
                  <Image
                    src={url}
                    alt={`Existing Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="h-32 w-32 object-cover rounded-sm border border-gray-200 cursor-pointer  hover:shadow-lg transition-shadow duration-200"
                  />
                  <TrashIcon
                    onClick={() => removeDefaultImage(index)}
                    className="absolute -top-2 -right-2 rounded-full bg-red-600 text-2xl text-white cursor-pointer p-1 hover:bg-red-700 transition-colors duration-200"
                  />
                </div>
              )
          )}

        {/* Uploaded Images */}
        {images.map((image, index) => (
          <div key={index} className="relative w-fit">
            <Image
              src={URL.createObjectURL(image)}
              alt={`Preview ${index + 1}`}
              width={100}
              height={100}
              className="h-32 w-32 object-cover rounded-sm border border-gray-200 cursor-pointer  hover:shadow-lg  duration-200"
            />
            <TrashIcon
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 rounded-full bg-red-600 text-2xl text-white cursor-pointer p-1 hover:bg-red-700 transition-colors duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
