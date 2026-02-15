import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { Hero } from "./-sections/hero";

// Lazy load below-the-fold components
const Templates = lazy(() => import("./-sections/templates").then(m => ({ default: m.Templates })));
const Footer = lazy(() => import("./-sections/footer").then(m => ({ default: m.Footer })));

export const Route = createFileRoute("/_home/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main id="main-content" className="relative">
			<Hero />

			<div className="container mx-auto px-4 sm:px-6 lg:px-12">
				<div className="border-border border-x [&>section:first-child]:border-t-0 [&>section]:border-border [&>section]:border-t">
					<Suspense fallback={
						<div className="flex min-h-[400px] items-center justify-center">
							<div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
						</div>
					}>
						<Templates />
					</Suspense>

					<Suspense fallback={<div className="min-h-[200px]" />}>
						<Footer />
					</Suspense>
				</div>
			</div>
		</main>
	);
}
