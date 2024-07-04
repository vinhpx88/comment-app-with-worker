import { ComponentProps } from "react"
import { formatDistanceToNow } from "date-fns"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Comment } from "./page";

interface CommentListProps {
  items: Comment[]
}

export function CommentList({ items }: CommentListProps) {

  return (
    <ScrollArea className="">
      <div className="flex flex-col gap-2 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
            )}
            
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.commenter}</div>
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs text-muted-foreground",
                  )}
                >
                  {formatDistanceToNow(new Date(item.datetime), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              {/* <div className="text-xs font-medium">{item.text}</div> */}
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.text.substring(0, 300)}
            </div>
            <div className="flex items-center gap-2">
                <Badge variant={ item.isToxic ? "outline" : "destructive"}>
                    {!item.isToxic ? "toxic" : "non-toxic"}
                  </Badge>
              </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}