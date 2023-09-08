import Image, { ImageProps } from 'next/image'

interface Props extends Omit<ImageProps, 'src'> {
  size: number
  src?: string
}

const defaultImageSrc = '/default.png'

const ProfileImage = function ({ size, alt, src, ...props }: Props) {
  return (
    <Image
      src={src || defaultImageSrc}
      width={size}
      height={size}
      alt={alt}
      className="shrink-0 rounded-[50%] bg-gray-100  object-cover overflow-hidden w-[96px] h-[96px] box-border"
      {...props}
    />
  )
}

export default ProfileImage
