import { useCallback, useState } from "react";

const useUpload = () => {
  const url = "https://api.cloudinary.com/v1_1/remlad-ventures/image/upload";
  const [state, setState] = useState(undefined);

  const fetchData = useCallback(async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("file", file);
    formData.append("upload_preset", "Remlad");
    const result = await fetch(url, {
      method: "POST",
      body: formData,
    }).then((r) => r.json());
    setState(result.url);
  }, []);
  return [fetchData, state];
};
export default useUpload;
