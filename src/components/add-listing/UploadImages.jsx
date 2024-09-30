// /* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { storage } from "../../../configs/firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button.jsx";
import { db } from "../../../configs/index.js";
import { carImages } from "../../../configs/schema.js";
import { eq } from "drizzle-orm";

export default function UploadImages({
  triggerUploadImages,
  setLoader,
  mode,
  imagesList,
  id,
}) {
  const [selectedFileList, setSelectedFileList] = useState([]);

  useEffect(() => {
    if (mode === "edit") {
      setSelectedFileList(imagesList);
    }
  }, [mode, imagesList]);

  useEffect(() => {
    async function uploadImages() {
      setLoader(true);

      if (mode === "edit") {
        const updatedFiles = selectedFileList.filter((file) => {
          if (file.imageUrl) {
            return false;
          } else {
            return true;
          }
        });
        updatedFiles.length > 0 &&
          updatedFiles.forEach((file) => {
            const fileName = Date.now() + "jpeg";
            const storageRef = ref(storage, "CarTrek/" + fileName);
            const metaData = {
              contentType: "image/jpeg",
            };
            uploadBytes(storageRef, file, metaData)
              .then((res) => {})
              .then((res) => {
                getDownloadURL(storageRef).then(async (downloadUrl) => {
                  await db.insert(carImages).values({
                    imageUrl: downloadUrl,
                    carListingId: triggerUploadImages,
                  });
                });
              });
            setLoader(false);
          });
      } else {
        selectedFileList.forEach((file) => {
          const fileName = Date.now() + "jpeg";
          const storageRef = ref(storage, "CarTrek/" + fileName);
          const metaData = {
            contentType: "image/jpeg",
          };
          uploadBytes(storageRef, file, metaData)
            .then((res) => {})
            .then((res) => {
              getDownloadURL(storageRef).then(async (downloadUrl) => {
                await db.insert(carImages).values({
                  imageUrl: downloadUrl,
                  carListingId: triggerUploadImages,
                });
              });
            });
          setLoader(false);
        });
      }
    }
    if (triggerUploadImages) {
      uploadImages();
    }
  }, [triggerUploadImages, mode]);

  const onFileSelected = (event) => {
    const files = event.target.files;

    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      setSelectedFileList((prev) => [...prev, file]);
    }
  };

  const onImageRemove = async (image) => {
    const result = selectedFileList.filter(
      (item) => item !== image || item.imageUrl !== image.imageUrl
    );
    setSelectedFileList(result);
    if (image.imageUrl) {
      await db.delete(carImages).where(eq(carImages.id, image.id));
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {selectedFileList.map((image, idx) => {
          return (
            <div key={idx}>
              <h2>
                <IoClose
                  className="absolute m-1 text-2xl text-white cursor-pointer bg-primary rounded-full"
                  onClick={() => onImageRemove(image, idx)}
                />
              </h2>
              <img
                src={image.imageUrl || URL.createObjectURL(image)}
                className="w-full h-[200px] object-cover rounded-xl"
              />
            </div>
          );
        })}
        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-lg">
            <h2 className="text-lg text-center text-primary">+</h2>
          </div>
        </label>
        <input
          type="file"
          multiple={true}
          id="upload-images"
          className="opacity-0"
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
}
