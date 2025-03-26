import { useState } from 'react'
import { imageService } from '@/services/image'
import { useDropzone } from 'react-dropzone'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'

export function ImageUpload() {
  const [isUploading, setIsUploading] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: async (acceptedFiles: File[]) => {
      try {
        setIsUploading(true)
        for (const file of acceptedFiles) {
          await imageService.upload(file)
          toast({
            title: '上传成功',
            description: `文件 ${file.name} 已上传`,
          })
        }
      } catch (_error) {
        toast({
          title: '上传失败',
          description: '请稍后重试',
          variant: 'destructive',
        })
      } finally {
        setIsUploading(false)
      }
    },
  })

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25'
      }`}
    >
      <input {...getInputProps()} />
      <div className='space-y-4'>
        <div className='text-4xl'>📸</div>
        <div className='text-lg font-medium'>
          {isDragActive ? '释放文件以上传' : '拖拽文件到此处或点击上传'}
        </div>
        <div className='text-sm text-muted-foreground'>
          支持 PNG、JPG、JPEG、GIF、WEBP 格式，单个文件最大 5MB
        </div>
        <Button disabled={isUploading}>
          {isUploading ? '上传中...' : '选择文件'}
        </Button>
      </div>
    </div>
  )
}
