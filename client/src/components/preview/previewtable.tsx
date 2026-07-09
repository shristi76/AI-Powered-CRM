import Card from "@/components/common/card";

interface Props {
  rows: Record<string, any>[];
}

export default function PreviewTable({ rows }: Props) {
  if (!rows.length) return null;

  const headers = Object.keys(rows[0]);

  return (
    <Card title="📄 Preview Records">

      <div className="overflow-auto">

        <table className="w-full">

          <thead>

            <tr>

              {headers.map((header) => (
                <th
                  key={header}
                  className="border-b py-2 text-left"
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
                    className="border-b py-2"
                  >
                    {row[header]}
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