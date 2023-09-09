import { GetPersonalityTest } from '@vrew/apis/enfpy/personality'
import { Text } from '@vrew/ui'
import Image from 'next/image'
import { MouseEventHandler, useCallback } from 'react'

export interface PersonalityItem extends GetPersonalityTest<'v2'> {}

interface PersonalityItemProps {
  item: PersonalityItem
  onClick?: (item: PersonalityItem) => void
}

export const PersonalityItem = ({ item, onClick }: PersonalityItemProps) => {
  const handleClick: MouseEventHandler = useCallback(
    event => {
      event.stopPropagation()
      onClick?.(item)
    },
    [item, onClick],
  )

  if (!item.thumbnailPath) {
    return null
  }

  return (
    <button onClick={handleClick} className="relative w-full h-full basis-1/2">
      <div className="relative w-full pb-[100%]">
        <Image
          className="absolute object-cover rounded bg-slate-300"
          src={item.thumbnailPath || ''}
          fill
          alt={item.title}
        />
      </div>
      <div>
        <Text variant="title2" color="black" className="text-[15px]">
          {item.title}
        </Text>
        <Text variant="subtitle2" color="black" className="text-[10px]">
          {item.subtitle}
        </Text>
      </div>
    </button>
  )
}
