/** @type {import('next').NextConfig} */

const { dependencies } = require("./package.json");

/**
 * @vrew 네임스페이스의 디팬던시를 번들로 transpile하도록 지정합니다
 * @see https://turbo.build/repo/docs/handbook/sharing-code/internal-packages#6-configuring-your-app
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
