import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="bg-amber-50 border-b border-stone-400 py-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-bold">📚 Reading Tracker</h1>
          <nav className="flex gap-6">
            <Link href="/" className="text-blue-700 hover:text-blue-900 text-lg">
              Home
            </Link>
            <Link href="/books" className="text-blue-700 hover:text-blue-900 text-lg">
              Books
            </Link>
          </nav>
        </div>

        {/* Align the SignIn button to the right */}
        <div className="ml-auto">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
