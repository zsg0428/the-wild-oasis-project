import {auth} from "@/app/_lib/auth";
import SignOutButton from "@/app/_components/SignOutButton";

export const metadata = {
    title: "Guest area",
};

const Page = async () => {
    const session = await auth()
    const firstName = session.user.name.split(' ')[0]
    return (
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
            Welcome {firstName}
        </h2>
    );
};

export default Page;
