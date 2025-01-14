import React from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

interface IProps {
	children: React.ReactNode;
	label: string;
	side?: "top" | "right" | "bottom" | "left";
	align?: "center" | "end" | "start";
	delay?: number;
}
const TooltipComponent = ({
	children,
	label,
	side = "top",
	align = "center",
	delay = 0,
}: IProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={delay}>
				<TooltipTrigger type="button">{children}</TooltipTrigger>
				<TooltipContent side={side} align={align}>
					{label}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default TooltipComponent;
