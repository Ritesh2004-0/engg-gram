import React, {
  useState,
  useEffect,
  useMemo
} from "react";

import axios from "axios";

import {
  API_BASE_URL
} from "../config";

import {
  useParams,
  Link
} from "react-router";

import {
  branches
} from "../data/mock";

import {
  Download,
  Clock,
  Eye,
  Bookmark
} from "lucide-react";

export function Branch() {

  const { branchId } =
    useParams<{ branchId: string }>();

  const branch = branches.find(
    (b) => b.id === branchId
  );

  const [notes, setNotes] =
    useState<any[]>([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedSemester, setSelectedSemester] =
    useState<string>("All");

  const [selectedSubject, setSelectedSubject] =
    useState<string>("All");

  // =========================
  // Fetch Notes
  // =========================

  useEffect(() => {

    const fetchNotes = async () => {

      try {

        const response =
          await axios.get(

            `${API_BASE_URL}/notes`,

            {
              params: {
                branchId
              }
            }
          );

        setNotes(response.data);

      } catch (error) {

        console.error(error);
      }
    };

    fetchNotes();

  }, [branchId]);

  // =========================
  // Filter Notes
  // =========================

  const filteredNotes = useMemo(() => {

    return notes.filter((note) => {

      const matchSearch =

        note.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        note.subject
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchSemester =

        selectedSemester === "All" ||

        note.semester === selectedSemester;

      const matchSubject =

        selectedSubject === "All" ||

        note.subject === selectedSubject;

      return (

        matchSearch &&

        matchSemester &&

        matchSubject
      );
    });

  }, [

    notes,

    searchTerm,

    selectedSemester,

    selectedSubject
  ]);

  if (!branch) {

    return (

      <div className="text-center text-xl font-bold dark:text-white">

        Branch not found

      </div>
    );
  }

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

      window.location.reload();

    } catch (error) {

      console.error(error);
    }
  };

  // =========================
  // Bookmark
  // =========================

  const handleBookmark =
    (noteId: string) => {

    const existing =
      JSON.parse(

        localStorage.getItem(
          "bookmarks"
        ) || "[]"
      );

    if (
      !existing.includes(noteId)
    ) {

      existing.push(noteId);

      localStorage.setItem(

        "bookmarks",

        JSON.stringify(existing)
      );

      alert(
        "Bookmarked Successfully"
      );
    }
  };

  return (

    <div className="space-y-8">

      {/* Notes Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredNotes.map((note) => (

          <div
            key={note._id}

            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >

            {/* Subject */}

            <div className="flex flex-col gap-1 mb-4">

              <span className="text-xs font-bold text-green-600 uppercase tracking-wider bg-green-50 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-md inline-block w-fit">

                {note.subject}

              </span>

              {/* Title */}

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">

                {note.title}

              </h3>

            </div>

            {/* Semester */}

            <div className="space-y-2 mb-6 flex-1">

              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">

                <Clock className="h-4 w-4 mr-2 text-gray-400" />

                <span>

                  {note.semester}

                </span>

              </div>

            </div>

            {/* Stats */}

            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">

              <div>

                📥 {note.downloads || 0}

              </div>

              <div>

                ❤️ {note.likes || 0}

              </div>

            </div>

            {/* Buttons */}

            <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">

              {/* Download */}

              <button

                onClick={() =>
                  handleDownload(
                    note._id,
                    note.file_url
                  )
                }

                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-green-600 text-white py-2 px-4 rounded-xl transition-all duration-300 hover:scale-105"
              >

                <Download className="h-4 w-4" />

                Download

              </button>

              {/* View */}

              <Link
                to={`/viewer/${encodeURIComponent(note.file_url)}`}

                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-all duration-300 hover:scale-105"
              >

                <Eye className="h-4 w-4" />

                View

              </Link>

            </div>

            {/* Like */}

            <button

              onClick={async () => {

                try {

                  await axios.put(

                    `${API_BASE_URL}/notes/like/${note._id}`
                  );

                  window.location.reload();

                } catch (error) {

                  console.error(error);
                }
              }}

              className="mt-3 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            >

              ❤️ Like

            </button>

            {/* Bookmark */}

            <button

              onClick={() =>
                handleBookmark(note._id)
              }

              className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >

              <Bookmark className="h-4 w-4" />

              Bookmark

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}