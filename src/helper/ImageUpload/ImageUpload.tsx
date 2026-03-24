import toast from "react-hot-toast";

const uploadImageToImageBB = async (
  imageFile: File
): Promise<string | null> => {
  const convertToWebP = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        if (!e.target?.result) return reject("Failed to read file.");
        img.src = e.target.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const webpFile = new File([blob], "image.webp", {
                type: "image/webp",
              });
              resolve(webpFile);
            } else {
              reject("WebP conversion failed.");
            }
          },
          "image/webp",
          0.8 // quality
        );
      };

      reader.readAsDataURL(file);
    });
  };

  try {
    const webpFile = await convertToWebP(imageFile);
    const formData = new FormData();
    formData.append("image", webpFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("❌ Failed to upload image. Please try again.");
    return null;
  }
};

export default uploadImageToImageBB;
