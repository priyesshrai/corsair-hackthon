import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

// Display face — used sparingly for headings and the logo mark
export const display = Space_Grotesk({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
});

// Body face — applied to <body> as the default
export const sans = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

// Utility face — keyboard shortcuts, labels, command-bar chrome
export const mono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
});