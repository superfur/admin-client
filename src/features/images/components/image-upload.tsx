import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { imageService } from '@/services/image'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

export function ImageUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const { mutate: upload, isPending } = useMutation({
    mutationFn: (file: File) => imageService.upload(file),
    onSuccess: () => {
      toast({
        title: '上传成功',
        description: '图片已成功上传',
      })
      setFile(null)
      setPreview(null)
    },
    onError: () => {
      toast({
        title: '上传失败',
        description: '上传图片时发生错误',
        variant: 'destructive',
      })
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = () => {
    if (file) {
      upload(file)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => document.getElementById('file-upload')?.click()}
          disabled={isPending}
        >
          选择图片
        </Button>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          onClick={handleUpload}
          disabled={!file || isPending}
        >
          {isPending ? '上传中...' : '上传'}
        </Button>
      </div>

      {preview && (
        <div className="relative w-full h-48">
          <img
            src={preview}
            alt="预览"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  )
} 