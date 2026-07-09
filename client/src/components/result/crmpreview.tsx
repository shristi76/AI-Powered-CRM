interface Props {
  rows: Record<string, any>[];
}

export default function CRMPreview({
  rows,
}: Props) {
  if (!rows.length) return null;

  const headers = Object.keys(rows[0]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          CRM Preview
        </h2>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
          {rows.length} Records
        </span>

      </div>

      <div className="overflow-auto">

        <table className="min-w-full border">

          <thead className="bg-gray-100">

            <tr>

              {headers.map((header) => (

                <th
                  key={header}
                  className="border px-4 py-3 text-left"
                >
                  {header}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {rows.map((row, index) => (

              <tr
                key={index}
                className="hover:bg-gray-50"
              >

                {headers.map((header) => (

                  <td
                    key={header}
                    className="border px-4 py-3"
                  >
                    {String(row[header] ?? "")}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}