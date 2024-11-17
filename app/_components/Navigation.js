import Link from "next/link";
import {auth} from "@/app/_lib/auth";

export default async function Navigation() {

    // getting the user info from the auth that we exported earlier in auth.js
    const session = await auth()

    return (
        <nav className="z-10 text-xl">
            <ul className="flex gap-16 items-center">
                <li>
                    <Link
                        href="/cabins"
                        className="hover:text-accent-400 transition-colors"
                    >
                        Cabins
                    </Link>
                </li>
                <li>
                    <Link
                        href="/about"
                        className="hover:text-accent-400 transition-colors"
                    >
                        About
                    </Link>
                </li>

                <li>
                    {session?.user?.image ? <Link
                        href="/account"
                        className="hover:text-accent-400 transition-colors flex items-center gap-4"
                    >
                        <img className='h-8 rounded-full' src={session.user.image} alt="user image"
                             referrerPolicy='no-referrer'/>
                        <span>
                        Guest area
                      </span>
                    </Link> : <Link
                        href="/account"
                        className="hover:text-accent-400 transition-colors"
                    >
                        Guest area
                    </Link>}

                </li>
            </ul>
        </nav>
    );
}
