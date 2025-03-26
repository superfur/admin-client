import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { imageService, Image } from '@/services/image'
import { Button } from '@/components/ui/button'
import { Image as ImageComponent } from '@/components/ui/image'
import { toast } from '@/components/ui/use-toast'

export function ImageList() {
  const [page, setPage] = useState(1)
  const pageSize = 12

  const { data, isLoading } = useQuery({
    queryKey: ['images', page, pageSize],
    queryFn: () => imageService.getList(page, pageSize),
  })

  const handleDelete = async (id: string) => {
    try {
      await imageService.delete(id)
      toast({
        title: '删除成功',
        description: '图片已成功删除',
      })
    } catch (_error) {
      toast({
        title: '删除失败',
        description: '删除图片时发生错误',
        variant: 'destructive',
      })
    }
  }

  if (isLoading) {
    return <div>加载中...</div>
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.data.map((image: Image) => (
          <div key={image.id} className="relative group">
            <ImageComponent
              src={image.url}
              alt={image.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="destructive"
                onClick={() => handleDelete(image.id)}
              >
                删除
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-2">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          上一页
        </Button>
        <Button
          variant="outline"
          onClick={() => setPage((p) => p + 1)}
          disabled={!data || page * pageSize >= data.total}
        >
          下一页
        </Button>
      </div>
    </div>
  )
} 