import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge
          className={
            "p-2 bg-slate-200 text-slate-900 hover:bg-slate-300 text-slate-900"
          }
        >
          Open Beta
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-slate-300 text-slate-900">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold">@notes-nest</h4>
            <p className="text-sm">We LOVE your feedback!</p>
            <div className="flex items-center pt-1">
              <span className="text-xs">
                This is a beta version of our file-reader tool. If you have any
                issues or ideas make sure to let us know via the contact page.
              </span>
            </div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">
                v0.1.2 beta-3
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
