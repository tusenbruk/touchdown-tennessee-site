"use client";

// Share a game result: Web Share API where available, clipboard fallback.
// Returns how the share happened so the UI can confirm.
export async function shareResult(title: string, text: string): Promise<"shared" | "copied" | "failed"> {
  try {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ title, text });
      return "shared";
    }
  } catch (e) {
    // AbortError = user closed the sheet; treat as done, not failure
    if (e instanceof DOMException && e.name === "AbortError") return "shared";
  }
  try {
    await navigator.clipboard.writeText(text);
    return "copied";
  } catch {
    return "failed";
  }
}
