import { Box, Flex, Button, Label, Text, Image } from 'theme-ui';
import { LegacyRef, FormEvent } from 'react';
import { Image as ImageType } from '../../data/types';

interface ImageInputProps {
  image: ImageType;
  name: string;
  register: LegacyRef<HTMLInputElement>;
  setImage: Function;
}

const ImageInput: React.FC<ImageInputProps> = ({ image, register, setImage, name }) => {
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
    <Flex
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #ccc',
        p: 3,
      }}
    >
      <Box>
        <Label htmlFor={name}>Space Image</Label>
        <input defaultValue={image?.src} name={name} ref={register} spellCheck size={50} />
        <Box sx={{ mt: 2, maxWidth: '300px' }}>
          <Text sx={{ p: 2 }}>{`File Name: ${image?.file_name}`}</Text>
          <Image src={image?.src} alt={image?.file_name} />
        </Box>
      </Box>
      <Box>
        <Button id="upload_widget" className="cloudinary-button" onClick={(e) => openCloudinary(e)}>
          Upload file?
        </Button>
      </Box>
    </Flex>
  );
};

export default ImageInput;
