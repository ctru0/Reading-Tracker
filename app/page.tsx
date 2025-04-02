import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export default async function Home() {
	return (
		<main>
			<Header />
			<div className='absolute top-1/2 left-1/2 -translate-1/2 text-gray-800 flex items-center justify-center w-full flex-col gap-2'>
			<img src="/worm.jpg" className='w-50 h-50'></img>
				<h1 className='text-5xl font-bold'>Reading Tracker</h1>
				<p className='mt-4 text-lg'>Log the books you've read, share your ratings and thoughts</p>
				<p className='text-lg'>Add a new book listing, edit books, and delete</p>
				<Link href="books" className='mt-4'>
					<Button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-3xl px-5 py-7 text-center me-2 mb-2" >
					Open Reading Tracker
					</Button>
				</Link>
			</div>
		</main>
	);
}
