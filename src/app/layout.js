import "./globals.css";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
