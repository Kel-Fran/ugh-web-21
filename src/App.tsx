import { useEffect, useState } from "react";

interface Phone {
    id: number;
    nev: string;
    gyarto: string;
    ar: number;
    memoria: number;
}

export default function App() {
    const [phones, setPhones] = useState<Phone[]>([]);
    const [sortByAsc, setSortByAsc] = useState(false);
    useEffect(() => {
        let ignore = false;
        (async () => {
            const data = await (await fetch('/data.json')).json() as Phone[];
            if (!ignore) setPhones(data);
        })();
        return () => ignore = true;
    });

    const desc = phones.toSorted((a, b) => a.nev.localeCompare(b.nev))
    const asc = phones.toSorted((a, b) => b.nev.localeCompare(a.nev))
    return <>
        <form onSubmit={ e => e.preventDefault() }>
            <label>asc </label>
            < input type = "checkbox" value = { sortByAsc } onChange = { e=> setSortByAsc(e.target.checked) } />
                </form>
                < table >
                <thead>
                <tr>
                <th>name </th>
                < th > manufacturer </th>
                < th > price </th>
                < th > memory </th>
                </tr>
                </thead>
                <tbody>
    {
        (sortByAsc ? asc : desc).map(it => <tr key={ it.id } >
            <td>{ it.nev } </td>
            < td > { it.gyarto } </td>
            < td > { it.ar } </td>
            < td > { it.memoria } </td>
            </tr>)
    }
    </tbody>
        </table>
        </>
}
