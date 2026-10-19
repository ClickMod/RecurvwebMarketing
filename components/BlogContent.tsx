"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import { createContext, isValidElement, useContext, type ReactNode } from "react";
import { slugifyHeading } from "@/lib/blog-content";
import type { BlockNode } from "@/lib/strapi";
import { theme as t } from "@/components/theme";

function textFromChildren(children: ReactNode): string {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }
  if (isValidElement<{ children?: ReactNode; text?: string | null }>(children)) {
    // Strapi's Text node stores the phrase on `text`, not `children`.
    if (typeof children.props.text === "string") return children.props.text;
    return textFromChildren(children.props.children);
  }
  return "";
}

function resolveImageUrl(url: string, base?: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const normalized = (base ?? "").replace(/\/$/, "");
  return `${normalized}${url}`;
}

const ListFormatContext = createContext<"ordered" | "unordered">("unordered");

function BlogListItem({ children }: { children: ReactNode }) {
  const format = useContext(ListFormatContext);
  if (format === "ordered") {
    return <li style={{ paddingLeft: 4 }}>{children}</li>;
  }
  return (
    <li
      style={{
        fontSize: 17,
        lineHeight: 1.65,
        color: t.inkSoft,
        paddingLeft: 20,
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          top: "0.55em",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: t.primary,
          display: "block",
        }}
        aria-hidden="true"
      />
      {children}
    </li>
  );
}

interface BlogContentProps {
  content: BlockNode[] | null | undefined;
  className?: string;
  /** Strapi API origin — resolves relative /uploads paths for image blocks. */
  strapiBaseUrl?: string;
}

/**
 * Renders Strapi Blocks rich-text for blog articles via the official renderer.
 * Heading ids match extractTableOfContents() / slugifyHeading() for TOC anchors.
 */
export function BlogContent({
  content,
  className,
  strapiBaseUrl,
}: BlogContentProps) {
  if (!content || !Array.isArray(content) || content.length === 0) return null;

  return (
    <div className={className}>
      <BlocksRenderer
        content={content as BlocksContent}
        blocks={{
          heading: ({ level, children }) => {
            const id = slugifyHeading(textFromChildren(children));
            if (level === 2) {
              return (
                <h2
                  id={id}
                  style={{
                    fontFamily: t.fontDisplay,
                    fontSize: "var(--fs-h2-md)",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    margin: "2.5em 0 0.75em",
                    color: t.ink,
                  }}
                >
                  {children}
                </h2>
              );
            }
            return (
              <h3
                id={id}
                style={{
                  fontFamily: t.fontDisplay,
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  margin: "2em 0 0.5em",
                  color: t.ink,
                }}
              >
                {children}
              </h3>
            );
          },
          paragraph: ({ children }) => (
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: t.inkSoft,
                margin: "1.25em 0",
              }}
            >
              {children}
            </p>
          ),
          quote: ({ children }) => (
            <blockquote
              style={{
                borderLeft: `3px solid ${t.primary}`,
                paddingLeft: 24,
                margin: "2em 0",
                color: t.inkSoft,
              }}
            >
              <p
                style={{
                  fontFamily: t.fontDisplay,
                  fontSize: 20,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  letterSpacing: "-0.015em",
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                {children}
              </p>
            </blockquote>
          ),
          list: ({ format, children }) => {
            const listStyle = {
              margin: "1.5em 0",
              display: "flex",
              flexDirection: "column" as const,
              gap: 10,
              fontSize: 17,
              lineHeight: 1.65,
              color: t.inkSoft,
            };

            return (
              <ListFormatContext.Provider value={format}>
                {format === "ordered" ? (
                  <ol style={{ ...listStyle, paddingLeft: 24 }}>{children}</ol>
                ) : (
                  <ul style={{ ...listStyle, paddingLeft: 0, listStyle: "none" }}>
                    {children}
                  </ul>
                )}
              </ListFormatContext.Provider>
            );
          },
          "list-item": ({ children }) => <BlogListItem>{children}</BlogListItem>,
          link: ({ children, url }) => {
            const isInternal = url.startsWith("/");
            const linkStyle = {
              color: t.primary,
              textDecoration: "underline",
              textUnderlineOffset: 4,
            };
            if (isInternal) {
              return (
                <Link href={url} style={linkStyle}>
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={url}
                style={linkStyle}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
          image: ({ image }) => {
            const src = resolveImageUrl(image.url, strapiBaseUrl);
            if (!src) return null;
            return (
              <figure style={{ margin: "2em 0" }}>
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    borderRadius: 8,
                    aspectRatio:
                      image.width && image.height
                        ? `${image.width} / ${image.height}`
                        : "16 / 9",
                  }}
                >
                  <Image
                    src={src}
                    alt={image.alternativeText ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 740px"
                    className="object-cover"
                  />
                </div>
                {image.caption ? (
                  <figcaption
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      color: t.inkSoft,
                      textAlign: "center",
                    }}
                  >
                    {image.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          },
          code: ({ plainText }) => (
            <pre
              style={{
                background: t.surfaceAlt,
                border: `1px solid ${t.line}`,
                borderRadius: 8,
                padding: "16px 20px",
                overflowX: "auto",
                margin: "1.5em 0",
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              <code style={{ fontFamily: "monospace" }}>{plainText}</code>
            </pre>
          ),
        }}
        modifiers={{
          code: ({ children }) => (
            <code
              style={{
                fontFamily: "monospace",
                background: t.surfaceAlt,
                padding: "2px 5px",
                borderRadius: 4,
              }}
            >
              {children}
            </code>
          ),
        }}
      />
    </div>
  );
}
