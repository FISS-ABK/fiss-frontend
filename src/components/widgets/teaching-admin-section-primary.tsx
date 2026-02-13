import Image from "next/image";

const leaders = [
  {
    name: "Mrs Michael O.T",
    role: "Head Mistress Primary School",
    image: "/19.png",
  },
  {
    name: "Mrs. YE.T Fabunmi",
    role: "Head Mistress Nursery School",
    image: "/20.png",
  },
  {
    name: "Mrs. Adegbite O. Janet",
    role: "Bursar",
    image: "/21.png",
  },
];

export default function TeachingAdminSectionPrimary() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-poppins text-3xl font-bold text-[#0b2c4d] sm:text-4xl md:text-5xl">
            Teaching & Academic
            <br className="hidden sm:block" /> Administration
          </h2>
          <p className="mt-4 font-suisse text-sm leading-relaxed text-gray-600 sm:text-base">
            Academic leadership responsible for maintaining standards, discipline,
            and quality education.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover object-[center_20%]" // This nudges the crop down to show the head
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  priority
                />
              </div>
              <div className="mt-3 text-center">
                <p className="font-poppins text-sm font-semibold text-[#0b2c4d]">
                  {leader.name}
                </p>
                <p className="font-suisse text-xs text-gray-600">
                  {leader.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
