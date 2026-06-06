import axios from "axios";

import {
  API_BASE_URL
} from "../config";

interface NoteCardProps {

  id: string;

  title: string;

  subject: string;

  semester: string;

  fileUrl: string;

  downloads: number;

  likes: number;
}

export function NoteCard({

  id,

  title,

  subject,

  semester,

  fileUrl,

  downloads,

  likes

}: NoteCardProps) {

  // =========================
  // Download
  // =========================

  const handleDownload =
    async () => {

    try {

      await axios.put(

        `${API_BASE_URL}/notes/download/${id}`
      );

      // Open PDF

      window.open(

        fileUrl,

        "_blank"
      );

    } catch (error) {

      console.error(error);
    }
  };

  // =========================
  // Like
  // =========================

  const handleLike =
    async () => {

    try {

      await axios.put(

        `${API_BASE_URL}/notes/like/${id}`
      );

      window.location.reload();

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      {/* Title */}

      <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">

        {title}

      </h2>

      {/* Subject */}

      <p className="text-gray-600 dark:text-gray-300 mb-2">

        <span className="font-semibold">

          Subject:

        </span>{" "}

        {subject}

      </p>

      {/* Semester */}

      <p className="text-gray-600 dark:text-gray-300 mb-2">

        <span className="font-semibold">

          Semester:

        </span>{" "}

        {semester}

      </p>

      {/* Downloads */}

      <p className="text-gray-600 dark:text-gray-300 mb-2">

        <span className="font-semibold">

          📥 Downloads:

        </span>{" "}

        {downloads}

      </p>

      {/* Likes */}

      <p className="text-gray-600 dark:text-gray-300 mb-5">

        <span className="font-semibold">

          ❤️ Likes:

        </span>{" "}

        {likes}

      </p>

      {/* Buttons */}

      <div className="flex gap-3 flex-wrap">

        {/* Download */}

        <button

          onClick={handleDownload}

          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105"
        >

          Download

        </button>

        {/* View */}

        <a
          href={fileUrl}
          target="_blank"
          rel="noreferrer"

          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105"
        >

          View

        </a>

        {/* Like */}

        <button

          onClick={handleLike}

          className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105"
        >

          ❤️ Like

        </button>

      </div>

    </div>
  );
}