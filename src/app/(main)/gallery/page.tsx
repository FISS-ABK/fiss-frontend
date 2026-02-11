import Image from "next/image";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import DotSeparator from "@/components/dot-separator";

const items = [
  { src: "/FOURSQUARE PICTURES/OTHERS/2.jpg", caption: "School Clinic", wide: true, tall: false },
  { src: "/FOURSQUARE PICTURES/val/tomiwa.JPG", caption: "Prize giving day", wide: false, tall: true },
  { src: "/FOURSQUARE PICTURES/val/cipal.JPG", caption: "Event", wide: false, tall: true },
  { src: "/FOURSQUARE PICTURES/mmm.jpeg", caption: "Excursion", wide: false, tall: false },
  { src: "/FOURSQUARE PICTURES/summer/BARBING.JPG", caption: "Summer Lesson", wide: false, tall: false },
  { src: "/FOURSQUARE PICTURES/OTHERS/14.jpg", caption: "School view", wide: false, tall: false },
  { src: "/FOURSQUARE PICTURES/OTHERS/1.jpg", caption: "Classroom", wide: true, tall: false },
];

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <FloatingNavWrapper initialBg="bg-[#edf5f5]">
        <Navbar />
      </FloatingNavWrapper>

      <section className="bg-[#edf5f5]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="md:flex md:items-start md:justify-between">
            <div className="md:max-w-xl">
              <h1 className="text-5xl font-extrabold text-[#09283b]">Gallery</h1>
              <p className="mt-4 text-sm text-[#12303f]">
                A glimpse into learning, growth, and everyday life at FISS.
              </p>
            </div>
            <div className="mt-12 md:mt-0 md:flex md:items-center md:justify-center md:w-1/3">
              <div className="text-center text-xs text-gray-500">
                <div>scroll to get the full experience</div>
                <div className="mt-6 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
<DotSeparator />
      <main className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((it, idx) => {
            const span = it.wide ? "md:col-span-2" : "md:col-span-1";
            const height = it.tall ? "h-80" : "h-48";
            return (
              <figure key={idx} className={`${span} overflow-hidden rounded bg-white shadow-sm`}>
                <div className={`relative ${height} w-full bg-gray-100`}> 
                  <Image
                    src={it.src}
                    alt={it.caption}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t px-3 py-2 text-xs text-gray-700">{it.caption}</figcaption>
              </figure>
            );
          })}
        </div>
      </main>
<DotSeparator />
      <div className="mt-auto">
        <div className="px-6 pb-12">
          <Footer />
        </div>
      </div>
    </div>
  );
}
