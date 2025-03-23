"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function GridSkeleton() {
    return (
        <div className="w-full space-y-8 px-4 md:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] via-[#FFC800] to-[#FFA500] bg-clip-text text-transparent">
                        Loading Anime...
                    </h2>
                    <div className="h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] mt-2 rounded-full w-40" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="h-full">
                        <div className="h-full bg-black/40 backdrop-blur-lg border-[#FFD700]/20 rounded-lg overflow-hidden relative">
                            <Skeleton className="aspect-[4/5] w-full rounded-t-lg" />
                            <div className="p-4 space-y-3">
                                <Skeleton className="h-6 w-3/4" />
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-5 w-5 rounded-full" />
                                    <Skeleton className="h-4 w-10" />
                                </div>
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-12 w-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}