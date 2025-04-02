"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Book } from "@/types/book";

interface EditBookPageProps {
  params: {
    id: string;
  };
}

export default function EditBookPage({ params }: EditBookPageProps) {
  const router = useRouter();
  // Note: On client components, we don't need to await params since they're already resolved
  const bookId = parseInt(params.id, 10);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Book>>({
    title: "",
    author: "",
    rating: "",
    comments: ""
  });

  // Fetch the book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/books/${bookId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }
        
        const book: Book = await response.json();
        
        // Extract /10 from rating
        let total = book.rating;
        if (total && total.includes("/10 ⭐")) {
          total = total.replace("/10 ⭐", "");
        }
        
        setFormData({
          ...book,
          rating: total
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to load book. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Format the rating to include total rating 
      const dataToSubmit = {
        ...formData,
        id: bookId,
        rating: formData.rating ? `${formData.rating}/10 ⭐` : undefined
      };

      const response = await fetch(`/api/books/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error("Failed to update book listing");
      }

      // Redirect to book details page after successful update
      router.push(`/books/${bookId}`);
      router.refresh(); // Refresh the page data
    } catch (error) {
      console.error("Error updating listing:", error);
      setError("Failed to update listing. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <p>Loading book listing information...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-stone-300">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Edit Book</h1>
            <Link href={`/books/${bookId}`}>
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

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
                value={formData.title || ""}
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
                value={formData.author || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="enter author name here"
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
                value={formData.rating || ""}
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
                value={formData.comments || ""}
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
                disabled={saving}
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 