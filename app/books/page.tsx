import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import BookCard from '@/components/BookCard';

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string,
  rating: string;
  comments: string;
}

// This is a Server Component that fetches data
async function getBooks(): Promise<Book[]> {
  try {
    // Use relative URL for API routes in the same Next.js app
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const res = await fetch(`${baseUrl}/api/books`, {
      cache: "no-store", // Disable caching for this request
    });
    
    if (!res.ok) {
      console.error('API response error:', await res.text());
      throw new Error(`Failed to fetch books: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    return []; // Return empty array on error to prevent UI from breaking
  }
}

const Home: FC = async () => {
  const books = await getBooks();
  
  return (
    <div>
      <Header />

      <SignedOut>
          <div className="absolute top-1/2 left-1/2 -translate-1/2 text-gray-800 flex items-center justify-center w-full flex-col gap-2">
            <h1 className='text-5xl font-bold'>Sign in to view your books</h1>
            <SignInButton mode="modal">
              <button className="mt-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-xl px-6 py-4 text-center me-2 mb-2">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>

      <SignedIn>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text-center">Reading Tracker: All Books</h1>
          <Link href="/books/add" className="text-3xl">
            <Button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">
              + Add New Book
            </Button>
          </Link>
        </div>
        
        {books.length === 0 ? (
          <p className="text-center text-gray-500">No books available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>
      </SignedIn>
    </div>
  );
};

export default Home;
