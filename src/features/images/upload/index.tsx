import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageUpload } from './components/image-upload'

export default function UploadPage() {
  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>上传图片</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUpload />
        </CardContent>
      </Card>
    </div>
  )
}