//grants access to user authentication state throughout the app
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//delete this if using the protected pages
//export default clerkMiddleware();

//protected pages
const isProtectedRoute = createRouteMatcher([
    '/books/[id]',  
    '/books/[id]/edit',
  ]);

// checks for login
export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();
});
  

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};