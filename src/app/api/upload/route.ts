import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret || cloudName === "your_cloud_name") {
      return NextResponse.json({ error: "Cloudinary credentials not configured" }, { status: 500 });
    }

    // Convert file to arrayBuffer and then to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert to Base64 to send to Cloudinary API
    const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;

    const timestamp = Math.floor(Date.now() / 1000);
    
    // Parameters to sign
    const paramsToSign: Record<string, string> = {
      timestamp: String(timestamp),
    };

    // Sort parameters alphabetically
    const sortedKeys = Object.keys(paramsToSign).sort();
    const paramString = sortedKeys.map(k => `${k}=${paramsToSign[k]}`).join("&");
    
    // Generate signature: SHA-1 of paramString + API secret
    const signature = crypto
      .createHash("sha1")
      .update(paramString + apiSecret)
      .digest("hex");

    // Construct FormData for Cloudinary request
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", base64File);
    cloudinaryFormData.append("api_key", apiKey);
    cloudinaryFormData.append("timestamp", String(timestamp));
    cloudinaryFormData.append("signature", signature);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    
    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: cloudinaryFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `Cloudinary upload failed: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({
      imageurl: data.secure_url,
      public_id: data.public_id,
    });
  } catch (error: unknown) {
    console.error("Cloudinary upload route error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
