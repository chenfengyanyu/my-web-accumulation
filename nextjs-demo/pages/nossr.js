import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(import('./image'), {
  ssr: false
})

export default () =>
  <div>
    <DynamicComponentWithNoSSR />
    <p>Hello Jartto!</p>
  </div>