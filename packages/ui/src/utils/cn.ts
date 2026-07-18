import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["display-xl", "display-lg", "heading", "subheading", "body-large", "body", "body-small", "caption", "code", "label"],
      "z-index": ["z-background", "z-base", "z-sidebar", "z-navbar", "z-dropdown", "z-popover", "z-tooltip", "z-modal", "z-toast", "z-command-palette"]
    }
  }
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}
