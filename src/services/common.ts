import axios from 'axios';
import { instance } from './config';

type KeyType = 'concerts' | 'users/profiles' | 'reviews';
type ExtensionType = 'jpg' | 'jpeg' | 'png' | 'webp' | 'svg' | 'gif';

const getPresignedUrl = async (key: KeyType, extension: ExtensionType) => {
  const res = await instance.get('/presigned-url', {
    params: { key, extension },
  });
  const data: {
    presignedUrl: string;
    cdnUrl: string;
  } = res.data;
  return data;
};

const uploadImageToS3 = async (url: string, file: File) => {
  const imageFormData = new FormData();
  imageFormData.append('file', file);
  const buffer = await file.arrayBuffer();

  await axios.put(url, file, {
    headers: { 'Content-Type': file.type, 'Content-Length': buffer.byteLength },
  });
};

export const getImageUrl = async ({
  key,
  file,
}: {
  key: KeyType;
  file: File | null;
}) => {
  if (!file) {
    return;
  }
  const extension = file.type.split('/').pop() as ExtensionType;

  const urls = await getPresignedUrl(key, extension);
  await uploadImageToS3(urls.presignedUrl, file);
  return urls.cdnUrl;
};
