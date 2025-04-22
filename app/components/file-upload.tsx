import { Upload } from "lucide-react";
import { useState, useRef, type FormEvent } from "react";

export default function FileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleUpload = (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // TODO: simulate uploading
  };

  const openDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
  };

  return (
    <div>
      <button
        onClick={openDialog}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload
      </button>

      <dialog
        ref={dialogRef}
        className="rounded-lg shadow-lg p-0 m-auto inset-0 w-full max-w-md"
        onClick={(e) => {
          // Close dialog when clicking on the backdrop (outside dialog content)
          if (e.target === dialogRef.current) {
            closeDialog();
          }
        }}
      >
        <div className="p-6">
          {/* Dialog header */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Upload files</h2>
            <p className="text-sm text-gray-500">
              Drag and drop files here or click to browse.
            </p>
          </div>

          <form onSubmit={handleUpload}>
            {/* File upload area */}
            <div className="mt-4 flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-center">
              <Upload className="mb-2 h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-500">
                Drag files here or click to browse
              </p>
              <input type="file" className="hidden" multiple />
            </div>

            {/* Progress indicator */}
            {isUploading && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Footer buttons */}
            <div className="mt-6 flex justify-end space-x-2">
              <button
                type="button"
                onClick={closeDialog}
                disabled={isUploading}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
