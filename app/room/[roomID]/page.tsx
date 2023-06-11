'use client'

import Balancer from "react-wrap-balancer";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";
import React, { useRef, useEffect } from 'react';
import { ReactFitty } from "react-fitty";

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
                    <p  key={index} className="text-zinc-200 text-sm">{member}{index !== members.length - 1 && ","}</p>
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
                    <p key={index} className="">{member}{index !== members.length - 1 && ","}</p>
                ))}
            </div>
        </div>
    );
}


export default async function Page({ params }: any) {
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
            <div className="z-10 w-full flex max-w-3xl px-5 xl:px-0">
                <div className="flex-1 flex flex-col gap-8">
                    <div className=" flex-grow grid grid-cols-1 w-full">
                        <ReactFitty className="text-white text-[14rem] font-bold w-full mx-auto text-center ">
                            12m 05s
                        </ReactFitty>
                    </div>
                    <div className='flex'>

                        <div className='h-[100px] w-[100px]'>
                            <Image src="https://study-overlay.vercel.app/_next/image?url=https%3A%2F%2Fi.scdn.co%2Fimage%2Fab67616d0000b2730acf7f2eefe5bd36efbc26b4&w=1080&q=75" width={500} height={500} className="rounded-[1rem]" alt="Album Cover" />
                        </div>
                        <div className='flex flex-col '>

                            <span className="text-[3rem] font-extrabol my-auto ml-4 whitespace-nowrap inline-block" key="title">Do I wanna Know?</span>
                            <span className='text-[1.5rem] my-auto mx-6'>by</span> Arctic Monkeys
                            <div className='flex -my-1 -'>
                                <div className='text-[1.5rem] my-auto mx-6'>
                                    1:21
                                </div>

                                <div className='h-3 w-[400px] bg-gray-300 rounded-lg overflow-none my-auto'>
                                    <div
                                        style={{ width: `${80 / 300 * 100}%` }}
                                        className={`rounded-lg h-full bg-gray-700`}>
                                    </div>
                                </div>
                                <div className='text-[1.5rem] my-auto mx-6'>
                                    4:32
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}