/**
 *  Converts a file to a base64 string and returns a promise with the result string inside it. If the file is `null` or `undefined`, an empty string is returned.
 * @param file The file to convert
 * @returns A promise with the base64 string
 */
export const fileToBase64 = async (file: File | null | undefined) => {
  if (!file) return "";

  const reader = new FileReader();
  reader.readAsDataURL(file);
  const data = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

  return data as string;
};

/**
 * Converts a base64 string to a file and returns a promise with the result file inside it.
 * @param base64 The base64 string to convert
 * @param fileName The name of the file
 * @param type The type of the file
 * @example bas64ToFile("data:image/png;base64,...", "test.png", "image/png")
 * @returns A promise with the file
 */
export const base64ToFile = async (base64: string, fileName: string, type?: string) => {
  const res = await fetch(base64);
  const blob = await res.blob();
  return new File([blob], fileName, { type });
};
