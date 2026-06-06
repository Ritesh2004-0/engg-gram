import React from "react";

import {
  Github,
  Twitter,
  Mail
} from "lucide-react";

export function About() {

  return (

    <div className="max-w-4xl mx-auto space-y-12">

      {/* Heading */}

      <div className="text-center space-y-4">

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">

          About Engg-Gram

        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300">

          Empowering engineering students through open knowledge sharing.

        </p>

      </div>

      {/* Main Content */}

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-slate-800 prose prose-lg max-w-none transition-all duration-300">

        <p className="text-gray-700 dark:text-gray-300">

          <strong className="text-gray-900 dark:text-white">

            Engg-Gram

          </strong>{" "}

          is a community-driven platform designed specifically for students of
          Dr. Babasaheb Ambedkar Technological University (DBATU)
          and its affiliated colleges.

        </p>

        <p className="text-gray-700 dark:text-gray-300">

          We understand the struggle of finding quality study materials,
          previous year papers, and reliable lecture notes right before exams.
          That's why we created this platform—to centralize resources and
          foster a collaborative environment where students help students.

        </p>

        {/* Mission */}

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">

          Our Mission

        </h3>

        <p className="text-gray-700 dark:text-gray-300">

          To make technical education accessible and manageable by providing
          a unified platform for DBATU students to share, discover,
          and download high-quality academic resources across all
          engineering branches.

        </p>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-8 not-prose">

          {/* Card 1 */}

          <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">

              Open Source

            </h4>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">

              Built with modern web technologies, completely free
              for all students to use without hidden fees.

            </p>

          </div>

          {/* Card 2 */}

          <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">

              Community Led

            </h4>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">

              Driven by students who upload, verify,
              and curate the best notes for every subject.

            </p>

          </div>

          {/* Card 3 */}

          <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">

              High Quality

            </h4>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">

              Rating systems ensure that the best and most
              accurate materials surface to the top.

            </p>

          </div>

        </div>

      </div>

      {/* Contact Section */}

      <div className="text-center space-y-6">

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">

          Get in Touch

        </h2>

        <div className="flex justify-center gap-4">

          {/* Github */}

          <a
            href="#"

            className="p-3 bg-white dark:bg-slate-900 rounded-full text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 shadow-sm border border-gray-100 dark:border-slate-700 hover:scale-110"
          >

            <Github className="h-6 w-6" />

          </a>

          {/* Twitter */}

          <a
            href="#"

            className="p-3 bg-white dark:bg-slate-900 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 shadow-sm border border-gray-100 dark:border-slate-700 hover:scale-110"
          >

            <Twitter className="h-6 w-6" />

          </a>

          {/* Mail */}

          <a
            href="mailto:riteshadling1516@gmail.com"

            className="p-3 bg-white dark:bg-slate-900 rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 shadow-sm border border-gray-100 dark:border-slate-700 hover:scale-110"
          >

            <Mail className="h-6 w-6" />

          </a>

        </div>

      </div>

    </div>
  );
}