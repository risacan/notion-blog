import '../styles/global.css'
import ExtLink from '../components/ext-link'

export default ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />

    <footer>
      <ExtLink href="https://risacan.net">risacan ✌️</ExtLink>
    </footer>
  </>
)
