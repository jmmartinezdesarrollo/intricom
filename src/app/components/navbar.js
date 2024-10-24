"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav>
        <div>
          <Link href="/">Home</Link>
          <Link href="/hotels">Hotels</Link>
          <Link href="/clients">Clients</Link>
          <Link href="/bookings">Bookings</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
