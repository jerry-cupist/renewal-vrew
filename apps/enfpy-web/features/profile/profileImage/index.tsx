import Image, { ImageProps } from 'next/image'

interface Props extends ImageProps {}

// width: 96px;
// height: 96px;
// border-radius: 50%;
// overflow: hidden;
// box-sizing: border-box;
// flex-shrink: 0;

// img {
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// }

/**
 *  'https://cupist-resource.cupist.dev/enfpy/user/2426/profile/2426/d075dd95-21d4-58f7-94e0-f02c8d68d965.jpg'
 * @param props
 * @returns
 */
const ProfileImage = function (props: Props) {
  return <Image {...props} />
}

export default ProfileImage
