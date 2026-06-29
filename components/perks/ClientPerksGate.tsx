"use client";

import { useEffect, useState } from "react";
import {
  CLIENT_PERKS_AUTH_KEY,
  CLIENT_PERKS_PASSWORD,
} from "@/lib/client-perks-data";

type Props = {
  children: React.ReactNode;
};

export default function ClientPerksGate({ children }: Props) {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(CLIENT_PERKS_AUTH_KEY) === "true") {
      setAuthed(true);
    }
    setReady(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CLIENT_PERKS_PASSWORD) {
      sessionStorage.setItem(CLIENT_PERKS_AUTH_KEY, "true");
      setAuthed(true);
      setError(false);
      return;
    }
    setError(true);
  };

  if (!ready) {
    return <div className="client-perks-gate" aria-hidden />;
  }

  if (!authed) {
    return (
      <section className="client-perks-gate">
        <div className="client-perks-gate-card">
          <p className="eyebrow">Client Access</p>
          <h1 className="client-perks-gate-title">
            Perks of Being a <em>Client</em>
          </h1>
          <p className="client-perks-gate-lead">
            This page is reserved for current neu events clients. Enter the
            password provided by your planner to view exclusive vendor perks.
          </p>
          <form className="client-perks-gate-form" onSubmit={handleSubmit}>
            <label className="client-perks-gate-label" htmlFor="client-password">
              Password
            </label>
            <input
              id="client-password"
              type="password"
              className="client-perks-gate-input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              autoComplete="current-password"
              required
            />
            {error ? (
              <p className="client-perks-gate-error" role="alert">
                Incorrect password. Please try again.
              </p>
            ) : null}
            <button type="submit" className="btn btn-primary client-perks-gate-btn">
              Enter
            </button>
          </form>
        </div>
      </section>
    );
  }

  return children;
}
