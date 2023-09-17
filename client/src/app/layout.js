import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Chat You",
  description: "Chat You",
  icons: {
    icon: "/chat-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
