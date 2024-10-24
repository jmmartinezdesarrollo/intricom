"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav>
        <div>
          <Link href="/">Home</Link>
          <Link href="/hotels">Hoteles</Link>
          <Link href="/clients">Clientes</Link>
          <Link href="/bookings">Bookings</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
