import Link from 'next/link'

export default () =>
  <div>
    Click{' '}
    <Link href={{ pathname: '/image', query: { name: 'Jartto' } }} replace>
      <a> here </a>
    </Link>
    to read more
  </div>