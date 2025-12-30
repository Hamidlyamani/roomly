import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const data = await req.formData();
  const files = data.getAll("files");

  const urls = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    await writeFile(filePath, buffer);
    urls.push(`/uploads/${fileName}`);
  }

  return Response.json(urls);
}
