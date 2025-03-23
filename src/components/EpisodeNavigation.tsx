import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EpisodeNavigationProps {
    previousEpisode?: { id: string };
    nextEpisode?: { id: string };
}

export default function EpisodeNavigation({ previousEpisode, nextEpisode }: EpisodeNavigationProps) {
    return (
        <div className="flex justify-between items-center">
            {previousEpisode ? (
                <Link href={`/episodes/${previousEpisode.id}`}>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        Vorige Aflevering
                    </Button>
                </Link>
            ) : (
                <Button className="bg-gray-700 opacity-50 cursor-not-allowed" disabled>
                    <ChevronLeft className="w-4 h-4" />
                    Vorige Aflevering
                </Button>
            )}

            {nextEpisode ? (
                <Link href={`/episodes/${nextEpisode.id}`}>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold gap-2">
                        Volgende Aflevering
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </Link>
            ) : (
                <Button className="bg-gray-700 opacity-50 cursor-not-allowed" disabled>
                    Volgende Aflevering
                    <ChevronRight className="w-4 h-4" />
                </Button>
            )}
        </div>
    );
}
