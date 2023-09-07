/** @type {import('next').NextConfig} */

const { dependencies } = require('./package.json')

/**
 * 모노레포에서 사용중인 내부 패키지 네임스페이스
 */
const INTERNAL_PACKAGE_NAMESPACE = '@vrew'

/**
 * @vrew 네임스페이스의 디팬던시를 번들로 transpile하도록 지정합니다
 * @see https://turbo.build/repo/docs/handbook/sharing-code/internal-packages#6-configuring-your-app
 */
const transpilePackages = Object.keys(dependencies).filter(dependency =>
  dependency.includes(`${INTERNAL_PACKAGE_NAMESPACE}/`),
)

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cupist-resource.cupist.dev',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
