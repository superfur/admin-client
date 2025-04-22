export const qiniuConfig = {
  // 七牛云配置
  accessKey: process.env.QINIU_ACCESS_KEY || '',
  secretKey: process.env.QINIU_SECRET_KEY || '',
  bucket: process.env.QINIU_BUCKET || '',
  domain: process.env.QINIU_DOMAIN || '',
  // 上传配置
  uploadConfig: {
    region: 'z0', // 存储区域
    useCdnDomain: true, // 是否使用 CDN 加速
    disableStatisticsReport: false, // 是否禁用日志统计
    retryCount: 3, // 上传重试次数
    concurrentRequestLimit: 3, // 分片上传的并发请求量
  },
};