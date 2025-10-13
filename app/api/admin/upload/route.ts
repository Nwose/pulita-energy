import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Read file as buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Check file size (limit to 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (buffer.length > maxSize) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 10MB." },
      { status: 400 }
    );
  }

  try {
    console.log(`Uploading file of size: ${buffer.length} bytes`);

    // Use Cloudinary's upload_stream with timeout handling
    const result: any = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Upload timeout after 30 seconds"));
      }, 30000); // 30 second timeout

      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          timeout: 30000,
          // Remove conflicting format and quality params when using resource_type: auto
        },
        (error, result) => {
          clearTimeout(timeout);
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    if (!result || !result.secure_url) {
      return NextResponse.json(
        { error: "Upload failed, no secure_url returned" },
        { status: 500 }
      );
    }

    console.log("Upload successful:", result.secure_url);
    return NextResponse.json({ url: result.secure_url });
  } catch (err: any) {
    console.error("Cloudinary upload error:", err);

    // Handle specific error types
    if (err.message?.includes("timeout")) {
      return NextResponse.json(
        { error: "Upload timeout. Please try again with a smaller file." },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
