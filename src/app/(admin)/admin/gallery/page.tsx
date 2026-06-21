"use client";

import { useState } from "react";
import { Plus, Trash2, Image as ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import AdminDashboardLayout from "@/app/(admin)/_components/AdminDashboardLayout";
import PageHeader from "@/app/(admin)/_components/PageHeader";
import CloudinaryUpload from "@/components/widgets/cloudinary-upload";
import { useGallery, GalleryItem } from "@/hooks/useGallery";
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

export default function AdminGalleryPage() {
  const {
    galleryImages,
    isLoading,
    addGalleryAsync,
    isAdding,
    deleteGallery,
    isDeleting,
  } = useGallery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState<{ imageUrl: string; publicId: string } | null>(null);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);

  const handleOpenModal = () => {
    setDescription("");
    setUploadedImage(null);
    setIsModalOpen(true);
  };

  const handleUploadSuccess = (imageUrl: string, publicId: string) => {
    setUploadedImage({ imageUrl, publicId });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedImage) return;

    try {
      await addGalleryAsync({
        imageurl: uploadedImage.imageUrl,
        public_id: uploadedImage.publicId,
        description: description.trim() || "School Gallery",
      });
      setIsModalOpen(false);
      setDescription("");
      setUploadedImage(null);
    } catch (err) {
      console.error("Failed to save gallery item:", err);
    }
  };

  const handleDeleteClick = (item: GalleryItem) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete && itemToDelete._id) {
      deleteGallery(itemToDelete._id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setItemToDelete(null);
        },
      });
    }
  };

  const safeImages = Array.isArray(galleryImages) ? galleryImages : [];

  return (
    <AdminDashboardLayout>
      <PageHeader
        title="Gallery Management"
        subtitle={isLoading ? "Loading..." : `${safeImages.length} images in gallery`}
        action={
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-2 rounded-lg bg-[#0a1929] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a1929]/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Image
          </button>
        }
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-[#0a1929]" />
          <p className="mt-4 text-sm text-gray-600">Loading gallery images...</p>
        </div>
      )}

      {/* Gallery Grid */}
      {!isLoading && safeImages.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {safeImages.map((item: GalleryItem) => (
            <div
              key={item._id}
              className="group relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full bg-gray-100">
                <Image
                  src={item.imageurl || item.imageUrl || ""}
                  alt={item.description || "School Gallery"}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                
                {/* Delete button overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button
                    onClick={() => handleDeleteClick(item)}
                    className="rounded-full bg-red-600 p-3 text-white transition-transform duration-300 hover:scale-110 hover:bg-red-700 shadow-md"
                    title="Delete image"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Info details */}
              <div className="flex flex-1 flex-col p-4">
                <p className="line-clamp-2 text-sm font-medium text-gray-800 flex-1">
                  {item.description || "No description"}
                </p>
                <div className="mt-2 border-t pt-2">
                  <p className="font-mono text-[10px] text-gray-500 truncate">
                    ID: {item.public_id || "—"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !isLoading ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#0a1929] mb-4">
            <ImageIcon className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No images configured</h3>
          <p className="mt-2 text-sm text-gray-600 max-w-sm mx-auto">
            Your gallery is empty. Upload image assets using Cloudinary and write descriptions to populate the main website gallery.
          </p>
          <button
            onClick={handleOpenModal}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0a1929] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a1929]/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Image
          </button>
        </div>
      ) : null}

      {/* Add Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg overflow-hidden rounded-xl border bg-white shadow-2xl animate-in fade-in-50 zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">Add Gallery Image</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                disabled={isAdding}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave}>
              <div className="p-6 space-y-4">
                {/* Upload Field */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Upload Image
                  </label>
                  <CloudinaryUpload
                    onUploadSuccess={handleUploadSuccess}
                    onClear={() => setUploadedImage(null)}
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label htmlFor="description" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Description / Caption
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    placeholder="Enter a description for this image..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
                    disabled={isAdding}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isAdding}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding || !uploadedImage}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0a1929] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a1929]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAdding && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isAdding ? "Saving..." : "Add to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this gallery image and remove it from the public website gallery. This action cannot be undone.
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
