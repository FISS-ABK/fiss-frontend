import Image from "next/image";

const teamMembers = [
  {
    name: "Rev. J.O Dawodu",
    role: "Chairman",
    image: "/1.png",
  },
  {
    name: "Mrs Michael O.T",
    role: "Head Mistress Primary School",
    image: "/19.png",
  },
  {
    name: "",
    role: "Member",
    image: "/23.png",
  },
  {
    name: "",
    role: "Member",
    image: "/24.png",
  },
  {
    name: "",
    role: "Member",
    image: "/25.png",
  },
  {
    name: "",
    role: "Member",
    image: "/26.png",
  },
   {
    name: "",
    role: "Member",
    image: "/27.png",
  },
];

export default function LeadershipTeamSectionPrimary() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-12 md:mb-16">
          <h2 className="font-poppins mb-3 text-2xl font-bold text-[#0a1628] sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
            Our Leadership Team
          </h2>
          <p className="font-suisse mx-auto max-w-xl text-sm text-gray-600 sm:text-base">
            Meet the experienced professionals guiding our academic and
            administrative direction.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              {/* Image Container */}
              <div className="relative mb-3 aspect-square overflow-hidden rounded-xl border-4 border-[#C41E3A] shadow-md transition-transform duration-300 group-hover:scale-[1.02] sm:mb-4 sm:rounded-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name and Role */}
              <div className="text-center">
                <h3 className="font-poppins text-xs font-semibold text-[#0a1628] sm:text-sm md:text-base">
                  {member.name}
                </h3>
                <p className="font-suisse text-xs text-[#C41E3A] sm:text-sm">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
