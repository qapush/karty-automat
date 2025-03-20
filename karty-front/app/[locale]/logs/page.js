import { logs } from "@/app/actions";

export default async function LogsPage() {

    const logsData = await logs();

    return (
        <div>
            <h1 className='page-title'>Logs</h1>
            <pre>
                {logsData}
            </pre>
        </div>
    );
}
