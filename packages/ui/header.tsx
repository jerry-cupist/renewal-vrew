import { Text } from './Typography'

export function Header({ text }: { text: string }): JSX.Element {
  return <Text variant="title2"> {text}</Text>
}
