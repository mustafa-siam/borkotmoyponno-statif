import toast from "react-hot-toast";

const ValidateFile = (file: File, maxSizeMB = 5) => {
    const isImage = file.type.startsWith("image/");
    const isWithinSize = file.size / (1024 * 1024) <= maxSizeMB;

    if (!isImage) {
        toast.error("Only image files are allowed.");
        return false;
    }
    if (!isWithinSize) {
        toast.error(`File size should not exceed ${maxSizeMB}MB.`);
        return false;
    }
    return true;
};

export default ValidateFile