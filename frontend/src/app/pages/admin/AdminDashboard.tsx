import { useState, useEffect } from "react";

import axios from "axios";

import { API_BASE_URL }
from "../../config";

import { AdminNotesTable }
from "../../components/AdminNotesTable";

export function AdminDashboard() {

  const [title, setTitle] =
    useState("");

  const [branchId, setBranchId] =
    useState("comp");

  const [subject, setSubject] =
    useState("");

  const [semester, setSemester] =
    useState("Semester 1");

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [notes, setNotes] =
    useState<any[]>([]);

  // =========================
  // Fetch Notes
  // =========================

  const fetchNotes = async () => {

    try {

      const response =
        await axios.get(
          `${API_BASE_URL}/notes`
        );

      setNotes(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    fetchNotes();

  }, []);

  // =========================
  // Upload Note
  // =========================

  const handleUpload = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setMessage("");

    // Validation
    if (
      !title ||
      !subject ||
      !file
    ) {

      setMessage(
        "Please fill all fields"
      );

      return;
    }

    // PDF Validation
    if (
      file.type !==
      "application/pdf"
    ) {

      setMessage(
        "Only PDF files allowed"
      );

      return;
    }

    try {

      setLoading(true);

      // =========================
      // FormData
      // =========================

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "branchId",
        branchId
      );

      formData.append(
        "subject",
        subject
      );

      formData.append(
        "semester",
        semester
      );

      formData.append(
        "file",
        file
      );

      // =========================
      // Token
      // =========================

      const token =
        localStorage.getItem(
          "token"
        );

      // =========================
      // Upload Request
      // =========================

      const response =
        await axios.post(

          `${API_BASE_URL}/notes/upload`,

          formData,

          {
            headers: {

              Authorization:
                `Bearer ${token}`
            },

            timeout: 60000
          }
        );

      // =========================
      // Success
      // =========================

      setMessage(
        "✅ Note Uploaded Successfully"
      );

      // Refresh Notes Table
      await fetchNotes();

      // Reset Form
      setTitle("");

      setSubject("");

      setBranchId("comp");

      setSemester("Semester 1");

      setFile(null);

    } catch (error: any) {

      console.error(error);

      // Timeout Error
      if (
        error.code ===
        "ECONNABORTED"
      ) {

        setMessage(
          "Upload Timeout. Try smaller PDF."
        );

      } else {

        setMessage(

          error.response?.data?.detail ||

          "❌ Upload Failed"
        );
      }

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // Delete Note
  // =========================

  const handleDelete = async (
    noteId: string
  ) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.delete(

        `${API_BASE_URL}/notes/${noteId}`,

        {
          headers: {

            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setMessage(
        "🗑️ Note Deleted Successfully"
      );

      // Refresh Notes
      fetchNotes();

    } catch (error) {

      console.error(error);

      setMessage(
        "❌ Delete Failed"
      );
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* Upload Form */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-gray-900 mb-8">

            Upload Notes

          </h1>

          <form
            onSubmit={handleUpload}
            className="space-y-5"
          >

            {/* Title */}

            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 p-4 rounded-xl"
            />

            {/* Branch */}

            <select
              value={branchId}
              onChange={(e) =>
                setBranchId(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 p-4 rounded-xl"
            >

              <option value="comp">
                Computer Engineering
              </option>

              <option value="it">
                Information Technology
              </option>

              <option value="mech">
                Mechanical Engineering
              </option>

              <option value="civil">
                Civil Engineering
              </option>

              <option value="elec">
                Electrical Engineering
              </option>

            </select>

            {/* Subject */}

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) =>
                setSubject(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 p-4 rounded-xl"
            />

            {/* Semester */}

            <select
              value={semester}
              onChange={(e) =>
                setSemester(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 p-4 rounded-xl"
            >

              {[1,2,3,4,5,6,7,8].map(
                (sem) => (

                  <option
                    key={sem}
                    value={`Semester ${sem}`}
                  >

                    Semester {sem}

                  </option>

                )
              )}

            </select>

            {/* File */}

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] || null
                )
              }
              className="w-full border border-gray-300 p-4 rounded-xl"
            />

            {/* Upload Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all disabled:bg-gray-400"
            >

              {loading ? (

                <div className="flex items-center justify-center gap-2">

                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                  Uploading...

                </div>

              ) : (

                "Upload Note"
              )}

            </button>

            {/* Message */}

            {message && (

              <div className="text-center font-medium text-sm text-blue-600">

                {message}

              </div>

            )}

          </form>

        </div>

        {/* Notes Table */}

        <AdminNotesTable
          notes={notes}
          onDelete={handleDelete}
        />

      </div>

    </div>
  );
}