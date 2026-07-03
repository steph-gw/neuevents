"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ACCESS_FEATURES = [
  {
    label: "Vendor Discounts",
    image: "/images/client-perks/linens.png",
    imageAlt: "Elegant event table setting with blush linens and florals",
  },
  {
    label: "Promo Codes",
    image: "/images/client-perks/flashlab.png",
    imageAlt: "FlashLab photo booth at an outdoor event",
  },
  {
    label: "Exclusive Offers",
    image: "/images/client-perks/porsche.png",
    imageAlt: "White Porsche convertible rental",
  },
  {
    label: "Hawai'i Partners",
    image: "/images/client-perks/canoe-cooler.jpg",
    imageAlt: "Canoe cooler from The Nalu Collective",
  },
] as const;

type Props = {
  children: React.ReactNode;
};

export default function ClientPerksGate({ children }: Props) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const attemptAuth = async () => {
    if (submitting) return;

    setSubmitting(true);
    setError(false);

    try {
      const response = await fetch("/api/client-perks/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      if (response.ok) {
        setAuthed(true);
        return;
      }

      setError(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (!authed) {
    return (
      <section className="client-perks-v2-gate-screen">
        <div className="client-perks-v2-gate-wrap hv2-wrap">
          <div className="client-perks-v2-gate-panel">
            <div className="client-perks-v2-gate-intro">
              <p className="hv2-eyebrow">Client Access</p>
              <h1 className="client-perks-v2-gate-title hv2-serif">
                Exclusive <em>Perks</em>
              </h1>
              <p className="client-perks-v2-gate-lead">
                Exclusive discounts and offers from our trusted vendor partners
                across Hawai&apos;i — reserved for current neu events clients.
              </p>

              <form
                className="client-perks-v2-gate-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  void attemptAuth();
                }}
              >
                <label
                  className="client-perks-v2-gate-label"
                  htmlFor="client-password"
                >
                  Password
                </label>
                <input
                  id="client-password"
                  type="password"
                  className="client-perks-v2-gate-input"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  autoComplete="off"
                  placeholder="Enter your client password"
                  disabled={submitting}
                  required
                />
                {error ? (
                  <p className="client-perks-v2-gate-error" role="alert">
                    Incorrect password. Please try again.
                  </p>
                ) : null}
                <button
                  type="submit"
                  className="client-perks-v2-gate-btn"
                  disabled={submitting}
                >
                  {submitting ? "Checking…" : "Get Access"}
                </button>
              </form>
            </div>

            <div className="client-perks-v2-gate-aside" aria-hidden="true">
              {ACCESS_FEATURES.map(({ label, image, imageAlt }) => (
                <div key={label} className="client-perks-v2-gate-feature">
                  <div className="client-perks-v2-gate-feature-image">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      sizes="240px"
                      quality={90}
                    />
                  </div>
                  <span className="client-perks-v2-gate-feature-label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="client-perks-v2-gate-hint">
            Password provided by your neu events planner.{" "}
            <Link href="/contact">Need help?</Link>
          </p>
        </div>
      </section>
    );
  }

  return children;
}
