import localFont from "next/font/local";
import "./globals.css";


export const geistMono = localFont({
  src: [
    {
      path: "../../public/fonts/Geist.ttf",
      weight: "400",
      style: "normal",
    }
  ],
});

export const metadata = {
  title: "Roomly",
  description: "Trouve le logement parfait grâce à notre IA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>

      </head>
      <body className={geistMono.className}      >
        <div className=" ">
          {children}
        </div>
      </body>
    </html>
  );
}
