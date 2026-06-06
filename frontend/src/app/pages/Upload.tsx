import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload as UploadIcon, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { branches, semesters } from "../data/mock";

type FormData = {
  title: string;
  branchId: string;
  subject: string;
  semester: string;
  file: FileList;
};

export function Upload() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  
  const selectedBranchId = watch("branchId");
  const selectedBranch = branches.find(b => b.id === selectedBranchId);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      // Simulate API call to backend POST /upload-notes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Mock Upload Data:", {
        title: data.title,
        branchId: data.branchId,
        subject: data.subject,
        semester: data.semester,
        file: data.file[0]?.name
      });
      
      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Upload Notes</h1>
        <p className="text-gray-600 text-lg">Help your peers by sharing your class notes, previous year papers, and study materials.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        {submitStatus === "success" && (
          <div className="mb-8 bg-green-50 text-green-800 p-4 rounded-xl flex items-start gap-3 border border-green-200">
            <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
            <div>
              <h3 className="font-semibold">Upload Successful!</h3>
              <p className="text-sm text-green-700 mt-1">Thank you for contributing to the DBATU community. Your notes will be available to others soon.</p>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-8 bg-red-50 text-red-800 p-4 rounded-xl flex items-start gap-3 border border-red-200">
            <AlertCircle className="h-6 w-6 text-red-500 shrink-0" />
            <div>
              <h3 className="font-semibold">Upload Failed</h3>
              <p className="text-sm text-red-700 mt-1">There was a problem uploading your file. Please try again later.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Note Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="e.g. Complete DSA Cheat Sheet 2024"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors"
            />
            {errors.title && <span className="text-sm text-red-500">{errors.title.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">Branch</label>
              <select
                {...register("branchId", { required: "Branch is required" })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors appearance-none"
              >
                <option value="">Select a branch</option>
                {branches.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              {errors.branchId && <span className="text-sm text-red-500">{errors.branchId.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">Semester</label>
              <select
                {...register("semester", { required: "Semester is required" })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors appearance-none"
              >
                <option value="">Select a semester</option>
                {semesters.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.semester && <span className="text-sm text-red-500">{errors.semester.message}</span>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Subject</label>
            <select
              {...register("subject", { required: "Subject is required" })}
              disabled={!selectedBranch}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select a subject</option>
              {selectedBranch?.subjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
            {errors.subject && <span className="text-sm text-red-500">{errors.subject.message}</span>}
            {!selectedBranch && <p className="text-xs text-gray-500">Please select a branch first to see subjects.</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Upload PDF</label>
            <div className="mt-2 flex justify-center rounded-2xl border-2 border-dashed border-gray-300 px-6 py-10 hover:bg-gray-50 hover:border-green-400 transition-colors cursor-pointer relative">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf"
                      className="sr-only"
                      {...register("file", { 
                        required: "PDF file is required",
                        validate: (fileList) => {
                          if (fileList[0] && fileList[0].type !== "application/pdf") {
                            return "Only PDF files are allowed";
                          }
                          if (fileList[0] && fileList[0].size > 10 * 1024 * 1024) {
                            return "File size must be less than 10MB";
                          }
                          return true;
                        }
                      })}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-500 mt-2">PDF up to 10MB</p>
              </div>
            </div>
            {errors.file && <span className="text-sm text-red-500">{errors.file.message}</span>}
            
            {watch("file")?.[0] && !errors.file && (
              <div className="mt-2 bg-blue-50 text-blue-800 p-3 rounded-lg text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Selected: {watch("file")[0].name}</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting ? (
                "Uploading..."
              ) : (
                <>
                  <UploadIcon className="h-5 w-5" /> Submit Notes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
