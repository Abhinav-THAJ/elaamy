import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_WOO_URL;
    const wpUsername = process.env.WP_USERNAME;
    const wpAppPassword = process.env.WP_APPLICATION_PASSWORD;

    if (!siteUrl || !wpUsername || !wpAppPassword) {
      return NextResponse.json({ error: "Server misconfiguration: Missing WP credentials" }, { status: 500 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize filename: remove spaces and special chars
    const safeFileName = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.\-_]/g, "");

    // WordPress REST API endpoint for media
    const wpUrl = `https://${siteUrl}/wp-json/wp/v2/media`;

    // Basic auth: works with both Application Passwords (spaces removed) AND regular passwords
    // WordPress Application Passwords can be used with or without spaces in the token
    const credentials = `${wpUsername}:${wpAppPassword.replace(/\s/g, "")}`;
    const base64Credentials = Buffer.from(credentials).toString("base64");

    console.log(`Uploading to: ${wpUrl}`);
    console.log(`Auth user: ${wpUsername}`);

    const response = await fetch(wpUrl, {
      method: "POST",
      headers: {
        "Content-Disposition": `attachment; filename="${safeFileName}"`,
        "Content-Type": file.type,
        "Authorization": `Basic ${base64Credentials}`,
      },
      body: buffer,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("WP Media Upload Error:", JSON.stringify(data));
      return NextResponse.json(
        {
          error: data.message || "Failed to upload to WordPress",
          code: data.code,
          hint: data.code === "rest_cannot_create"
            ? "Your WordPress user does not have the 'upload_files' capability. Please use a WordPress Application Password (not your login password). Go to WP Admin > Users > Profile > Application Passwords to generate one."
            : undefined,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      url: data.source_url,
      id: data.id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
