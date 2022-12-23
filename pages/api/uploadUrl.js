// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import aws from "aws-sdk";
import crypto from "crypto";
import { promisify } from "util";

const randomBytes = promisify(crypto.randomBytes);
const region = "us-east-1";
const bucketName = "testbucket17320";
const accessKeyId = process.env.AWSACCESSKEYID;
const secretAccessKey = process.env.AWSSECRETACCESSKEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = "public/" + rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

export default async function handler(req, res) {
  try {
    const url = await generateUploadURL();
    res.send({ url });
  } catch (err) {
    res.send({ err });
  }
}
