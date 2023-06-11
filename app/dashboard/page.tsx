import Balancer from "react-wrap-balancer";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";


function Card({ title, value }: { title: string, value: string }) {
    return (
        <div className="flex flex-col p-4 rounded-xl justify-center w-1/3 border border-zinc-700">
            <div className="text-zinc-200 text-3xl font-bold">{value}</div>
            <div className="text-zinc-500 text-xl">{title}</div>
        </div>
    );

}

function ActiveRoomChip({ members, time }: any) {
    return (
        <div className="flex gap-2 items-center p-2 rounded-lg bg-zinc-700">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="flex gap-1">
                {members.map((member: any, index: number) => (
                    <p key={index} className="text-zinc-200 text-sm">{member}{index !== members.length - 1 && ","}</p>
                ))}
            </div>
            <div className="text-zinc-200 text-sm">{time}</div>
        </div>
    );
}

function History({ date, time, members }: any) {
    return (
        <div className="flex gap-1 items-center p-2 rounded-lg bg-zinc-700">
            <h1 className="text-zinc-200 font-bold text-sm">{date}</h1>
            <div className="text-zinc-200 text-sm">{time}</div>
            <div className="flex-grow" />
            <div className="flex gap-1 text-zinc-200 text-sm">
                with
                {members.map((member: any, index: number) => (
                    <p className="" key={index}>{member}{index !== members.length - 1 && ","}</p>
                ))}
            </div>
        </div>
    );
}

export default async function Home() {
    const { stargazers_count: stars } = await fetch(
        "https://api.github.com/repos/steven-tey/precedent",
        {
            ...(process.env.GITHUB_OAUTH_TOKEN && {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }),
            // data will revalidate every 24 hours
            next: { revalidate: 86400 },
        },
    )
        .then((res) => res.json())
        .catch((e) => console.log(e));

    return (
        <>
            <div className="z-10 w-full flex max-w-4xl px-5 xl:px-0">
                <div className="flex-1 flex flex-col gap-8">
                    <div>
                        <div className="text-3xl font-bold text-zinc-200">Hello, Stefan</div>
                        <div className="text-xl text-zinc-500">Welcome back to your dashboard</div>

                    </div>
                    <div className="flex gap-4">
                        <Card title="hours studied" value="10.5h" />
                        <Card title="sessions completed" value="54" />
                        <Card title="online friends" value="12" />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Join a study room <span className="text-zinc-500">or{" "}</span><span className="text-indigo-500 font-bold cursor-pointer">create your own</span></label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3  pointer-events-none font-bold text-zinc-400/50">
                                SR-
                            </div>
                            <input type="text" id="email-address-icon" className="text-sm rounded-lg block w-full pl-10 p-3 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="ABC-DEF" />
                        </div>
                        <div className="flex mt-2 gap-2">
                            <ActiveRoomChip members={["Sania", "Cohan", "Elisha"]} time="3hr 4m" />
                            <ActiveRoomChip members={["John"]} time="7m" />
                            <ActiveRoomChip members={["James", "Michael"]} time="1hr 47m" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium text-zinc-900 dark:text-white">History</label>
                        <History key="1" date="Today" time="from 2:00pm for 3hr and 04m" members={["Sania", "Cohan", "Elisha"]} />
                        <History key="2" date="Yesterday" time="from 5:12am for 2m" members={["John"]} />
                        <History key="3" date="Tuesday" time="from 2pm for 1hr and 4m" members={["Michael"]} />
                    </div>

                </div>
            </div>
        </>
    );
}