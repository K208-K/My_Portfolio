"use client";

import { usePathname } from "next/navigation";

/**
 * PageBackground – renders a full-screen static city-night background
 * on every page EXCEPT the home page ("/").
 *
 * Place your background image at:
 *   public/background_img/city-night.jpg
 */
export default function PageBackground() {
  const pathname = usePathname();

  // Do not render on home page
  if (pathname === "/") return null;

  return (
    <>
      {/* Fixed full-screen background image */}
      <div
        aria-hidden="true"
        style={{
          backgroundImage: "url('/background_img/city-night.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll", // static – no parallax
        }}
        className="fixed inset-0 z-0 w-full h-full pointer-events-none select-none"
      />

      {/* Dark overlay to keep text readable and match portfolio dark theme */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 w-full h-full pointer-events-none select-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,7,12,0.72) 0%, rgba(5,7,12,0.60) 50%, rgba(5,7,12,0.80) 100%)",
        }}
      />
    </>
  );
}
