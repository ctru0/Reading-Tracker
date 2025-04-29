import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Book } from "@/types/book";



// GET: Retrieve book by ID
export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> } // Await params
  ) {
    try {
      const { id } = await context.params; // Await params before accessing
      const bookId = parseInt(id, 10);
  
      if (isNaN(bookId)) {
        return NextResponse.json(
          { error: "Invalid book ID." },
          { status: 400 }
        );
      }
  
      const client = await clientPromise;
      const db = client.db("booksDb");
      const book = await db.collection("books").findOne({ id: bookId });
  
      if (!book) {
        return NextResponse.json({ error: "Book not found." }, { status: 404 });
      }
  
      return NextResponse.json(book, { status: 200 });
    } catch (error) {
      console.error("Error retrieving book:", error);
      return NextResponse.json(
        { error: "Failed to retrieve book." },
        { status: 500 }
      );
    }
  }

// PUT: Update a book by ID
export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> } // Await params
  ) {
    try {
      const { id } = await context.params; // Await params before accessing
      const bookId = parseInt(id, 10);
      if (isNaN(bookId)) {
        return NextResponse.json(
          { error: "Invalid book ID." },
          { status: 400 }
        );
      }
  
      const updatedBook: Partial<Book> = await request.json();
      const client = await clientPromise;
      const db = client.db('booksDb');
  
      const book = await db.collection('books').findOneAndReplace(
        { id: bookId },
        {
          id: updatedBook.id,
          title: updatedBook.title,
          author: updatedBook.author,
          rating: updatedBook.rating,
          comments: updatedBook.comments,
        }
      );
  
      if (!book) {
        return NextResponse.json({ error: 'Book not found.'}, { status: 404});
      }
  
      return NextResponse.json(book, { status: 200 });
    } catch (error) {
      console.error("Error updating book:", error);
      return NextResponse.json(
        { error: "Failed to update book." },
        { status: 500 }
      );
    }
  }

// DELETE: Remove a book by ID
export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> } // Await params
  ) {
    try {
      const { id } = await context.params; // Await params before accessing
      const bookId = parseInt(id, 10);
      if (isNaN(bookId)) {
        return NextResponse.json(
          { error: "Invalid book ID." },
          { status: 400 }
        );
      }
  
      const client = await clientPromise;
      const db = client.db("booksDb");
      let books = await db.collection('books').find({}).toArray();
  
      const initialLength = books.length;
      books = books.filter((b) => b.id !== bookId);

      if (books.length === initialLength) {
        return NextResponse.json({ error: "Book not found." }, { status: 404 });
      }
  
      await db.collection ('books').findOneAndDelete({ id: bookId});

      return NextResponse.json(
        { message: `Book listing with ID ${bookId} deleted.` },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting book:", error);
      return NextResponse.json(
        { error: "Failed to delete book listing." },
        { status: 500 }
      );
    }
  }