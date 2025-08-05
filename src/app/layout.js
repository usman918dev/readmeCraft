import "./globals.css";
import "./github-markdown.css";

export const metadata = {
  title: "ReadmeCraft - Modern GitHub README Builder",
  description: "Create beautiful GitHub README.md files with a modern, Canva-style editor interface",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
