/** @type {import('next').NextConfig} */

const { dependencies } = require("./package.json");

/**
 * @vrew 네임스페이스의 디팬던시를 필터링 합니다.
 */
const transpilePackages = Object.keys(dependencies).filter((dependency) =>
  dependency.includes("@vrew/")
);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages,
};

module.exports = nextConfig;
