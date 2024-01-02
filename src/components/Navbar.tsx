"use client";

import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-slate-900 flex justify-between py-3 px-24 text-white">
      <Link href="/">
        <h1>NextGoogle</h1>
      </Link>

      <div>
        <Link href="/dashboard">
        Dashboard
        </Link>
      </div>
      <div>
      <Link href="/Signup">
          Sign up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
