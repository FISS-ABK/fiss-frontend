"use client";

import { useState } from "react";

interface ClassLevel {
  id: string;
  name: string;
  features: {
    title: string;
    description: string;
  }[];
}

const classLevels: ClassLevel[] = [
  {
    id: "creche",
    name: "Crèche",
    features: [
      {
        title: "Safe and Nurturing Care",
        description: "Our crèche provides a calm, secure, and loving environment where every child is closely supervised and cared for by experienced caregivers who prioritize their comfort, safety, and emotional well-being, ensuring they feel protected, valued, and at ease throughout the day.",
      },
      {
        title: "Early Sensory Development",
        description: "Through age-appropriate activities, gentle stimulation, and guided play, we support the development of essential motor skills, sensory awareness, and curiosity, helping children explore their surroundings, strengthen coordination, and build a strong foundation for future learning.",
      },
      {
        title: "Social Interaction and Play-Based Learning",
        description: "Children are encouraged to interact with others through structured play, music, and group activities that promote sharing, communication, and early social skills. This form of learning helps develop social confidence, curiosity, and emotional awareness in a natural and enjoyable way.",
      },
    ],
  },
  {
    id: "kindergarten",
    name: "Kindergarten (KG)",
    features: [
      {
        title: "Foundation Learning Skills",
        description: "Kindergarten introduces foundational literacy and numeracy through engaging, play-based activities that build confidence and curiosity in young learners.",
      },
      {
        title: "Creative Expression",
        description: "Children engage in art, music, storytelling, and dramatic play to develop creativity, self-expression, and fine motor skills.",
      },
      {
        title: "Social and Emotional Growth",
        description: "Students learn to share, cooperate, and develop empathy through structured group activities and positive reinforcement.",
      },
    ],
  },
  {
    id: "nursery",
    name: "Nursery School",
    features: [
      {
        title: "Pre-Reading and Pre-Writing Skills",
        description: "Nursery students begin developing essential literacy skills through phonics, letter recognition, and basic writing exercises.",
      },
      {
        title: "Number Concepts and Patterns",
        description: "Introduction to counting, shapes, patterns, and basic mathematical concepts through hands-on activities and games.",
      },
      {
        title: "Independence and Confidence",
        description: "Children are encouraged to take initiative, make choices, and develop self-help skills in a supportive learning environment.",
      },
    ],
  },
  {
    id: "primary",
    name: "Primary School",
    features: [
      {
        title: "Core Academic Subjects",
        description: "Comprehensive instruction in English, Mathematics, Science, Social Studies, and other foundational subjects aligned with national curriculum standards.",
      },
      {
        title: "Critical Thinking Development",
        description: "Students engage in problem-solving activities, group discussions, and project-based learning to develop analytical and reasoning skills.",
      },
      {
        title: "Character and Values Education",
        description: "Emphasis on moral values, discipline, respect, and responsibility to build strong character and positive behavior patterns.",
      },
    ],
  },
  {
    id: "jss",
    name: "Junior Secondary School (JSS)",
    features: [
      {
        title: "Comprehensive Subject Coverage",
        description: "Students study core subjects including English, Mathematics, Sciences, Social Studies, and elective subjects to build a strong academic foundation.",
      },
      {
        title: "Exam Preparation Focus",
        description: "Structured curriculum aligned with WAEC and NECO standards, with continuous assessment and exam preparation strategies.",
      },
      {
        title: "Skill Development Programs",
        description: "Introduction to ICT, practical sciences, creative arts, and vocational skills to prepare students for diverse career pathways.",
      },
    ],
  },
  {
    id: "sss",
    name: "Senior Secondary School (SSS)",
    features: [
      {
        title: "Specialized Academic Streams",
        description: "Students choose between Science, Commercial, or Arts streams based on their interests and career aspirations.",
      },
      {
        title: "WAEC and NECO Excellence",
        description: "Intensive preparation for external examinations with regular mock tests, past questions practice, and subject-specific tutorials.",
      },
      {
        title: "University Readiness",
        description: "Focus on critical thinking, research skills, independent learning, and academic writing to prepare students for tertiary education.",
      },
    ],
  },
];

export default function ClassStructureSection() {
  // Separate class levels
  const primaryLevels = classLevels.filter(
    (level) => ["creche", "kindergarten", "nursery", "primary"].includes(level.id)
  );
  const secondaryLevels = classLevels.filter(
    (level) => ["jss", "sss"].includes(level.id)
  );

  const [group, setGroup] = useState("primary");
  const [activeTab, setActiveTab] = useState(
    group === "primary" ? primaryLevels[0].id : secondaryLevels[0].id
  );

  // Update activeTab when group changes
  const handleGroupChange = (newGroup: "primary" | "secondary") => {
    setGroup(newGroup);
    setActiveTab(
      newGroup === "primary" ? primaryLevels[0].id : secondaryLevels[0].id
    );
  };

  const activeLevel = classLevels.find((level) => level.id === activeTab);

  return (
    <section className="bg- py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="mb-3 font-poppins text-3xl font-bold text-[#0b2c4d] sm:text-4xl md:text-5xl">
            Our Class Structure
          </h2>
          <p className="mx-auto max-w-2xl font-suisse text-base leading-relaxed text-gray-600 sm:text-lg">
            A carefully structured learning journey from early childhood to secondary education.
          </p>
        </div>

        {/* Group Dropdowns */}
        <div className="mb-8 flex flex-col items-center gap-4 sm:mb-12 sm:flex-row sm:justify-center">
          <select
            value={group}
            onChange={(e) => handleGroupChange(e.target.value as "primary" | "secondary")}
            className="rounded-xl border border-[#0b2c4d] bg-white px-4 py-2 font-poppins text-base text-[#0b2c4d] shadow-sm focus:outline-none"
          >
            <option value="primary">Primary School</option>
            <option value="secondary">Secondary School</option>
          </select>

          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="rounded-xl border border-[#0b2c4d] bg-white px-4 py-2 font-poppins text-base text-[#0b2c4d] shadow-sm focus:outline-none"
          >
            {(group === "primary" ? primaryLevels : secondaryLevels).map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

        {/* Content Cards */}
        {activeLevel && (
          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {activeLevel.features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border-2 border-[#0b2c4d]/10 bg-[#0b2c4d] p-6 text-white shadow-lg sm:p-8"
              >
                <h3 className="mb-4 font-poppins text-xl font-bold sm:text-2xl">
                  {feature.title}
                </h3>
                <p className="font-suisse text-sm leading-relaxed text-white/90 sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
