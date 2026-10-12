import { assetUrl } from "../src/asset-url";
import "./globals.css";
import "./atlas.css";
export const metadata = {
  title: "Kaplum Studio",
  icons: {
    icon: [
      { url: assetUrl("/favicon.svg"), type: "image/svg+xml" },
      { url: assetUrl("/favicon.ico"), sizes: "16x16 32x32 48x48" },
    ],
    apple: assetUrl("/apple-touch-icon.png"),
  },
  description: "Explore Turtle examples and learn by creating.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
