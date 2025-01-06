import { instance } from './config';

type KeyType = 'concerts' | 'users/profiles' | 'reviews';
type ExtensionType = 'jpg' | 'jpeg' | 'png' | 'webp' | 'svg' | 'gif';

const getPresignedUrl = async (key: KeyType, extension: ExtensionType) => {
  const params = new URLSearchParams({ key, extension });
  const res = await instance.get<{
    presignedUrl: string;
    cdnUrl: string;
  }>(`/v1/common/image/presigned-url?${params}`, { cache: 'no-store' });
  return res;
};

const uploadImageToS3 = async (url: string, file: File) => {
  const imageFormData = new FormData();
  imageFormData.append('file', file);
  const buffer = await file.arrayBuffer();

  await fetch(url, {
    method: 'PUT',
    cache: 'no-store',
    body: file,
    headers: {
      'Content-Type': file.type,
      'Content-Length': String(buffer.byteLength),
    },
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
  let extension = file.type.split('/').pop();
  if (extension === 'svg+xml') {
    extension = 'svg';
  }

  const urls = await getPresignedUrl(key, extension as ExtensionType);
  await uploadImageToS3(urls.presignedUrl, file);
  return urls.cdnUrl;
};
