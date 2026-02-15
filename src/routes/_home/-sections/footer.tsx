import { motion } from "motion/react";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Copyright } from "@/components/ui/copyright";




export function Footer() {
	return (
		<motion.footer
			id="footer"
			className="p-4 pb-8 md:p-8 md:pb-12"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
		>
			<div className="flex flex-col items-center justify-between gap-y-4 md:flex-row">
				<BrandIcon variant="logo" className="h-8 w-auto" />

				<Copyright />
			</div>
		</motion.footer>
	);
}
