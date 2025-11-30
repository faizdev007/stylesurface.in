import React from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// /D:/style-surface/app/(user)/products/[slug]/page.tsx

type ImageRow = { id?: number; url: string };
type ProductRow = {
    id: number;
    name: string;
    slug: string;
    price: number;
    description?: string;
    rating?: number;
    images?: ImageRow[];
};

const SUPABASE_URL =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error(
        "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY) in your environment."
    );
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    // server-side only, do not persist auth
    auth: { persistSession: false },
});

async function getProductBySlug(slug: string): Promise<ProductRow | null> {
    const { data, error } = await supabase
        .from<ProductRow>("products")
        // assumes a relation "images" or a JSON column; adjust selector to fit your schema
        .select("id, name, slug, price, description, rating, images(url)")
        .eq("slug", slug)
        .limit(1)
        .maybeSingle();

    if (error) {
        console.error("Supabase error fetching product:", error);
        return null;
    }
    return data as ProductRow | null;
}

export default async function Page({
    params,
}: {
    params: { slug: string };
}) {
    const slug = params.slug;
    const product = await getProductBySlug(slug);

    if (!product) {
        return (
            <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
                <h1>Product not found</h1>
                <p>No product found for "{slug}".</p>
            </div>
        );
    }

    const images = product.images?.length ? product.images : [{ url: "/placeholder.png" }];

    return (
        <div style={{ padding: 24, fontFamily: "system-ui, sans-serif", maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 32 }}>
                <div style={{ flex: "1 1 0" }}>
                    <div style={{ width: "100%", aspectRatio: "1/1", position: "relative", borderRadius: 8, overflow: "hidden", background: "#f6f6f6" }}>
                        {/* show first image */}
                        <Image
                            src={images[0].url}
                            alt={product.name}
                            fill
                            style={{ objectFit: "cover" }}
                            // Note: if external url domains are used, add them to next.config.js images.domains
                        />
                    </div>

                    {images.length > 1 && (
                        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                            {images.map((img, i) => (
                                <div key={i} style={{ width: 72, height: 72, position: "relative", borderRadius: 6, overflow: "hidden", background: "#fafafa" }}>
                                    <Image src={img.url} alt={`${product.name} ${i}`} fill style={{ objectFit: "cover" }} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ width: 420 }}>
                    <h1 style={{ margin: "0 0 8px" }}>{product.name}</h1>
                    <div style={{ color: "#666", marginBottom: 8 }}>
                        {product.rating ? `⭐ ${product.rating.toFixed(1)}` : null}
                    </div>

                    <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.price || 0)}
                    </div>

                    <p style={{ color: "#333", lineHeight: 1.5 }}>{product.description || "No description provided."}</p>

                    <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
                        <button
                            onClick={() => {
                                // placeholder: server components can't handle client-side events.
                                // Hook this up in a client component or add form/route for cart operations.
                                alert("Add to cart (client logic not implemented in this server component)");
                            }}
                            style={{
                                padding: "12px 18px",
                                background: "#111827",
                                color: "white",
                                border: "none",
                                borderRadius: 8,
                                cursor: "pointer",
                                fontWeight: 600,
                            }}
                        >
                            Add to cart
                        </button>

                        <button
                            onClick={() => {
                                alert("Buy now (client logic not implemented here)");
                            }}
                            style={{
                                padding: "12px 18px",
                                background: "white",
                                color: "#111827",
                                border: "1px solid #e5e7eb",
                                borderRadius: 8,
                                cursor: "pointer",
                                fontWeight: 600,
                            }}
                        >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}