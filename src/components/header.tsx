import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'
import { existsGaId, GA_TRACKING_ID } from '../lib/gtag'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Blog', page: '/' },
  // TODO: 外部リンク貼ったら消す
  // { label: 'Home', page: '/' },
  // { label: 'Blog', page: '/blog' },
  // { label: 'Contact', page: '/contact' },
  // { label: 'Source Code', link: 'https://github.com/ijjk/notion-blog' },
]

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

export default ({ titlePre = '' }) => {
  const { pathname } = useRouter()

  return (
    <header className={styles.header}>
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} blog.risacan.net</title>
        <meta
          name="description"
          content="An example Next.js site using Notion for the blog"
        />
        <meta name="og:title" content="blog.risacan.net" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@_risacan_" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
        {/* Google Analytics */}
        {existsGaId ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });`,
              }}
            />
          </>
        ) : null}
      </Head>
      <ul>
        {navItems.map(({ label, page, link }) => (
          <li key={label}>
            {page ? (
              <Link href={page}>
                <a className={pathname === page ? 'active' : undefined}>
                  {label}
                </a>
              </Link>
            ) : (
              <ExtLink href={link}>{label}</ExtLink>
            )}
          </li>
        ))}
      </ul>
    </header>
  )
}
