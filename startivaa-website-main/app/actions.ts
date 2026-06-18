"use server";

/**
 * 🔱 STARTIVAA SECURE SERVER-SIDE OPERATIONS (use server)
 * This file isolates all private tokens, hooks, and passwords from the client-side bundle,
 * adhering to the strictly server-side security invariants.
 */

const FALLBACK_PASSWORD = "startivaa@india";

/**
 * Validates the admin password server-side using environment configurations.
 */
export async function validatePasswordAction(password: string): Promise<{ success: boolean }> {
  const adminPassword = process.env.ADMIN_PASSWORD || FALLBACK_PASSWORD;
  return { success: password === adminPassword };
}

/**
 * Saves and publishes the events and gallery updates back to the GitHub repository,
 * and triggers a fresh production build on Vercel via Deploy Hook.
 */
export async function publishDataAction(
  events: unknown[],
  gallery: unknown[]
): Promise<{ success: boolean; error?: string }> {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_OWNER = process.env.GITHUB_OWNER || "startivaa";
  const GITHUB_REPO = process.env.GITHUB_REPO || "startivaa-website";
  const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK;

  if (!GITHUB_TOKEN) {
    return {
      success: false,
      error: "Security breach prevented: GITHUB_TOKEN is not configured on the server environment.",
    };
  }

  try {
    const headers = {
      Authorization: `token ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "Startivaa-Server-Core",
    };
    const base = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;

    const pushFile = async (path: string, content: string) => {
      let sha: string | undefined;
      try {
        const r = await fetch(`${base}/${path}`, { headers, next: { revalidate: 0 } });
        if (r.ok) {
          const d = await r.json();
          sha = d.sha;
        }
      } catch (err) {
        console.error(`Error fetching SHA for ${path}:`, err);
      }

      const body: Record<string, string> = {
        message: `chore: update ${path} via secure Admin Panel [Server Action]`,
        content: Buffer.from(content, "utf-8").toString("base64"),
      };
      if (sha) body.sha = sha;

      const res = await fetch(`${base}/${path}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.message || `Failed to push ${path}`);
      }
    };

    // Commit both database JSON stores
    await pushFile("data/events.json", JSON.stringify(events, null, 2));
    await pushFile("data/gallery.json", JSON.stringify(gallery, null, 2));

    // Trigger Vercel Production Build
    if (VERCEL_DEPLOY_HOOK) {
      const deployRes = await fetch(VERCEL_DEPLOY_HOOK, { method: "POST" });
      if (!deployRes.ok) {
        console.warn("Vercel Webhook triggered but returned non-ok status");
      }
    } else {
      console.warn("Vercel deploy hook not configured; skipping production deployment trigger.");
    }

    return { success: true };
  } catch (err) {
    console.error("Critical error in publishDataAction:", err);
    const msg = err instanceof Error ? err.message : "Unexpected failure committing changes.";
    return { success: false, error: msg };
  }
}

/**
 * Uploads a base64 image data URL securely to Cloudinary using private server environment variables.
 */
export async function uploadImageAction(
  base64Data: string
): Promise<{ success: boolean; secure_url?: string; error?: string }> {
  const cloudName = process.env.CLOUDINARY_CLOUD;
  const presetName = process.env.CLOUDINARY_PRESET;

  if (!cloudName || !presetName) {
    return {
      success: false,
      error: "Cloudinary configuration missing. Configure CLOUDINARY_CLOUD and CLOUDINARY_PRESET environment variables.",
    };
  }

  try {
    const formData = new FormData();
    formData.append("file", base64Data);
    formData.append("upload_preset", presetName);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.secure_url) {
      return { success: true, secure_url: data.secure_url };
    } else {
      return {
        success: false,
        error: data.error?.message || "Cloudinary upload failed.",
      };
    }
  } catch (err) {
    console.error("Cloudinary upload server action error:", err);
    const msg = err instanceof Error ? err.message : "Failed uploading asset to secure storage.";
    return { success: false, error: msg };
  }
}
