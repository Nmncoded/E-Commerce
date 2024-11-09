import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes for auth pages and GET API requests
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  // API routes with GET method
  "/api/(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  // Allow public access to GET requests to API routes
  if (request.method === "GET" && request.url.includes("/api/")) {
    return;
  }

  // Check if route is public
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
