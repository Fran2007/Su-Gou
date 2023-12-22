"use client";

import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-slate-900 flex justify-between px-24 ">
      <Link href="/">
        <h1>NextGoogle</h1>
      </Link>

      <div>
        <Link href="/dashboard">
        Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
