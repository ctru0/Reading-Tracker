import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card className="h-full flex flex-col bg-amber-50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{book.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-gray-700 font-bold">By {book.author}</p>
        <p className="mt-4 text-gray-600">Rating: {book.rating}</p>
        <p className="mt-4 text-gray-500">{book.comments}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/books/${book.id}`} className="w-full">
          <Button className="focus:outline-none text-white bg-stone-500 hover:bg-stone-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >
            View Book
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
} 