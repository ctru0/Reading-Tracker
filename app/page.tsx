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
					<Button className="px-10 py-7 rounded-full bg-blue-100 text-blue-800 text-2xl font-semibold hover:bg-blue-200 transition" >
					Open Reading Tracker
					</Button>
				</Link>
				
			</div>
		</main>
	);
}
