import { LegacyRef, FormEvent } from 'react';
import { Image as ImageType } from '../../data/types';

interface ImageInputProps {
  image: ImageType;
  name: string;
  label: string;
  register: LegacyRef<HTMLInputElement>;
  setImage: Function;
}

const ImageInput: React.FC<ImageInputProps> = ({ image, register, setImage, name, label }) => {
  const cloudinary = (window as any).cloudinary;

  function openCloudinary(e: FormEvent<EventTarget>) {
    e.preventDefault();
    const myWidget = cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
        uploadPreset: 'doody_burgers',
        sources: ['local', 'url', 'image_search', 'dropbox', 'instagram', 'google_drive'],
        googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        // searchBySites: ['giving.cu.edu', 'www.cu.edu', 'essential.cu.edu'],
        // cropping: true,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result);
          setImage({
            file_name: String(result.info.original_filename),
            public_id: String(result.info.public_id),
            asset_id: String(result.info.asset_id),
            resource_type: String(result.info.resource_type),
            src: String(result.info.secure_url),
            thumbnail: String(result.info.thumbnail_url),
            format: String(result.info.format),
            height: Number(result.info.height),
            width: Number(result.info.width),
          });
          // myWidget.close();
        }
      }
    );
    myWidget.open();
  }

  return (
    <div className="p-3 flex flex-row justify-between items-center border border-solid border-light-blue-500">
      <div className="w-1/2">
        <label className="mr-2" htmlFor={name}>
          {label}
        </label>
        <input
          className="min-w-full"
          type="text"
          defaultValue={image?.src}
          name={name}
          ref={register}
        />
        <div className="mt-2">
          <p>{`File Name: ${image?.file_name}`}</p>
          {/*eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
          <img src={image?.src} alt={image?.file_name} />
        </div>
      </div>
      <div>
        <button id="upload_widget" className="cloudinary-button" onClick={(e) => openCloudinary(e)}>
          Upload file?
        </button>
      </div>
    </div>
  );
};

export default ImageInput;
