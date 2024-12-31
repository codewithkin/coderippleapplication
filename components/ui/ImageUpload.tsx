'use client'
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import { Dispatch, SetStateAction } from 'react';

function ImageUpload({setFileUrl}: {setFileUrl: Dispatch<SetStateAction<string | null | undefined>>}) {
    const handleFileChange = (file) => {
        if (file) {
          // Once the upload is complete, file.cdnUrl will contain the URL
          const fileUrl = file.allEntries[0].cdnUrl

          setFileUrl(fileUrl);
        } else {
          console.log('No file selected');
        }
      };

  return (
    <div>
      <h2 className="font-semibold">Upload your app's icon image</h2>
      
      <FileUploaderRegular
         sourceList="local, url, dropbox"
         classNameUploader="uc-light"
         onChange={handleFileChange} // Handle file upload completion
         pubkey="07467f541ac1cffdd4a4"
      />
    </div>
  );
}

export default ImageUpload;