import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(import('./image'))

export default () =>
  <div>
    <DynamicComponent />
    <p>HOME PAGE is here!</p>
  </div>