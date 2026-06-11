import type { Counter } from "../constansts/couters";

export function Counters({counters}: {counters: Counter[]})
{
    return (
        <section className="flex flex-row items-center justify-center ">
            {
                counters.map((counter) => (
                    <div key={counter.title} className="border border-border  p-4 w-1/3 flex flex-col">
                        <p className="text-2xl font-bold text-primary">{counter.value}</p>
                        <h3>{counter.title}</h3>
                    </div>
                ))
            }
        </section>
    )
}