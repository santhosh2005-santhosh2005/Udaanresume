
import { cn } from "@/utils/style";

type Props = React.ComponentProps<"div">;

export function Copyright({ className, ...props }: Props) {
	return (
		<div className={cn("text-muted-foreground/80 text-xs leading-relaxed", className)} {...props}>
			<p>
				&copy; {new Date().getFullYear()} UdaanResume by UdaanIQ
			</p>
		</div>
	);
}
