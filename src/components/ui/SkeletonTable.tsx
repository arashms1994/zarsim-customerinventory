import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable() {
    return (
        <div className="flex w-full max-w-3xl flex-col gap-2 p-5">
            {Array.from({ length: 5 }).map((_, index) => (
                <div className="flex gap-4" key={index}>
                    <Skeleton className="h-15 flex-1" />
                    <Skeleton className="h-15 w-32" />
                    <Skeleton className="h-15 w-32" />
                </div>
            ))}
        </div>
    )
}
