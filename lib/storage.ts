import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

// For Railway deployment, we'll use a temporary solution
// In production, you should use AWS S3, Cloudinary, or similar
export async function saveFile(file: File, folder: string = 'uploads'): Promise<string> {
  // In Railway, we'll save to /tmp which is ephemeral but works for demo
  const uploadDir = process.env.NODE_ENV === 'production' 
    ? join('/tmp', folder)
    : join(process.cwd(), folder)
  
  try {
    await mkdir(uploadDir, { recursive: true })
  } catch (error) {
    // Directory might already exist
  }

  const fileExtension = file.name.split('.').pop()
  const uniqueFileName = `${uuidv4()}.${fileExtension}`
  const filePath = join(uploadDir, uniqueFileName)

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  await writeFile(filePath, buffer)

  return filePath
}
