import localFont from "next/font/local";
import "./globals.css";


const fontInterVariable = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-interVariable",
})

export const metadata = {
  title: "AgroExchange",
  description: "Forecasting rapeseed oil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={fontInterVariable.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
