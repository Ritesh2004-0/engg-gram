import {
  Mail,
  Github
} from "lucide-react";

export function Contact() {

  return (

    <div className="max-w-4xl mx-auto py-10 px-4">

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-md border border-gray-100 dark:border-slate-800 p-8 md:p-12 text-center transition-all duration-300">

        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">

          Contact Us

        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg">

          Have questions, suggestions, or feedback?
          We'd love to hear from you.

        </p>

        <div className="flex flex-col gap-6">

          <a
            href="mailto:riteshadling1516@gmail.com"

            className="flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
          >

            <Mail className="h-5 w-5" />

            riteshadling1516@gmail.com

          </a>

          <a
            href="#"

            className="flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
          >

            <Github className="h-5 w-5" />

            GitHub Profile

          </a>

        </div>

      </div>

    </div>
  );
}