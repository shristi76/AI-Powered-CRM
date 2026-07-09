import Card from "@/components/common/card";

interface Props {
  rows: Record<string, any>[];
}

export default function CRMTable({
  rows,
}: Props) {

  if (!rows.length) return null;

  const headers = Object.keys(rows[0]);

  return (

    <Card title="Step 4 • CRM Preview">

      <div className="overflow-auto">

        <table className="min-w-full">

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

              <tr key={index}>

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

    </Card>

  );

}