import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Roboto, Arial' }}>
      <h1>Marine Global Dashboard</h1>
      <p>Welcome — this is a starter site. Use the navigation below to open the World Clock.</p>
      <ul>
        <li><Link href="/clock">World Clock (time zones)</Link></li>
      </ul>
      <p style={{ marginTop: 24, color: '#666' }}>To run the full site locally: <code>npm install</code> then <code>npm run dev</code> and open <code>http://localhost:3000/clock</code>.</p>
    </main>
  )
}
