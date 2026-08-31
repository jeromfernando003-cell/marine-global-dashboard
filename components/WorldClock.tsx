import React, { useEffect, useState } from "react";
import styles from "../styles/WorldClock.module.css";

const COMMON_ZONES = [
  "UTC",
  "Europe/London",
  "Europe/Amsterdam",
  "Europe/Moscow",
  "Africa/Johannesburg",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Australia/Sydney",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Sao_Paulo",
];

function formatTime(date: Date, timeZone: string) {
  // HH:MM:SS (24-hour) and short date
  const time = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone,
  }).format(date);

  const datePart = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone,
  }).format(date);

  return { time, date: datePart };
}

export default function WorldClock() {
  const [now, setNow] = useState<Date>(new Date());
  const [zones, setZones] = useState<string[]>(
    () => {
      try {
        return (
          JSON.parse(localStorage.getItem("watchedTimezones") || "null") || ["UTC", "Asia/Kolkata", "Asia/Shanghai"]
        );
      } catch {
        return ["UTC", "Asia/Kolkata", "Asia/Shanghai"];
      }
    }
  );
  const [newZone, setNewZone] = useState<string>("UTC");

  useEffect(() => {
    try {
      localStorage.setItem("watchedTimezones", JSON.stringify(zones));
    } catch (e) {
      // ignore storage errors
    }
  }, [zones]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  function addZone(zone: string) {
    if (!zone) return;
    if (!zones.includes(zone)) setZones((s) => [...s, zone]);
  }

  function removeZone(zone: string) {
    setZones((s) => s.filter((z) => z !== zone));
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>World Clock</h2>

      <div className={styles.controls}>
        <select value={newZone} onChange={(e) => setNewZone(e.target.value)} className={styles.select}>
          {COMMON_ZONES.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
          <option value="custom">-- Custom (enter below) --</option>
        </select>
        <button onClick={() => addZone(newZone)} className={styles.btn}>
          Add
        </button>

        <input
          type="text"
          placeholder="Or type IANA zone, e.g. Pacific/Auckland"
          onKeyDown={(e) => {
            if (e.key === "Enter") addZone((e.target as HTMLInputElement).value.trim());
          }}
          className={styles.input}
        />
      </div>

      <div className={styles.grid}>
        {zones.map((tz) => {
          const { time, date } = (() => {
            try {
              return formatTime(now, tz);
            } catch {
              return { time: "Invalid TZ", date: "" };
            }
          })();
          return (
            <div key={tz} className={styles.card}>
              <div className={styles.tz}>{tz}</div>
              <div className={styles.time}>{time}</div>
              <div className={styles.date}>{date}</div>
              <button className={styles.remove} onClick={() => removeZone(tz)} aria-label={`Remove ${tz}`}>
                ×
              </button>
            </div>
          );
        })}
      </div>

      <p className={styles.hint}>Times are shown using the browser's Intl API. Use valid IANA time zone names (e.g., America/New_York).</p>
    </div>
  );
}
