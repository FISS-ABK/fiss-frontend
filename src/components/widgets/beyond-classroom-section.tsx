"use client";

import { useState } from "react";
import {
  ChevronDown,
  HeartHandshake,
  BookOpen,
  Flame,
  CalendarCheck,
  Sparkles,
  Users,
  Trophy,
  MonitorSmartphone,
  Music2,
} from "lucide-react";

interface ActivityItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ActivitySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: ActivityItem[];
}

const activitySections: ActivitySection[] = [
  {
    id: "spiritual",
    title: "Spiritual & Character Development Activities",
    icon: <HeartHandshake className="h-4 w-4 text-white" />,
    items: [
      {
        title: "Weekly Students Fellowship",
        description:
          "Students gather weekly for worship, scripture reflection, and encouragement to build faith and character.",
        icon: <Flame className="h-4 w-4 text-red-500" />,
      },
      {
        title: "Fasting & Prayer Day",
        description:
          "Dedicated sessions for prayer and spiritual growth, fostering discipline and a strong moral foundation.",
        icon: <CalendarCheck className="h-4 w-4 text-amber-500" />,
      },
      {
        title: "End-of-Term Retreat",
        description:
          "Guided retreats focused on reflection, gratitude, and spiritual renewal at the end of each term.",
        icon: <Sparkles className="h-4 w-4 text-emerald-500" />,
      },
      {
        title: "Boys & Girls Time",
        description:
          "Mentorship sessions that promote personal responsibility, respect, and wholesome character development.",
        icon: <Users className="h-4 w-4 text-blue-500" />,
      },
    ],
  },
  {
    id: "academic",
    title: "Academic & Co-Curricular Activities",
    icon: <BookOpen className="h-4 w-4 text-white" />,
    items: [
      {
        title: "Science & Innovation Club",
        description:
          "Hands-on experiments, robotics challenges, and innovation projects that nurture curiosity and problem-solving.",
        icon: <MonitorSmartphone className="h-4 w-4 text-indigo-500" />,
      },
      {
        title: "Debate & Public Speaking",
        description:
          "Structured debates and speech practice to build confidence, articulation, and critical thinking.",
        icon: <Trophy className="h-4 w-4 text-orange-500" />,
      },
      {
        title: "Arts, Music & Drama",
        description:
          "Creative programs that develop expression, teamwork, and appreciation for the performing arts.",
        icon: <Music2 className="h-4 w-4 text-pink-500" />,
      },
      {
        title: "Sports & Athletics",
        description:
          "Regular training and inter-house competitions to promote fitness, teamwork, and healthy competition.",
        icon: <Trophy className="h-4 w-4 text-green-500" />,
      },
    ],
  },
];

export default function BeyondClassroomSection() {
  const [openId, setOpenId] = useState("spiritual");

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="font-poppins text-3xl font-bold text-[#0b2c4d] sm:text-4xl md:text-5xl">
            Beyond the Classroom
          </h2>
        </div>

        <div className="space-y-4">
          {activitySections.map((section) => (
            <div
              key={section.id}
              className="overflow-hidden rounded-xl border border-[#0b2c4d]/30 bg-white shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenId((prev) => (prev === section.id ? "" : section.id))
                }
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6"
              >
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 items-center justify-center rounded-md bg-[#0b2c4d] hidden sm:flex">
                    {section.icon}
                  </span>
                  <span className="font-poppins text-base font-semibold text-[#0b2c4d] sm:text-lg">
                    {section.title}
                  </span>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b2c4d]">
                  <ChevronDown
                    className={`h-4 w-4 text-white transition-transform ${
                      openId === section.id ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>

              <div
                className={`transition-all duration-300 ${
                  openId === section.id
                    ? "max-h-300 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="border-t border-dashed border-[#0b2c4d]/30 px-4 py-6 sm:px-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {section.items.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f5f7f7]">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-poppins text-sm font-semibold text-[#0b2c4d] sm:text-base">
                            {item.title}
                          </h3>
                          <p className="font-suisse text-xs leading-relaxed text-gray-600 sm:text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
