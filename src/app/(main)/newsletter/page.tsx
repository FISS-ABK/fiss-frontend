"use client";

import { useBlog, BlogItem } from "@/hooks/useBlog";
import { Newspaper, Calendar, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import DotSeparator from "@/components/dot-separator";

export default function PublicNewsletterPage() {
  const { blogs, isLoading } = useBlog();

  const stripHtml = (htmlStr: string) => {
    if (!htmlStr) return "";
    return htmlStr.replace(/<[^>]*>/g, " ");
  };

  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  return (
    <div className="flex min-h-screen flex-col bg-[#faf9f6]">
      <FloatingNavWrapper initialBg="bg-[#edf5f5]">
        <Navbar />
      </FloatingNavWrapper>

      {/* --- HEADER SECTION --- */}
      <section className="bg-[#edf5f5] pt-32 pb-16 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-[#09283b] tracking-tight">
              FISS Bulletin
            </h1>
            <p className="mt-6 text-lg text-[#12303f]/80 leading-relaxed">
              Stay connected with Foursquarians. Find official school announcements, 
              event highlights, academic resources, and stories from our student community.
            </p>
          </div>
        </div>
        
        {/* Decorative Background Blur */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-[#0b2c4d]/5 blur-3xl" />
      </section>

      <DotSeparator />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#0a1929] border-t-transparent"></div>
              <p className="mt-4 text-sm text-gray-600">Loading newsletter bulletins...</p>
            </div>
          </div>
        )}

        {/* Listing Grid */}
        {!isLoading && safeBlogs.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {safeBlogs.map((blog: BlogItem) => {
              const excerpt = stripHtml(blog.text);
              return (
                <article
                  key={blog._id}
                  className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  {/* Article Banner */}
                  <div className="relative h-56 w-full bg-gray-100">
                    {blog.imageUrl ? (
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400 bg-gray-50">
                        <Newspaper className="h-14 w-14" />
                      </div>
                    )}
                  </div>

                  {/* Article Info */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Meta details */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {blog.createdAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {blog.authorName}
                      </span>
                    </div>

                    <h2 className="mt-3 line-clamp-2 text-xl font-bold text-[#09283b] leading-tight hover:text-blue-900 transition-colors">
                      <Link href={`/newsletter/${blog._id}`}>{blog.title}</Link>
                    </h2>
                    
                    <p className="mt-3 line-clamp-3 text-sm text-gray-600 leading-relaxed flex-1">
                      {excerpt}
                    </p>

                    <div className="mt-5 border-t pt-4">
                      <Link
                        href={`/newsletter/${blog._id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#09283b] hover:text-[#09283b]/85 transition-colors group"
                      >
                        Read Full Article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : !isLoading ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-16 text-center max-w-xl mx-auto my-6">
            <Newspaper className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No newsletters found</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              We haven&apos;t published any bulletins yet. Please check back later for updates from Foursquare International Secondary School.
            </p>
          </div>
        ) : null}
      </main>

      <DotSeparator />
      
        <Footer />
    </div>
  );
}
