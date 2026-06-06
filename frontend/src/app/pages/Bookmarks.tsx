import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  API_BASE_URL
} from "../config";

import {
  Download,
  Eye,
  Trash2
} from "lucide-react";

import {
  Link
} from "react-router";

export function Bookmarks() {

  const [notes, setNotes] =
    useState<any[]>([]);

  // =========================
  // Fetch Bookmarks
  // =========================

  useEffect(() => {

    const fetchBookmarks =
      async () => {

      try {

        const bookmarkedIds =
          JSON.parse(

            localStorage.getItem(
              "bookmarks"
            ) || "[]"
          );

        const response =
          await axios.get(

            `${API_BASE_URL}/notes`
          );

        const filtered =
          response.data.filter(

            (note: any) =>

              bookmarkedIds.includes(
                note._id
              )
          );

        setNotes(filtered);

      } catch (error) {

        console.error(error);
      }
    };

    fetchBookmarks();

  }, []);

  // =========================
  // Remove Bookmark
  // =========================

  const removeBookmark =
    (noteId: string) => {

    const bookmarks =
      JSON.parse(

        localStorage.getItem(
          "bookmarks"
        ) || "[]"
      );

    const updated =
      bookmarks.filter(

        (id: string) =>

          id !== noteId
      );

    localStorage.setItem(

      "bookmarks",

      JSON.stringify(updated)
    );

    setNotes(

      notes.filter(

        (note) =>

          note._id !== noteId
      )
    );
  };

  // =========================
  // Download
  // =========================

  const handleDownload =
    async (
      noteId: string,
      fileUrl: string
    ) => {

    try {

      await axios.put(

        `${API_BASE_URL}/notes/download/${noteId}`
      );

      window.open(
        fileUrl,
        "_blank"
      );

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <div className="p-10 min-h-screen">

      {/* Heading */}

      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">

        🔖 Bookmarked Notes

      </h1>

      {/* Empty State */}

      {notes.length === 0 ? (

        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-10 text-center shadow-md">

          <p className="text-gray-500 dark:text-gray-300 text-lg">

            No bookmarked notes yet.

          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {notes.map((note) => (

            <div
              key={note._id}

              className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* Title */}

              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">

                {note.title}

              </h2>

              {/* Subject */}

              <p className="text-gray-600 dark:text-gray-300 mb-2">

                {note.subject}

              </p>

              {/* Semester */}

              <p className="text-gray-600 dark:text-gray-300 mb-4">

                {note.semester}

              </p>

              {/* Stats */}

              <div className="flex gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">

                <span>

                  📥 {note.downloads || 0}

                </span>

                <span>

                  ❤️ {note.likes || 0}

                </span>

              </div>

              {/* Buttons */}

              <div className="flex gap-3">

                {/* Download */}

                <button

                  onClick={() =>
                    handleDownload(
                      note._id,
                      note.file_url
                    )
                  }

                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition-all duration-300 hover:scale-105"
                >

                  <Download className="h-4 w-4" />

                  Download

                </button>

                {/* View */}

                <Link
                  to={`/viewer/${encodeURIComponent(note.file_url)}`}

                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-xl transition-all duration-300 hover:scale-105"
                >

                  <Eye className="h-4 w-4" />

                  View

                </Link>

              </div>

              {/* Remove Bookmark */}

              <button

                onClick={() =>
                  removeBookmark(note._id)
                }

                className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              >

                <Trash2 className="h-4 w-4" />

                Remove Bookmark

              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}