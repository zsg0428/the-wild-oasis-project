/* import {NextResponse} from "next/server";

export const middleware = (request) => {
    console.log(request)

    return NextResponse.redirect(new URL('/about', request.url))
}

*/

import {auth} from "@/app/_lib/auth";

export const middleware = auth
export const config = {
    // 这里是说当你的url match the following urls, it gets redirected
    matcher: ['/account']

}