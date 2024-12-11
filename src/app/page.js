"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { House } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login"); // Redirect to the login page
    }
  }, [session, router]);

  if (!session) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/4 p-4">
          <ul className="menu bg-gray-100 rounded-box">
            <li>
              <a>
                <House /> Home
              </a>
            </li>
            <li>
              <a>Explore</a>
            </li>
            <li>
              <a>Notifications</a>
            </li>
            <li>
              <a>Messages</a>
            </li>
            <li>
              <a>Bookmarks</a>
            </li>
            <li>
              <a>Lists</a>
            </li>
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>More</a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">What{`'`}s happening?</h2>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="What's on your mind?"
            ></textarea>
            <Button className="mt-2">Tweet</Button>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold">Latest Tweets</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-2">
              <p>
                <strong>User1:</strong> This is a sample tweet!
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-2">
              <p>
                <strong>User2:</strong> Another sample tweet!
              </p>
            </div>
            {/* Add more tweets here */}
          </div>
        </main>

        <aside className="w-1/4 p-4">
          <ul className="menu bg-gray-100 rounded-box">
            <li>
              <a>
                <House /> Home
              </a>
            </li>
            <li>
              <a>Explore</a>
            </li>
            <li>
              <a>Notifications</a>
            </li>
            <li>
              <a>Messages</a>
            </li>
            <li>
              <a>Bookmarks</a>
            </li>
            <li>
              <a>Lists</a>
            </li>
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>More</a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
