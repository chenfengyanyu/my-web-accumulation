import axios from 'axios';

const Page = ({ stars }) =>
  <div>
    Next stars: {stars}
  </div>

Page.getInitialProps = async ({ req }) => {
  const res = await axios.get('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return { stars: res }
}

export default Page