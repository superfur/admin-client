export const QINIU_CONFIG = {
  // 七牛云配置
  accessKey: process.env.VITE_QINIU_ACCESS_KEY || '',
  secretKey: process.env.VITE_QINIU_SECRET_KEY || '',
  bucket: process.env.VITE_QINIU_BUCKET || '',
  domain: process.env.VITE_QINIU_DOMAIN || '',
  region: process.env.VITE_QINIU_REGION || 'z0', // 存储区域，默认华东
}