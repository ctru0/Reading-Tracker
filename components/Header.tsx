import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="bg-amber-50">
      {/* Top section with title and auth controls */}
      <div className="container mx-auto flex items-center justify-between py-10">
        <h1 className="text-3xl font-bold">📚 Reading Tracker</h1>

        {/* Right side: Auth buttons */}
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
        </div>
      </div>

      {/* blue banner */}
      <div className="bg-blue-100">
        <nav className="container mx-auto flex justify-center gap-8 py-2">
          <Link href="/" className="text-blue-700 hover:text-blue-900 text-lg font-bold">
            Home
          </Link>
          <Link href="/books" className="text-blue-700 hover:text-blue-900 text-lg font-bold">
            Books
          </Link>
        </nav>
      </div>
    </header>
  );
}
