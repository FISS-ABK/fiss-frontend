"use client";

import { useParams, useRouter } from "next/navigation";
import { useBlog } from "@/hooks/useBlog";
import { Calendar, User, ArrowLeft, Newspaper, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import DotSeparator from "@/components/dot-separator";

export default function NewsletterDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { blogs, isLoading } = useBlog();

  const blog = blogs.find((item) => item._id === id);

  const dateFormatted = blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
    <div className="flex min-h-screen flex-col bg-[#faf9f6]">
      <FloatingNavWrapper initialBg="bg-[#edf5f5]">
        <Navbar />
      </FloatingNavWrapper>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12 pt-32">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#09283b] hover:text-[#09283b]/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Newsletter
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-10 w-10 animate-spin text-[#0a1929]" />
            <p className="mt-4 text-sm text-gray-600 font-medium">Loading article details...</p>
          </div>
        )}

        {/* Article not found */}
        {!isLoading && !blog && (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-16 text-center max-w-md mx-auto my-12">
            <Newspaper className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Article not found</h3>
            <p className="mt-2 text-sm text-gray-600">
              The newsletter post you are looking for does not exist or has been removed.
            </p>
            <button
              onClick={() => router.push("/newsletter")}
              className="mt-6 rounded-lg bg-[#0a1929] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              Browse Newsletters
            </button>
          </div>
        )}

        {/* Article Content */}
        {!isLoading && blog && (
          <article className="space-y-8 bg-white rounded-2xl border p-6 md:p-10 shadow-sm">
            {/* Meta and Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-[#09283b]" />
                  {dateFormatted}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-[#09283b]" />
                  Written by <span className="font-semibold">{blog.authorName}</span>
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#09283b] leading-tight tracking-tight">
                {blog.title}
              </h1>
            </div>

            {/* Banner Image */}
            <div className="relative h-[250px] sm:h-[350px] md:h-[450px] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-md">
              {blog.imageUrl ? (
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400 bg-gray-50">
                  <Newspaper className="h-20 w-20" />
                </div>
              )}
            </div>

            {/* Rich HTML body text rendering */}
            <div className="border-t border-gray-100 pt-8">
              <div
                dangerouslySetInnerHTML={{ __html: blog.text }}
                className="prose prose-slate md:prose-lg max-w-none prose-headings:text-[#09283b] prose-headings:font-bold prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:underline prose-img:rounded-xl prose-ul:list-disc prose-ol:list-decimal pl-2"
              />
            </div>
          </article>
        )}
      </main>

      <DotSeparator />
    
        <Footer />
    </div>
  );
}
