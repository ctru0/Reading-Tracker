"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function AddBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    rating: "",
    comments: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format the rating to include total rating 
      const dataToSubmit = {
        ...formData,
        rating: formData.rating ? `${formData.rating}/10 ⭐` : undefined
      };

      const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
      const response = await fetch(`${baseUrl}/api/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      // Redirect to books page after successful creation
      router.push("/books");
      router.refresh(); // Refresh the page data
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-300">
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
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Add New Book</h1>
            <Link href="/books">
              <Button variant="outline">Back to Books</Button>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div className="space-y-2">
              <label htmlFor="title" className="block font-medium">
                Book Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="enter title here"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="author" className="block font-medium">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                id="author"
                name="author"
                type="text"
                required
                value={formData.author}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="enter author name here"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="genre" className="block font-medium">
                Genre <span className="text-red-500">*</span>
              </label>
              <input
                id="genre"
                name="genre"
                type="text"
                required
                value={formData.genre || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="enter book genre here"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="rating" className="block font-medium">
                Rating (from 1-10)
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                value={formData.rating}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="enter a rating number from 1 - 10"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="comments" className="block font-medium">
                Comments <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comments"
                name="comments"
                required
                value={formData.comments}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your thoughts and comments on the book"
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="focus:outline-none text-white bg-stone-500 hover:bg-stone-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                disabled={loading}
              >
                {loading ? "Adding book..." : "Add Book"}
              </Button>
            </div>
          </form>
        </div>
      </main>
      </SignedIn>
      
    </div>
  );
} 