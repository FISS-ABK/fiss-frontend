"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Newspaper, 
  Loader2, 
  ArrowLeft, 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3, 
  Undo2, 
  Redo2, 
  X 
} from "lucide-react";
import Image from "next/image";
import AdminDashboardLayout from "@/app/(admin)/_components/AdminDashboardLayout";
import PageHeader from "@/app/(admin)/_components/PageHeader";
import CloudinaryUpload from "@/components/widgets/cloudinary-upload";
import { useBlog, BlogItem } from "@/hooks/useBlog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AdminNewsletterPage() {
  const {
    blogs,
    isLoading,
    createBlogAsync,
    isCreating,
    deleteBlog,
    isDeleting,
  } = useBlog();

  const [view, setView] = useState<"list" | "create">("list");
  
  // Form fields
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [uploadedImage, setUploadedImage] = useState<{ imageUrl: string; publicId: string } | null>(null);
  
  // Custom WYSIWYG editor state
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorHtml, setEditorHtml] = useState("");

  // Dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<BlogItem | null>(null);

  // Format command helper for contentEditable
  const executeCommand = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setEditorHtml(editorRef.current.innerHTML);
    }
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setEditorHtml(editorRef.current.innerHTML);
    }
  };

  const handleUploadSuccess = (imageUrl: string, publicId: string) => {
    setUploadedImage({ imageUrl, publicId });
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !authorName.trim() || !uploadedImage || !editorHtml.trim()) {
      return;
    }

    try {
      await createBlogAsync({
        title: title.trim(),
        authorName: authorName.trim(),
        imageUrl: uploadedImage.imageUrl,
        public_id: uploadedImage.publicId,
        text: editorHtml, // Save the rich HTML text
      });

      // Reset form
      setTitle("");
      setAuthorName("");
      setUploadedImage(null);
      setEditorHtml("");
      if (editorRef.current) editorRef.current.innerHTML = "";
      setView("list");
    } catch (err) {
      console.error("Failed to publish newsletter:", err);
    }
  };

  const handleDeleteClick = (blog: BlogItem) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (blogToDelete && blogToDelete._id) {
      deleteBlog(blogToDelete._id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setBlogToDelete(null);
        },
      });
    }
  };

  // Safe blogs array
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  return (
    <AdminDashboardLayout>
      {view === "list" ? (
        <>
          <PageHeader
            title="Newsletter Management"
            subtitle={isLoading ? "Loading..." : `${safeBlogs.length} newsletter articles published`}
            action={
              <button
                onClick={() => setView("create")}
                className="flex items-center gap-2 rounded-lg bg-[#0a1929] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a1929]/90 transition-colors"
              >
                <Plus className="h-4 w-4" />
                New Post
              </button>
            }
          />

          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-[#0a1929]" />
              <p className="mt-4 text-sm text-gray-600">Loading newsletters...</p>
            </div>
          )}

          {/* List Grid */}
          {!isLoading && safeBlogs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {safeBlogs.map((blog: BlogItem) => (
                <div
                  key={blog._id}
                  className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="relative h-48 w-full bg-gray-100">
                    {blog.imageUrl ? (
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400 bg-gray-50">
                        <Newspaper className="h-12 w-12" />
                      </div>
                    )}
                    <button
                      onClick={() => handleDeleteClick(blog)}
                      className="absolute right-3 top-3 rounded-full bg-red-600 p-2.5 text-white shadow hover:bg-red-700 transition-colors hover:scale-105"
                      title="Delete post"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="line-clamp-2 text-base font-bold text-gray-900 leading-snug">
                      {blog.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-600">
                      By <span className="font-semibold">{blog.authorName}</span>
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500">
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : !isLoading ? (
            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#0a1929] mb-4">
                <Newspaper className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No newsletters published</h3>
              <p className="mt-2 text-sm text-gray-600 max-w-sm mx-auto">
                Publish articles, bulletins, or school announcements using the rich text editor to keep parents and students informed.
              </p>
              <button
                onClick={() => setView("create")}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0a1929] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a1929]/90 transition-colors"
              >
                <Plus className="h-4 w-4" />
                New Post
              </button>
            </div>
          ) : null}
        </>
      ) : (
        // Create Editor View
        <div className="mx-auto max-w-4xl bg-white rounded-xl border p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between border-b pb-4">
            <button
              onClick={() => setView("list")}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              disabled={isCreating}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to List
            </button>
            <h2 className="text-lg font-bold text-[#0a1929]">Create Newsletter Post</h2>
          </div>

          <form onSubmit={handlePublish} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Title */}
              <div>
                <label htmlFor="title" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter article title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
                  required
                  disabled={isCreating}
                />
              </div>

              {/* Author */}
              <div>
                <label htmlFor="author" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Author Name
                </label>
                <input
                  type="text"
                  id="author"
                  placeholder="Enter author's name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
                  required
                  disabled={isCreating}
                />
              </div>
            </div>

            {/* Banner Image */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Banner Image
              </label>
              <CloudinaryUpload
                onUploadSuccess={handleUploadSuccess}
                onClear={() => setUploadedImage(null)}
              />
            </div>

            {/* Rich Text Editor */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Content Editor
              </label>
              
              {/* Editor Toolbar */}
              <div className="flex flex-wrap gap-1 rounded-t-lg border-x border-t border-gray-300 bg-gray-50 p-2">
                <button
                  type="button"
                  onClick={() => executeCommand("formatBlock", "<h1>")}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                  title="Heading 1"
                >
                  <Heading1 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("formatBlock", "<h2>")}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                  title="Heading 2"
                >
                  <Heading2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("formatBlock", "<h3>")}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                  title="Heading 3"
                >
                  <Heading3 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("formatBlock", "<p>")}
                  className="p-2 hover:bg-gray-200 rounded text-xs font-bold text-gray-700 transition-colors"
                  title="Paragraph"
                >
                  P
                </button>
                <div className="w-[1px] bg-gray-300 mx-1 self-stretch" />
                <button
                  type="button"
                  onClick={() => executeCommand("bold")}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("italic")}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("underline")}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                  title="Underline"
                >
                  <Underline className="h-4 w-4" />
                </button>
                <div className="w-[1px] bg-gray-300 mx-1 self-stretch" />
                <button
                  type="button"
                  onClick={() => executeCommand("justifyLeft")}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                  title="Align Left"
                >
                  <AlignLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("justifyCenter")}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                  title="Align Center"
                >
                  <AlignCenter className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("justifyRight")}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                  title="Align Right"
                >
                  <AlignRight className="h-4 w-4" />
                </button>
                <div className="w-[1px] bg-gray-300 mx-1 self-stretch" />
                <button
                  type="button"
                  onClick={() => executeCommand("insertUnorderedList")}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                  title="Bulleted List"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("insertOrderedList")}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                  title="Numbered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </button>
                <div className="w-[1px] bg-gray-300 mx-1 self-stretch" />
                <button
                  type="button"
                  onClick={() => executeCommand("undo")}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                  title="Undo"
                >
                  <Undo2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("redo")}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                  title="Redo"
                >
                  <Redo2 className="h-4 w-4" />
                </button>
              </div>

              {/* contentEditable Div */}
              <div
                ref={editorRef}
                contentEditable={!isCreating}
                suppressContentEditableWarning
                onInput={handleEditorInput}
                className="min-h-[300px] w-full rounded-b-lg border border-gray-300 p-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-900 prose prose-sm max-w-none"
                style={{ overflowY: "auto" }}
              />
            </div>

            {/* Publish Actions */}
            <div className="flex justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={() => setView("list")}
                disabled={isCreating}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating || !title.trim() || !authorName.trim() || !uploadedImage || !editorHtml.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0a1929] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0a1929]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating && <Loader2 className="h-4 w-4 animate-spin" />}
                {isCreating ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the newsletter post titled{" "}
              <span className="font-semibold">{blogToDelete?.title}</span>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminDashboardLayout>
  );
}
