import Demo from "./Demo"

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Demo />
      <a
        href="https://github.com/taterboom/pinyin-api"
        style={{ marginTop: "1rem", width: "20rem" }}
      >
        github repo ➡️
      </a>
    </main>
  )
}
