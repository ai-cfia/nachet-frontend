import { useEffect, useState } from "react";
import UTIF from "utif";
import { BlobError, DecodeError, FetchError } from "../common";

export interface DecodedTiff {
  rgba: Uint8Array;
  width: number;
  height: number;
}

const useDecoderTiff = (imageSrc: string) => {
  const [decodedTiff, setDecodedTiff] = useState<DecodedTiff>({
    rgba: new Uint8Array(0),
    width: 0,
    height: 0,
  });
  useEffect(() => {
    const decodeTiff = async (): Promise<DecodedTiff> => {
      let decodedTiff = {
        rgba: new Uint8Array(0),
        width: 0,
        height: 0,
      };
      if (!imageSrc.includes("image/tiff")) {
        return decodedTiff;
      }
      try {
        // Convert base64 to bytes
        const file = await fetch(imageSrc)
          .then(async (res) => {
            if (!res.ok) {
              throw new FetchError("decodeTiff - Failed to fetch TIFF file");
            }
            return await res.blob();
          })
          .then(async (blob) => {
            if (blob.size === 0) {
              throw new BlobError("decodeTiff - Invalid blob size from api");
            }
            return new File([blob], "file", { type: "image/tiff" });
          });
        const bytes = await file.arrayBuffer();

        // Decode image
        const ifds = UTIF.decode(bytes);
        if (ifds.length === 0) {
          throw new DecodeError("decodeTiff - Failed to decode TIFF array");
        }
        UTIF.decodeImage(bytes, ifds[0]);
        if (
          ifds[0].width < 1 ||
          ifds[0].height < 1 ||
          ifds[0].data.length === 0
        ) {
          throw new DecodeError("decodeTiff - Invalid image size or data");
        }
        const rgba = UTIF.toRGBA8(ifds[0]);
        if (rgba.length === 0) {
          throw new DecodeError("decodeTiff - Failed to convert TIFF to RGBA");
        }
        decodedTiff = {
          rgba,
          width: ifds[0].width,
          height: ifds[0].height,
        };
      } catch (error) {
        console.error("Error in decodeTiff - ", error);
      }
      return decodedTiff;
    };
    void decodeTiff().then((dTiff: DecodedTiff) => {
      setDecodedTiff(dTiff);
    });
  }, [imageSrc]);

  return decodedTiff;
};

export default useDecoderTiff;
