import { PersonalityItem } from './PersonalityItem'
import { usePersonalityTest } from '../../hooks/queries/personalityTest'

export default function PersonalityList() {
  const personalityList = usePersonalityTest()

  const handleClickItem = (data: PersonalityItem) => {
    console.log({ data })
  }

  return (
    <ul className="gap-x-[16px] flex flex-wrap items-start px-[16px] w-full h-full select-none overflow-y-scroll">
      {personalityList.data?.map(personality => (
        <li key={personality.id} className="relative w-[calc(50%-8px)]">
          <PersonalityItem item={personality} onClick={handleClickItem} />
        </li>
      ))}
    </ul>
  )
}
