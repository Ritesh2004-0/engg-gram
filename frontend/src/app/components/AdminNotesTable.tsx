import { Trash2 } from "lucide-react";

interface Props {

  notes: any[];

  onDelete: (
    noteId: string
  ) => void;
}

export function AdminNotesTable({

  notes,
  onDelete

}: Props) {

  return (

    <div className="overflow-x-auto rounded-2xl border border-gray-200 mt-10">

      <table className="w-full bg-white">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">
              Title
            </th>

            <th className="text-left p-4">
              Subject
            </th>

            <th className="text-left p-4">
              Semester
            </th>

            <th className="text-left p-4">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {notes.map((note) => (

            <tr
              key={note._id}
              className="border-t"
            >

              <td className="p-4">

                {note.title}

              </td>

              <td className="p-4">

                {note.subject}

              </td>

              <td className="p-4">

                {note.semester}

              </td>

              <td className="p-4">

                <button
                  onClick={() =>
                    onDelete(note._id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                >

                  <Trash2 className="h-4 w-4" />

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}