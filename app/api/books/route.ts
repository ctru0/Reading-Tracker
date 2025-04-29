import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Book } from "@/types/book";



// GET: Retrieve all books
export async function GET() {
    try {
      const client = await clientPromise;
      const db = client.db("booksDb");
      const books = await db.collection("books").find({}).toArray();

      return NextResponse.json(books, { status: 200 });
    } catch (error) {
      console.error("Error retrieving books:", error);
      return NextResponse.json(
        { error: "Failed to retrieve books." },
        { status: 500 }
      );
    }
  }
  
  // POST: Add a new book
  export async function POST(request: Request) {
    try {
      const newBook: Omit<Book, "id"> = await request.json();
      const client = await clientPromise;
      const db = client.db("booksDb");
  
      //Get the next ID
      const lastBook = await db
        .collection("books")
        .findOne({}, { sort: { id: -1 } });
      const nextId = lastBook ? lastBook.id + 1 : 1;
  
      const bookToInsert = { ...newBook, id: nextId };
      const result = await db.collection("books").insertOne(bookToInsert);
  
      if (!result.acknowledged) {
        throw new Error("Failed to add new book");
      }
      
      return NextResponse.json(bookToInsert, { status: 201 });

    } catch (error) {
      console.error("Error adding book:", error);
      return NextResponse.json(
        { error: "Failed to add book." },
        { status: 500 }
      );
    }
  }