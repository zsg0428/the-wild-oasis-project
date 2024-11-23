import Header from "./_components/Header";


import "@/app/_styles/globals.css";
import {Analytics} from "@vercel/analytics/react"
// Font step 1:
import {Josefin_Sans} from "next/font/google";
import {ReservationProvider} from "@/app/_components/ReservationContext";
// Step 2:
const josefin = Josefin_Sans({
    subsets: ["latin"],
    display: "swap",
});
// Step 3, use it in the html down there
console.log(josefin);
export const metadata = {
    // title: "The Wild Oasis",
    title: {
        template: "%s / The Wild Oasis",
        default: "Welcome / The Wild Oasis",
    },
    description:
        "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

const RootLayout = ({children}) => {
    return (
        <html lang="en">
        <body
            className={`antialiased bg-primary-950 text-primary-100 min-h-screen ${josefin.className} flex flex-col relative `}
        >
        <Header/>
        <div className="flex-1 px-8 py-12 grid ">
            <main className="max-w-7xl mx-auto w-full">
                <ReservationProvider>
                    {children}
                </ReservationProvider>
            </main>
        </div>
        </body>
        </html>
    );
};

export default RootLayout;
