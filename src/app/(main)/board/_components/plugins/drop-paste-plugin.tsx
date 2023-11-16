import { useEffect } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { DRAG_DROP_PASTE } from "@lexical/rich-text";
import { isMimeType, mediaFileReader } from "@lexical/utils";
import { COMMAND_PRIORITY_LOW } from "lexical";
import AWS from "aws-sdk";

import { INSERT_IMAGE_COMMAND } from "./image-plugin";

const DATA_URL_REGEX = /^data:image\/\w+;base64,/;

const ACCEPTABLE_IMAGE_TYPES = [
  "image/",
  "image/heic",
  "image/heif",
  "image/gif",
  "image/webp",
];

AWS.config.update({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET,
});

export default function DragDropPaste(): null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        (async () => {
          const filesResult = await mediaFileReader(
            files,
            ACCEPTABLE_IMAGE_TYPES.flatMap((type) => type)
          );
          if (filesResult.length !== 1) {
            //TODO : Toast Error
            console.log("하나의 파일만 등록이 가능합니다.");
            return;
          }

          const { file, result } = filesResult[0];
          if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
            const dataURL = result;
            const imageFile = Buffer.from(
              dataURL.replace(DATA_URL_REGEX, ""),
              "base64"
            );
            const type = dataURL.split(";")[0].split("/")[1];
            const fileName = file.name;

            const bucket = new AWS.S3();

            const s3Object = {
              Key: `front-test/${fileName}`,
              Body: imageFile,
              ContentEncoding: "base64",
              Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET!,
              ContentType: `image/${type}`,
            };

            const response = await bucket.upload(s3Object).promise();
            const resURL = response?.Location ?? "";

            if (!!resURL) {
              editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                altText: file.name,
                src: resURL,
              });
            } else {
              return;
            }
          }

          /* for (const { file, result } of filesResult) {
            if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {

              editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                altText: file.name,
                src: result,
              });
            }
          } */
        })();
        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  return null;
}
