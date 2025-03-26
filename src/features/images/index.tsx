import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageList } from './components/image-list'

export default function ImagesPage() {
  return (
    <div className='container mx-auto py-6'>
      <Card>
        <CardHeader>
          <CardTitle>图片列表</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageList />
        </CardContent>
      </Card>
    </div>
  )
}
