import React from 'react'
import Picker, { SelectedIcon } from './Picker'
import { icons, variants } from './iconsax-dataset'

const App: React.FC = () => {
  const [value, setValue] = React.useState<SelectedIcon | undefined>()

  return (
    <>
      <Picker icons={icons} variants={variants} value={value} setValue={setValue} />
    </>
  )
}

export default App
