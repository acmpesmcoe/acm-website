export const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  workshop: {
    bg: "bg-blue-500/10 dark:bg-blue-400/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/20 dark:border-blue-400/20"
  },
  "expert talk": {
    bg: "bg-indigo-500/10 dark:bg-indigo-400/10",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500/20 dark:border-indigo-400/20"
  },
  talk: {
    bg: "bg-indigo-500/10 dark:bg-indigo-400/10",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500/20 dark:border-indigo-400/20"
  },
  hackathon: {
    bg: "bg-red-500/10 dark:bg-red-400/10",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-500/20 dark:border-red-400/20"
  },
  contest: {
    bg: "bg-orange-500/10 dark:bg-orange-400/10",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-500/20 dark:border-orange-400/20"
  },
  community: {
    bg: "bg-emerald-500/10 dark:bg-emerald-400/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/20 dark:border-emerald-400/20"
  },
  "acm awareness drive": {
    bg: "bg-pink-500/10 dark:bg-pink-400/10",
    text: "text-pink-600 dark:text-pink-400",
    border: "border-pink-500/20 dark:border-pink-400/20"
  },
  "acm awareness": {
    bg: "bg-pink-500/10 dark:bg-pink-400/10",
    text: "text-pink-600 dark:text-pink-400",
    border: "border-pink-500/20 dark:border-pink-400/20"
  }
};

export function getCategoryStyles(category: string) {
  const norm = category.toLowerCase().trim();
  return categoryColors[norm] || {
    bg: "bg-accent-secondary/10",
    text: "text-accent-secondary",
    border: "border-accent-secondary/20"
  };
}
