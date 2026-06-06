import { useEffect, useState } from "react";

import axios from "axios";

import { NoteCard } from "../components/NoteCard";

import {
  Link,
  useLocation
} from "react-router";

import {
  branches
} from "../data/mock";

import {
  API_BASE_URL
} from "../config";

import {
  BookMarked,
  ArrowRight,
  Users,
  Download
} from "lucide-react";

export function Home() {

  const location =
    useLocation();

  const [notes, setNotes] =
    useState<any[]>([]);

  // Search + Filters

  const [search, setSearch] =
    useState("");

  const [selectedBranch,
    setSelectedBranch] =
      useState("");

  const [selectedSemester,
    setSelectedSemester] =
      useState("");

  // =========================
  // Scroll to Branches
  // =========================

  useEffect(() => {

    if (
      location.hash === "#branches"
    ) {

      const el =
        document.getElementById(
          "branches"
        );

      if (el) {

        el.scrollIntoView({

          behavior: "smooth"
        });
      }
    }

  }, [location.hash]);

  // =========================
  // Fetch Notes
  // =========================

  useEffect(() => {

    const fetchNotes =
      async () => {

      try {

        const response =
          await axios.get(

            `${API_BASE_URL}/notes`,

            {
              params: {

                search,

                branchId:
                  selectedBranch,

                semester:
                  selectedSemester
              }
            }
          );

        setNotes(response.data);

      } catch (error) {

        console.error(error);
      }
    };

    fetchNotes();

  }, [

    search,

    selectedBranch,

    selectedSemester
  ]);

  return (

    <div className="flex flex-col gap-16">

      {/* Hero Section */}

      <section className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-8 transition-all duration-300">

        <div className="flex-1 space-y-6 z-10">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold border border-green-200 dark:border-green-700">

            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>

            New: Engineering Notes for All Branches!

          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">

            Your Ultimate Hub for{" "}

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">

              Engineering Notes

            </span>

          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">

            Access and download high-quality engineering notes,
            study materials, and previous year papers curated
            for DBATU students.

          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">

            <Link
              to="/#branches"

              className="px-8 py-3.5 rounded-full bg-gray-900 dark:bg-green-600 text-white font-medium hover:bg-gray-800 dark:hover:bg-green-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >

              Browse Branches

              <ArrowRight className="h-4 w-4" />

            </Link>

            <Link
              to="/about"

              className="px-8 py-3.5 rounded-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-all shadow-sm border border-gray-200 dark:border-slate-700 flex items-center justify-center gap-2"
            >

              Learn More

            </Link>

          </div>

        </div>

        {/* Hero Cards */}

        <div className="flex-1 relative hidden md:block">

          <div className="absolute inset-0 bg-gradient-to-tr from-green-100 to-emerald-50 dark:from-green-900/20 dark:to-slate-900 rounded-full blur-3xl opacity-50 transform -translate-y-12 translate-x-12"></div>

          <div className="relative grid grid-cols-2 gap-4">

            <div className="space-y-4 pt-8">

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl shadow-green-900/5 border border-gray-100 dark:border-slate-700">

                <BookMarked className="h-8 w-8 text-green-500 mb-3" />

                <h3 className="font-bold text-gray-900 dark:text-white">

                  500+ Notes

                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-300">

                  Curated by top students

                </p>

              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl shadow-gray-900/5 border border-gray-100 dark:border-slate-700">

                <Users className="h-8 w-8 text-blue-500 mb-3" />

                <h3 className="font-bold text-gray-900 dark:text-white">

                  Active Community

                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-300">

                  Learn together, grow together

                </p>

              </div>

            </div>

            <div className="space-y-4">

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl shadow-green-900/5 border border-gray-100 dark:border-slate-700">

                <Download className="h-8 w-8 text-amber-500 mb-3" />

                <h3 className="font-bold text-gray-900 dark:text-white">

                  Free Downloads

                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-300">

                  Unlimited PDF access

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Branches */}

      <section
        id="branches"
        className="scroll-mt-24 space-y-8"
      >

        <div className="text-center max-w-3xl mx-auto space-y-4">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">

            Select Your Branch

          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg">

            Browse engineering study materials branch-wise.

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {branches.map((branch) => (

            <div
              key={branch.id}

              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 dark:border-slate-800 transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
            >

              <div className="h-48 overflow-hidden">

                <img
                  src={branch.imageUrl}
                  alt={branch.name}

                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

              </div>

              <div className="p-6 flex flex-col flex-1">

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">

                  {branch.name}

                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1 text-sm">

                  {branch.description}

                </p>

                <Link
                  to={`/branch/${branch.id}`}

                  className="inline-flex items-center justify-between w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-900 dark:text-white hover:text-green-700 dark:hover:text-green-400 rounded-xl font-medium transition-colors border border-gray-200 dark:border-slate-700 hover:border-green-200"
                >

                  <span>View Notes</span>

                  <ArrowRight className="h-4 w-4" />

                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* Latest Notes */}

      <section className="py-10">

        <div className="max-w-7xl mx-auto space-y-8">

          <div className="text-center">

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">

              Latest Notes

            </h2>

            <p className="text-gray-600 dark:text-gray-300 mt-3">

              Search and filter uploaded notes

            </p>

          </div>

          {/* Filters */}

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Search notes or subjects..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }

              className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <select
              value={selectedBranch}
              onChange={(e) =>
                setSelectedBranch(e.target.value)
              }

              className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white p-3 rounded-xl focus:outline-none"
            >

              <option value="">
                All Branches
              </option>

              {branches.map((branch) => (

                <option
                  key={branch.id}
                  value={branch.id}
                >

                  {branch.name}

                </option>

              ))}

            </select>

            <select
              value={selectedSemester}
              onChange={(e) =>
                setSelectedSemester(e.target.value)
              }

              className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white p-3 rounded-xl focus:outline-none"
            >

              <option value="">
                All Semesters
              </option>

              {[1,2,3,4,5,6,7,8].map((sem) => (

                <option
                  key={sem}
                  value={`Semester ${sem}`}
                >

                  Semester {sem}

                </option>

              ))}

            </select>

          </div>

          {/* Notes Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {notes.map((note: any) => (

              <NoteCard
                key={note._id}
                title={note.title}
                subject={note.subject}
                semester={note.semester}
                fileUrl={note.file_url}
                id={note._id}
                downloads={note.downloads}
                likes={note.likes}
              />

            ))}

          </div>

        </div>

      </section>

    </div>
  );
}