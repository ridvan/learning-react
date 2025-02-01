import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "@/app/_components/Header";
import { ReservationProvider } from "@/app/_components/ReservationContext";

const josefin = Josefin_Sans({
  display: "swap",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "The Wild Oasis",
  },
  description:
    "Luxury and comfort in the heart of nature, The Wild Oasis offers cabins for rent in the beautiful wilderness of Sapanca.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-gray-50 min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
