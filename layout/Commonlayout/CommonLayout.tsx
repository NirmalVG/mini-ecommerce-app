import Footer from "./Footer/Footer"
import Header from "./Header/Header"

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}

export default CommonLayout
